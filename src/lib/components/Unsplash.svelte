<script context="module">
	const {
		elements: { root, item },
		states: { value }
	} = createRadioGroup();

	export { value };
</script>

<script lang="ts">
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import type { Unsplash } from './drawer';
	import { TextField } from './textfield';
	import { slide } from 'svelte/transition';
	import Camera from './camera/Camera.svelte';

	let img = '';

	let images: Unsplash | undefined = {
		total: 0,
		total_pages: 0,
		results: []
	};

	const imgCache = new Map<string, Unsplash>();

	async function unsplash() {
		if (!img) return;

		const _img = img.toLowerCase();
		if (imgCache.has(_img)) {
			images = imgCache.get(_img);
			return;
		}
		const res = await fetch(`https://api.unsplash.com/search/photos/?per_page=9&query=${_img}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Client-ID g4OdDhmb2xX2x_YlHP6EnHru--MGm1cxdddPrHcQx4o'
			}
		});

		if (res.ok) {
			const data = (await res.json()) as Unsplash;
			images = data;
			imgCache.set(_img, data);
		}
	}

	/**
	 * Creates a debounced version of the provided function which will only be executed after the specified delay
	 * since the last call. The function is called with the same arguments as the original function and the `this`
	 * context is preserved.
	 * @param fn The function to be debounced
	 * @param delay The delay in milliseconds
	 * @returns A function that will only be executed after the specified delay since the last call.
	 */
	function debounce<F extends (...args: any[]) => any>(
		fn: F,
		delay: number
	): (...args: Parameters<F>) => ReturnType<F> {
		let timeout: ReturnType<typeof setTimeout>;
		return function (this: ThisParameterType<F>, ...args: Parameters<F>): ReturnType<F> {
			clearTimeout(timeout);
			timeout = setTimeout(() => fn.apply(this, args), delay);
			return fn.apply(this, args);
		};
	}
</script>

<section class="flex flex-col">
	<div class="inline-flex gap-2 items-center">
		<TextField
			display=""
			required={false}
			on:keydown={debounce(unsplash, 1000)}
			title="Escolha uma imagem"
			bind:value={img}
			style="outlined"
		/>

		<Camera />
	</div>

	{#if img && images?.results?.length}
		<ul
			in:slide={{ axis: 'y' }}
			use:melt={$root}
			class="grid grid-cols-3 gap-2 p-2 bg-background justify-center rounded-b-xl"
		>
			{#each images.results as image, i (i)}
				<figure
					style:--tw-ring-color={image.color}
					class="relative h-[80px] overflow-hidden rounded-lg ring-2 ring-primary hover:ring-primary hover:ring-4 transition"
					on:m-click={() => {
						images = undefined;
					}}
					use:melt={$item({
						value: `${image.urls.regular}|${image.alternative_slugs.pt}|${image.color}|${image.blur_hash}`
					})}
				>
					<img
						style:background-color={image.color}
						src={image.urls.thumb}
						alt={image.alternative_slugs.pt}
						height="80px"
						width="200px"
						loading="lazy"
						class="object-cover h-full w-[200px]"
					/>
				</figure>
			{/each}
		</ul>
	{/if}
</section>
