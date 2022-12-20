<script lang="ts">
	import { mercadoRef } from '$lib/db';
	import carrinho from '$lib/stores/carrinho.store';
	import mercado from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';
	import { addDoc } from 'firebase/firestore';
	import { backOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let nome = '';
	let preco = '';

	function addItem() {
		addDoc(mercadoRef, {
			nome,
			preco,
			criado_em: Date.now()
		});

		nome = preco = '';
	}

	function porNoCarrinho(nome: string, preco: string, numberOfItens = 1) {
		carrinho.update((val) => {
			val = [...val, { nome, preco }];
			return val;
		});

		return null;
	}
</script>

<section class="flex flex-col items-center justify-center pb-10">
	<h1 class="text-2xl">Carrinho da nuvem</h1>
</section>

<section class="flex flex-col gap-5 ">
	{#each $mercado as item, i (i)}
		<section in:fly={{ y: 50, delay: 200 * i, easing: backOut }} class="card bg-base-300">
			<div class="card-body">
				<div class="card-title capitalize">{item.nome}</div>
				<p>Preço R${item.preco}</p>

				<div class="card-actions justify-end">
					<div class="btn-group">
						<button on:click={porNoCarrinho(item.nome, item.preco)} class="btn btn-primary btn-sm">
							+
						</button>
						<button
							on:click={porNoCarrinho(item.nome, item.preco, 5)}
							class="btn btn-secondary btn-sm"
						>
							+ 5
						</button>
						<button
							on:click={porNoCarrinho(item.nome, item.preco, 10)}
							class="btn btn-accent btn-sm">+ 10</button
						>
					</div>
				</div>
			</div>
		</section>
	{:else}
		<section class="card bg-base-300">
			<div class="card-body">
				<div class="card-title">carregando items</div>
			</div>
		</section>
	{/each}
</section>

<section class="py-5">
	{#if $user}
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
								type="text"
								pattern={String.raw`\d{1,7},\d{1,2}`}
								class="input-bordered input-primary input w-full focus:valid:input-success focus:invalid:input-error"
							/>
						</section>
					</fieldset>
					<div>
						<button on:click={addItem} class="btn btn-primary btn-block">ADD</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</section>
