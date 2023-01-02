<script lang="ts">
	import { db } from '$lib/firebase';
	import user from '$lib/stores/user.store';
	import { doc, setDoc } from 'firebase/firestore';
	import {
		Button, Drawer, Heading,
		Input,
		Label,
		Listgroup,
		ListPlaceholder
	} from 'flowbite-svelte';
	import { backOut, sineOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import AddDrawer from '$lib/components/AddDrawer.svelte';

	export let data: PageData;
	const { mercado } = data;

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
