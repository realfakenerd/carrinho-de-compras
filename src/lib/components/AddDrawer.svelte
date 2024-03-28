<script lang="ts">
	import { addItemToMercado } from '$lib/db';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import Icon from '@iconify/svelte';
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import Fab from './FAB.svelte';
	import type { Unsplash } from './drawer';
	import { RadioGroup, RadioGroupItem } from './radio-group';
	import { TextField } from './textfield';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger, drawerState } from './vaul';

	let nome = '',
		preco = '',
		img = '',
		tipo = ItemTipo.UNIDADE;

	const {
		elements: { root, item },
		states: { value }
	} = createRadioGroup();

	let images: Unsplash | null = {
		total: 0,
		total_pages: 0,
		results: []
	};
	let gridTemplateRows = '0fr';
	async function unsplash() {
		if (img === '') return;
		const res = await fetch(`https://api.unsplash.com/search/photos/?query=${img}&per_page=9`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Client-ID g4OdDhmb2xX2x_YlHP6EnHru--MGm1cxdddPrHcQx4o'
			}
		});

		gridTemplateRows = '1fr';
		images = (await res.json()) as Unsplash;
		console.log(images);
	}

	type StringToIMG = [string: 'src', string: 'alt', string: 'color', string: 'blurhash'];

	function addItem() {
		if (nome !== '' && preco !== '') {
			const string = $value.split('|') as StringToIMG;
			addItemToMercado({
				nome,
				preco,
				img: {
					src: string[0],
					alt: string[1],
					color: string[2],
					blur_hash: string[3]
				},
				tipo
			});
			drawerState.set(false);
			img = nome = preco = '';
			tipo = ItemTipo.UNIDADE;
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

	// function blurhash(node: HTMLCanvasElement, hash: string) {
	// 	const height = node.height;
	// 	const width = node.width;
	// 	const ctx = node.getContext('2d');
	// 	const imageData = ctx?.createImageData(width, height);
	// 	imageData?.data.set(decode(hash, width, height));
	// 	ctx?.putImageData(imageData!, 0, 0);
	// }
</script>

<Drawer bind:open={$drawerState}>
	<DrawerTrigger on:click={() => drawerState.set(true)}>
		<Fab />
	</DrawerTrigger>

	<DrawerContent>
		<DrawerTitle class="text-title-medium">Adicione um novo item ao mercado</DrawerTitle>
		<form class="flex flex-col space-y-6">
			<TextField title="Nome do produto" bind:value={nome} style="outlined" />
			<TextField title="Preço do produto" bind:value={preco} style="outlined" />
			<div>
				<TextField
					on:keydown={debounce(unsplash, 900)}
					title="Escolha uma imagem"
					bind:value={img}
					style="outlined"
				/>

				<ul use:melt={$root} class="grid grid-cols-3 gap-4 pt-2 justify-center">
					{#if images && images?.results?.length}
						{#each images.results as image, i (i)}
							<figure
								style:--tw-ring-color={image.color}
								class="relative h-[80px] overflow-hidden rounded-xl ring-2 ring-primary hover:ring-primary hover:ring-4 transition"
								on:m-click={() => {
									images = null;
								}}
								use:melt={$item({
									value: `${image.urls.regular}|${image.alternative_slugs.pt}|${image.color}|${image.blur_hash}`
								})}
							>
								<img
									src={image.urls.thumb}
									alt={image.alternative_slugs.pt}
									height="80px"
									width="200px"
									loading="lazy"
									class="object-cover h-full w-[200px] bg-surface-variant"
								/>
							</figure>
						{/each}
					{/if}
				</ul>
			</div>
			<RadioGroup defaultValue={String(ItemTipo.UNIDADE)}>
				<RadioGroupItem bind:value={tipo} label="Unidade" option={String(ItemTipo.UNIDADE)} />
				<RadioGroupItem bind:value={tipo} label="Kilo" option={String(ItemTipo.KILO)} />
			</RadioGroup>
			<button on:click={() => addItem()} class="btn text-label-large btn-filled w-full">
				<Icon icon="mdi:plus" width="24px" />
				<span> Adicionar </span>
			</button>
		</form>
	</DrawerContent>
</Drawer>
