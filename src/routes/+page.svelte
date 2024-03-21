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
		{#each $mercado as { img, nome, preco, tipo }, i (i)}
			<li>
				<ItemCard {img} {nome} {preco} {tipo} />
			</li>
		{:else}
		<li class="max-w-52 w-full rounded-xl min-h-[280px] bg-surface-variant animate-pulse"></li>
		<li class="max-w-52 w-full rounded-xl min-h-[280px] bg-surface-variant animate-pulse"></li>
		<li class="max-w-52 w-full rounded-xl min-h-[280px] bg-surface-variant animate-pulse"></li>
		<li class="max-w-52 w-full rounded-xl min-h-[280px] bg-surface-variant animate-pulse"></li>
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
