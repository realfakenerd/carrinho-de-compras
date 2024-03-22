<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import { TextField } from '$lib/components/textfield/index.js';
	import { createMercadoIndex, searchMercadoIndex } from '$lib/search.js';
	import user from '$lib/stores/user.store';
	import type { Mercado } from '$lib/types.js';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	export let data;
	const { mercado } = data;

	let result: Mercado[] = $mercado;
	let isReady = 'loading';
	onMount(() => {
		createMercadoIndex($mercado);
		isReady = 'ready';
	});

	console.log(result);
	let value: string;
	$: if (isReady === 'ready') {
		result = searchMercadoIndex(value);
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
		{#each result as { img, nome, preco, tipo }, i (i)}
			<li>
				<ItemCard {img} {nome} {preco} {tipo} />
			</li>
		{:else}
			{#each $mercado as { img, nome, preco, tipo }, i (i)}
				<ItemCard {img} {nome} {preco} {tipo} />
			{:else}
				<li class="max-w-52 w-full rounded-xl min-h-[280px] bg-surface-variant animate-pulse"></li>
				<li class="max-w-52 w-full rounded-xl min-h-[280px] bg-surface-variant animate-pulse"></li>
				<li class="max-w-52 w-full rounded-xl min-h-[280px] bg-surface-variant animate-pulse"></li>
				<li class="max-w-52 w-full rounded-xl min-h-[280px] bg-surface-variant animate-pulse"></li>
			{/each}
		{/each}
	</ul>
</section>

{#if $user && $user.emailVerified}
	<AddDrawer />
{/if}

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fit, minmax(0, 184px));
	}
</style>
