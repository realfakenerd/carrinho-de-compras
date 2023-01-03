<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import mercado from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';
	import {
		Heading, Listgroup,
		ListPlaceholder
	} from 'flowbite-svelte';
	import { backOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

</script>

<section class="flex flex-row items-center justify-between pb-5">
	<Heading tag="h1" customSize="text-2xl">Carrinho da nuvem</Heading>
</section>

<section class="py-5">
	{#if $user && $user.emailVerified}
		<AddDrawer btnText="Adicione um item" />
	{/if}
</section>

<Listgroup>
	{#each $mercado as item, i (item.id)}
		<div in:slide={{ duration: 500, delay: i * 200, easing: backOut }}>
			<ItemCard {...item} />
		</div>
	{:else}
		<ListPlaceholder />
	{/each}
</Listgroup>
