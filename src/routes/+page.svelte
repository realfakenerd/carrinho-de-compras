<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import { TextField } from '$lib/components/textfield/index.js';
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';

	let value: string;
	let mercado = liveQuery(() => db.mercado.toArray());

	$: if (value) {
		mercado = liveQuery(() => db.mercado.where('nome').startsWithIgnoreCase(value).toArray());
	} else {
		mercado = liveQuery(() => db.mercado.toArray());
	}
</script>

<section class="py-8 px-2 flex flex-col gap-4">
	<div class="relative mb-6 flex w-full items-center">
		<TextField bind:value style="outlined" title="Pesquisar" trailingIcon="mdi:search" />
	</div>

	<section>
		<h1 class="text-headline-large">Carrinho da nuvem</h1>
	</section>

	<ul class="grid gap-2 justify-center">
		{#if $mercado}
			{#each $mercado as { img, nome, preco, tipo }, i (i)}
				<li>
					<ItemCard {img} {nome} {preco} {tipo} />
				</li>
			{:else}
				<li class="card card-filled gap-1 w-full">
					<h1 class="text-title-large">Oops!</h1>
					<p class="text-body-medium">Nenhum item encontrado</p>
					<p class="text-body-medium">Tente Adicionar algo na lista</p>
				</li>
			{/each}
		{/if}
	</ul>
</section>

<AddDrawer />

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fit, minmax(0, 184px));
	}
</style>
