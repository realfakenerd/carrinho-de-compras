<script lang="ts">
	import { createItem } from '$lib/servicos/mercado-crud';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import Fab from './FAB.svelte';
	import type { Unsplash } from './drawer';
	import { RadioGroup, RadioGroupItem } from './radio-group';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './vaul';

	let customQuantidade: number;
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
			<label>
				<span class="text-label-medium">Nome do produto{nome ? ':' : ''} {nome}</span>
				<input type="text" bind:value={nome} required />
			</label>
			<label>
				<span class="text-label-medium"
					>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span
				>
				<input bind:value={preco} type="number" required />
			</label>

			<div>
				<label>
					<span class="text-label-medium">Escolha uma imagem também</span>
					<input bind:value={img} type="text" on:keydown={debounce(unsplash, 300)} />
				</label>

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

<style lang="postcss">
	input:not(input[type='radio']) {
		@apply w-full rounded-full border-none bg-surface-variant 
		pl-4 ring-1 ring-on-surface-variant  transition py-2;
	}
	input:not(input[type='radio']):placeholder {
		@apply text-on-surface-variant;
	}
	input:not(input[type='radio']):focus {
		@apply bg-surface-1 ring-2 ring-on-surface-variant;
	}
	.cus-btn {
		@apply flex place-items-center bg-primary fill-on-primary px-3  text-on-primary transition;
	}
	.cus-btn:hover {
		@apply bg-primary/70;
	}
</style>
