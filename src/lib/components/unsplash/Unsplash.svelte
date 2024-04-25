<script context="module">
	import { createRadioGroup } from '@melt-ui/svelte';
	const {
		elements: { root, item },
		states: { value }
	} = createRadioGroup();

	export { value };
</script>

<script lang="ts">
	import { debounce } from '$lib/utils.svelte';
	import { melt } from '@melt-ui/svelte';
	import { Map } from 'svelte/reactivity';
	import { photo } from '../camera/stores';
	import type { Unsplash } from '../drawer';
	import { TextField } from '../textfield';
	import Camera, { image } from '../camera/Camera.svelte';
	import { slide } from 'svelte/transition';

	$: img = $photo?.src ?? '';

	let images: Unsplash | undefined = {
		total: 0,
		total_pages: 0,
		results: []
	};

	const imgCache = new Map<string, Unsplash>();

	async function unsplash() {
		if (!img) return;
		console.log(image);
		

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
</script>

<section class="flex flex-col">
	<div class="inline-flex gap-2 items-center">
		<TextField
			display=""
			required={false}
			onkeydown={debounce(unsplash, 1000)}
			title="Escolha uma imagem"
			bind:value={img}
			style="outlined"
			trailingIcon=""
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
