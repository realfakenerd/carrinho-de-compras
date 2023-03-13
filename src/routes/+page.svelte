<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import mercado from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';
	import { backOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
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
	{#each $mercado as item, i (item.id)}
		<li in:slide={{ duration: 500, delay: i * 200, easing: backOut }}>
			<ItemCard {...item} />
		</li>
		<hr class="bg-outline-variant h-1 my-2" />
	{:else}
		<section
			class="p-4 space-y-4 border divide-y animate-pulse divide-base-300 md:p-6 border-base-300"
		>
			<div class="flex justify-between items-center">
				<div>
					<div class="h-2.5 rounded-full bg-base-100 w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-base-200" />
				</div>
				<div class="h-2.5  rounded-full bg-base-100 w-12" />
			</div>
			<div class="flex justify-between items-center pt-4">
				<div>
					<div class="h-2.5 rounded-full bg-base-100 w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-base-200" />
				</div>
				<div class="h-2.5  rounded-full bg-base-100 w-12" />
			</div>
			<div class="flex justify-between items-center pt-4">
				<div>
					<div class="h-2.5 rounded-full bg-base-100 w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-base-200" />
				</div>
				<div class="h-2.5  rounded-full bg-base-100 w-12" />
			</div>
			<div class="flex justify-between items-center pt-4">
				<div>
					<div class="h-2.5 rounded-full bg-base-100 w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-base-200" />
				</div>
				<div class="h-2.5  rounded-full bg-base-100 w-12" />
			</div>
			<div class="flex justify-between items-center pt-4">
				<div>
					<div class="h-2.5 rounded-full bg-base-100 w-24 mb-2.5" />
					<div class="w-32 h-2 rounded-full bg-base-200" />
				</div>
				<div class="h-2.5  rounded-full bg-base-100 w-12" />
			</div>
			<span class="sr-only">Loading...</span>
		</section>
	{/each}
</ul>
