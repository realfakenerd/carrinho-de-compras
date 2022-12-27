<script lang="ts">
	import { mercadoRef } from '$lib/db';
	import user from '$lib/stores/user.store';
	import { addDoc } from 'firebase/firestore';
	import {
		Button,
		Heading,
		Input,
		Label,
		Listgroup, ListPlaceholder,
		Modal
	} from 'flowbite-svelte';
	import { backOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import ItemCard from './ItemCard.svelte';

	let nome = '';
	let preco = '';
	let img = '';

	export let data: PageData;
	const { mercado } = data;

	function addItem() {
		addDoc(mercadoRef, {
			nome,
			preco,
			img,
			criado_em: Date.now()
		});

		img = nome = preco = '';
	}

	let formModal = false;
</script>

<section class="flex flex-row items-center justify-between pb-5">
	<Heading tag="h1" customSize="text-2xl">Carrinho da nuvem</Heading>
</section>

<section class="py-5">
	{#if $user && $user.emailVerified}
		<Button class="w-full" on:click={() => (formModal = true)}>Adicione um novo item</Button>
		<Modal bind:open={formModal} autoclose>
			<form class="flex flex-col space-y-6">
				<Heading tag="h4">Adicione um novo item ao mercado</Heading>
				<Label class="space-y-2">
					<span>Nome do produto{nome ? ':' : ''} {nome}</span>
					<Input type="email" bind:value={nome} required />
				</Label>
				<Label class="space-y-2">
					<span>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span>
					<Input bind:value={preco} type="number" required />
				</Label>
				<Label class="space-y-2">
					<span>Escolha uma imagem também</span>
					<Input bind:value={img} type="text" />
				</Label>
				<Button on:click={addItem} class="w-full1">ADD</Button>
			</form>
		</Modal>
	{/if}
</section>

<Listgroup>
	{#each $mercado as item, i (i)}
		<div in:slide={{duration: 500, delay: i * 200, easing: backOut}}>
			<ItemCard img={item.img} nome={item.nome} preco={item.preco} />
		</div>
	{:else}
		<ListPlaceholder />
	{/each}
</Listgroup>
