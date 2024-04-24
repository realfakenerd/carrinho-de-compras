<script lang="ts">
	import Fab from '$lib/components/FAB.svelte';
	import {
		AddCategoriaDrawer,
		AddDrawer,
		AddItemDrawer,
		categoriaDrawerState,
		produtoDrawerState
	} from '$lib/components/add-drawer';
	import { ItemCard } from '$lib/components/item-card';
	import { TextField } from '$lib/components/textfield/index.js';
	import { db } from '$lib/db';
	import { createMercadoIndex, searchMercadoIndex } from '$lib/search';
	import { handleFile, readXLSX } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import { fly } from 'svelte/transition';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let { produtos, mercados, categorias } = data;

	let value = $state('');
	let result = $state($produtos);

	$effect(() => {
		if ($produtos) createMercadoIndex($produtos);

		if (value) {
			result = searchMercadoIndex(value.trim());
		} else result = $produtos;
	});
</script>

<section class="py-8 px-2 flex flex-col gap-4">
	<div class="relative mb-6 flex w-full items-center">
		<TextField bind:value style="outlined" title="Pesquisar" trailingIcon="mdi:search" />
	</div>

	<section class="flex flex-col gap-4">
		<h1 class="text-headline-large w-full">Carrinho de compras</h1>

		<ul class="flex flex-row flex-wrap gap-2">
			{#if $categorias}
				{#each $categorias as categoria}
					<li class="chips-input text-label-large">
						<button class="chips chips-content items-center">
							{categoria.nome}
						</button>
					</li>
				{/each}
				<li class="chips-input text-label-large">
					<button
						onclick={() => categoriaDrawerState.set(true)}
						class="chips chips-content items-center"
					>
						<Icon width="24px" icon="mdi:tag-plus" />
						Categoria
					</button>
				</li>
			{/if}
		</ul>

		{#if $produtos && $produtos.length}
			<button
				class="h-12 min-w-12 grid place-items-center rounded-full interactive-bg-error"
				on:click={() => db.mercado.clear()}
			>
				<Icon width="24px" icon="mdi:trash-can-outline" />
			</button>
		{/if}
	</section>

	<ul class="grid gap-4 justify-center">
		{#if $mercados}
			{#each $mercados as mercado}
				{mercado.nome}
			{:else}
				<li class="card card-filled gap-1 justify-end w-full h-[280px]">
					<h1 class="text-title-large">Oops!</h1>
					<p class="text-body-medium">Nenhum mercado encontrado</p>
					<p class="text-body-medium">Tente Adicionar algo na lista</p>
				</li>
			{/each}
		{/if}
	</ul>

	<ul class="grid gap-4 justify-center">
		{#if result}
			{#each result as { img, nome, preco, tipo, id }, i (i)}
				<li transition:fly={{ delay: i * 0.1 }}>
					<ItemCard {img} {nome} {preco} {tipo} {id} />
				</li>
			{:else}
				<li class="card card-filled gap-1 justify-end w-full h-[280px]">
					<h1 class="text-title-large">Oops!</h1>
					<p class="text-body-medium">Nenhum item encontrado</p>
					<p class="text-body-medium">Tente Adicionar algo na lista</p>
				</li>
			{/each}
		{:else}
			<li
				transition:fly={{ delay: 300, duration: 300 }}
				class="card card-filled animate-pulse h-[280px] w-full"
			/>
			<li
				transition:fly={{ delay: 300, duration: 300 }}
				class="card card-filled animate-pulse h-[280px] w-full"
			/>
			<li
				transition:fly={{ delay: 300, duration: 300 }}
				class="card card-filled animate-pulse h-[280px] w-full"
			/>
			<li
				transition:fly={{ delay: 300, duration: 300 }}
				class="card card-filled animate-pulse h-[280px] w-full"
			/>
		{/if}
	</ul>

	<section class="flex flex-col gap-2 w-full">
		<label class="text-label-large" for="d"> Importar de planilha </label>
		<input
			accept=".ods,.xls,.xlsx"
			class="bg-surface-variant p-4 rounded-lg file:border-0 file:rounded-md file:p-1 file:bg-surface file:text-label-medium file:text-primary"
			oninput={(e) => {
				const file = handleFile(e);
				readXLSX(file);
			}}
			type="file"
			multiple={false}
			name="import"
			id="d"
		/>
	</section>
</section>

<div class="fixed bottom-24 right-4 z-50 flex flex-col gap-4 items-end">
	<Fab class="w-14" onclick={() => categoriaDrawerState.set(true)}>
		<Icon icon="mdi:store-plus" width="24px" />
	</Fab>
	<Fab class="inline-flex gap-2 min-w-20 text-label-large items-center" onclick={() => produtoDrawerState.set(true)}>
		<Icon icon="mdi:plus" width="24px" />
		Produto
	</Fab>
</div>

<AddDrawer bind:open={$categoriaDrawerState}>
	<AddCategoriaDrawer />
</AddDrawer>

<AddDrawer bind:open={$produtoDrawerState}>
	<AddItemDrawer />
</AddDrawer>

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fit, minmax(0, 11rem));
	}

	ul::-webkit-scrollbar {
		@apply hidden;
	}
</style>
