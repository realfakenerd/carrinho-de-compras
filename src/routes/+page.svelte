<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import user from '$lib/stores/user.store';

	export let data;
	const { mercado } = data;
</script>

<section class="py-8 px-2 flex flex-col gap-4">
	<section>
		<h1 class="text-headline-large">Carrinho da nuvem</h1>
	</section>

	<ul class="grid gap-2 justify-center">
		{#each $mercado as item (item.id)}
			<li>
				<ItemCard {...item} />
			</li>
		{:else}
			<li>
				<div class="w-full h-32 bg-surface-variant"></div>
			</li>
			<li>
				<div class="w-full h-32 bg-surface-variant"></div>
			</li>
			<li>
				<div class="w-full h-32 bg-surface-variant"></div>
			</li>
		{/each}
	</ul>
</section>

{#if $user && $user.emailVerified}
	<AddDrawer />
{/if}

<style lang="postcss">
	li:last-child hr {
		@apply hidden;
	}

	ul.grid {
		grid-template-columns: repeat(auto-fit, minmax(0, 184px));
	}
</style>
