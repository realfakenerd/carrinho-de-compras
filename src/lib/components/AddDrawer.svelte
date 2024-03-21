<script lang="ts">
	import { createItem } from '$lib/servicos/mercado-crud';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import Fab from './FAB.svelte';
	import type { Unsplash } from './drawer';
	import { RadioGroup, RadioGroupItem } from './radio-group';
	import {TextField} from './textfield';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './vaul';

	let nome = '',
		preco = '',
		img = '',
		tipo = ItemTipo.UNIDADE;

	function addItem() {
		if (nome !== '' && preco !== '') {
			createItem({ nome, preco, img, tipo });
			img = nome = preco = '';
			tipo = ItemTipo.UNIDADE;
		}
	}

	let images: Unsplash = [];
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

	<DrawerContent class="max-h-[96%]">
		<DrawerTitle class="text-title-medium">Adicione um novo item ao mercado</DrawerTitle>
		<form class="flex flex-col space-y-6">
			<TextField title="Nome do produto" bind:value={nome} style="outlined"/>
			<TextField title="Preço do produto" bind:value={preco} style="outlined"/>
			<div>
				<TextField on:keydown={debounce(unsplash, 300)} title="Escolha uma imagem" bind:value={img} style="outlined"/>
			
				{#if images && images?.results?.length}
					<ul class="flex flex-wrap gap-2 justify-center overflow-y-scroll h-32">
						{#each images.results as image}
							<figure>
								<img
									src={image.urls.regular}
									alt={image.description}
									class="aspect-square object-cover h-24 bg-surface-variant"
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
			<button on:click={addItem} class="button w-full1">ADD</button>
		</form>
	</DrawerContent>
</Drawer>