<script lang="ts">
	import { addItemToMercado } from '$lib/db';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import Icon from '@iconify/svelte';
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import Fab from './FAB.svelte';
	import type { Unsplash } from './drawer';
	import { RadioGroup, RadioGroupItem } from './radio-group';
	import { TextField } from './textfield';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './vaul';

	let nome = '',
		preco = '',
		img = '',
		tipo = ItemTipo.UNIDADE;

	const {
		elements: { root, item },
		states: { value }
	} = createRadioGroup();

	function addItem() {
		if (nome !== '' && preco !== '') {
			addItemToMercado({ nome, preco, img: $value, tipo });
			img = nome = preco = '';
			tipo = ItemTipo.UNIDADE;
		}
	}

	let images: Unsplash | null = {
		total: 0,
		total_pages: 0,
		results: []
	};
	async function unsplash() {
		console.log('img', img);

		if (img === '') return;
		const res = await fetch(`https://api.unsplash.com/search/photos/?query=${img}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Client-ID g4OdDhmb2xX2x_YlHP6EnHru--MGm1cxdddPrHcQx4o'
			}
		});

		images = (await res.json()) as Unsplash;
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

<Drawer>
	<DrawerTrigger>
		<Fab />
	</DrawerTrigger>

	<DrawerContent class="max-h-[96dvh] h-full flex flex-col gap-4 overflow-y-scroll">
		<DrawerTitle class="text-title-medium">Adicione um novo item ao mercado</DrawerTitle>
		<form class="flex flex-col space-y-6">
			<TextField title="Nome do produto" bind:value={nome} style="outlined" />
			<TextField title="Preço do produto" bind:value={preco} style="outlined" />
			<div>
				<TextField
					on:keydown={debounce(unsplash, 300)}
					title="Escolha uma imagem"
					bind:value={img}
					style="outlined"
				/>

				{#if images && images?.results?.length}
					<ul use:melt={$root} class="flex flex-wrap gap-4 justify-center py-4">
						{#each images.results as image}
							<figure on:m-click={() => (images = null)} use:melt={$item(image.urls.regular)}>
								<img
									src={image.urls.thumb}
									alt={image.description}
									height="96px"
									class="aspect-square rounded-xl ring-2 ring-background hover:ring-primary hover:ring-4 transition object-cover h-24 bg-surface-variant"
								/>
							</figure>
						{/each}
					</ul>
				{/if}
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
