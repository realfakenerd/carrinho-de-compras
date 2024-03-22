<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import EditDrawer from '$lib/components/EditDrawer.svelte';
	import { TextField } from '$lib/components/textfield';
	import { createMercadoIndex, searchMercadoIndex } from '$lib/search';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/servicos/carrinho-crud';
	import type { Mercado } from '$lib/stores/mercado.store';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let data;
	let value = '';
	let customQuantidade: number;

	let result: Mercado[] = [];

	const { mercado } = data;

	let search: 'loading' | 'ready' = 'loading';
	onMount(() => {
		createMercadoIndex($mercado);
		search = 'ready';
	});

	$: if (search === 'ready') {
		result = searchMercadoIndex(value);
	}
</script>

<div class="relative mb-6 flex w-full items-center">
</div>

<ul class="bg-surface-variant sm:rounded-xl">
	{#each result as { nome, img, preco, tipo, id, ref }, i (i)}
		<li class="flex flex-col py-3 pl-4 pr-6" transition:slide>
			<div class="flex flex-row items-center gap-x-4">
				<img
					class="h-16 w-16 rounded-lg object-cover"
					src={img || 'https://dummyimage.com/80x80/fff/111'}
					alt=""
					height="64"
					width="64"
				/>
				<div class="grid w-full grid-cols-2 grid-rows-2 items-center">
					<h2 class="text-body-large col-span-2">
						{@html nome}
						{tipo === ItemTipo.KILO ? 'Kg' : 'Uni'}
					</h2>
					<p class="text-body-medium text-on-surface-variant">R${preco}</p>
					<div class="inline-flex place-self-end">
						{#if $user}
							<EditDrawer {ref} {preco} {nome} {img} />
						{/if}
					</div>
				</div>
			</div>
			<hr />
			<div class="flex flex-row items-center gap-3">
				<ul class="inline-flex h-10">
					<button
						class="cus-btn rounded-l-full"
						on:click={porNoCarrinho({
							nome,
							preco,
							quantidade: 1,
							tipo
						})}
					>
						<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
					</button>
					<button
						class="cus-btn border-on-outline-variant border-r border-l"
						on:click={porNoCarrinho({
							nome,
							preco,
							quantidade: 2,
							tipo
						})}
					>
						<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
						<p class="body-medium">2</p>
					</button>
					<button
						class="cus-btn rounded-r-full"
						on:click={porNoCarrinho({
							nome,
							preco,
							quantidade: 6,
							tipo
						})}
					>
						<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
						<p class="body-medium">6</p>
					</button>
				</ul>

				<div class="relative flex w-full items-center">
					<div class="absolute fill-on-surface-variant pl-2">
						<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
					</div>
					<input
						class="border-nonex w-full rounded-md bg-background py-2 pl-12 pr-4 ring-1 ring-on-surface-variant transition focus:ring-2 focus:ring-on-surface-variant"
						type="number"
						bind:value={customQuantidade}
						on:keyup={porNoCarrinhoInput({
							nome,
							preco,
							quantidade: customQuantidade,
							tipo
						})}
					/>
				</div>
			</div>

			<hr />
		</li>
	{:else}
		<li>
			<div class="pl-4 pr-6 py-2">
				<p class="text-body-large">Nada encontrado</p>
			</div>
			{#if $user}
				<AddDrawer />
			{/if}
		</li>
	{/each}
</ul>

<style lang="postcss">
	li:last-child hr {
		@apply hidden;
	}
	.cus-btn {
		@apply flex place-items-center bg-primary fill-on-primary px-3  text-on-primary transition hover:bg-primary/70;
	}
</style>
