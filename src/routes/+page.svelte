<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import ItemCardSkeleton from '$lib/components/ItemCardSkeleton.svelte';
	import user from '$lib/stores/user.store';
	import { onMount } from 'svelte';
	import { createMercadoIndex } from '$lib/search';

	export let data;
	const { mercado } = data;
</script>

<section class="py-2">
	<h1 class="text-title-large">Carrinho da nuvem</h1>
</section>

<ul class="bg-surface-variant py-2 sm:rounded-xl">
	{#each $mercado as item (item.id)}
		<li>
			<ItemCard {...item} />
			<hr />
		</li>
	{:else}
		<ItemCardSkeleton />
	{/each}
</ul>

{#if $user && $user.emailVerified}
	<AddDrawer />
{/if}

<style lang="postcss">
	li:last-child hr {
		@apply hidden;
	}
</style>
