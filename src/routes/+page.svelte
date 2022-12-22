<script lang="ts">
	import { mercadoRef } from '$lib/db';
	import user from '$lib/stores/user.store';
	import { addDoc } from 'firebase/firestore';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
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
</script>

<section class="grid grid-cols-1 place-items-center pb-5">
	<h1 class="text-2xl">Carrinho da nuvem</h1>
</section>

<section class="py-5">
	{#if $user && $user.emailVerified}
		<div class="card bg-base-300">
			<div class="card-body">
				<div class="card-title">Adicione um novo item</div>

				<form class="space-y-5">
					<fieldset class="space-y-3">
						<section>
							<label for="nome" class="label">
								<span class="label-text">Nome do produto{nome ? ':' : ''} {nome}</span>
							</label>
							<input
								bind:value={nome}
								id="nome"
								type="text"
								class="input-bordered input-primary input w-full focus:valid:input-success focus:invalid:input-error"
							/>
						</section>
						<section>
							<label for="preco" class="label">
								<span class="label-text"
									>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span
								>
							</label>
							<input
								bind:value={preco}
								id="preco"
								type="number"
								pattern={String.raw`\d{1,7},\d{1,2}`}
								class="input-bordered input-primary input w-full focus:valid:input-success focus:invalid:input-error"
							/>
						</section>
						<section>
							<label for="img" class="label">
								<span class="label-text">Escolha uma imagem também</span>
							</label>
							<input
								bind:value={img}
								id="img"
								type="text"
								class="input-bordered input-primary input w-full focus:valid:input-success focus:invalid:input-error"
							/>
						</section>
					</fieldset>
					<div>
						<button on:click={addItem}  class="btn-primary btn-block btn">ADD</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</section>

<section class="grid grid-cols-1 gap-5 md:grid-cols-3">
	{#each $mercado as item, i (i)}
		<div in:fly={{ y: 50, delay: 200 * i, easing: backOut }}>
			<ItemCard nome={item.nome} preco={item.preco} img={item.img} />
		</div>
	{:else}
		<section class="card bg-base-300">
			<div class="card-body">
				<div class="card-title">carregando items</div>
			</div>
		</section>
	{/each}
</section>
