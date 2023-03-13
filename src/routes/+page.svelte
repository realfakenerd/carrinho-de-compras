<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	// import mercado from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';

	export let data;

	const {mercado} = data;
</script>

<section class="py-2">
	<h1 class="text-title-large">Carrinho da nuvem</h1>
</section>

{#if $user && $user.emailVerified}
	<section class="py-3">
		<AddDrawer d={'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'} />
	</section>
{/if}

<ul class="bg-surface-variant py-2 sm:rounded-xl">
	{#each $mercado as item (item.id)}
		<li>
			<ItemCard {...item} />
		</li>
		<hr />
	{:else}
		<li class="p-4 space-y-4  animate-pulse md:p-6">
			<div class="flex justify-between items-center">
				<div>
					<div class="h-2.5 rounded-full bg-background w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-surface-5" />
				</div>
				<div class="h-2.5  rounded-full bg-background w-12" />
			</div>
			<div class="flex justify-between items-center">
				<div>
					<div class="h-2.5 rounded-full bg-background w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-surface-5" />
				</div>
				<div class="h-2.5  rounded-full bg-background w-12" />
			</div>
			<div class="flex justify-between items-center">
				<div>
					<div class="h-2.5 rounded-full bg-background w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-surface-5" />
				</div>
				<div class="h-2.5  rounded-full bg-background w-12" />
			</div>
			<div class="flex justify-between items-center">
				<div>
					<div class="h-2.5 rounded-full bg-background w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-surface-5" />
				</div>
				<div class="h-2.5  rounded-full bg-background w-12" />
			</div>
			<span class="sr-only">Loading...</span>
		</li>
	{/each}
</ul>
