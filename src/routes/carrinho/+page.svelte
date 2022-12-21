<script lang="ts">
	import carrinho, { type Carrinho } from '$lib/stores/carrinho.store';
	import { onMount } from 'svelte';

	function tirarDoCarrinho(nome: string, preco: string) {
		carrinho.update((val) => {
			for (let i = 0; i < val.length; i++) {
				if (val[i].nome == nome) {
					val.splice(i, 1);
				}
			}
			return val;
		});

		return null;
	}

	$: total = (() => {
		if ($carrinho.length === 0) return 0;

		const lista = $carrinho.map((val) => {
			let sum = 0;
			let i = 0;
			for (i; i < val.quantidade; i++) {
				sum += parseFloat(val.preco);
			}

			return parseFloat(sum.toFixed(2));
		});

		if (lista.length === 1) return lista[0];
		return lista.reduce((a, b) => a + b);
	})();
</script>

<section class="flex flex-col gap-5">
	<div class="card bg-base-200">
		<div class="card-body">
			<p>Itens no carrinho {$carrinho.length}</p>
			<p>Vai pagar quanto? R${total.toFixed(2)}</p>
		</div>
	</div>

	{#each $carrinho as c}
		<div class="card card-compact bg-base-200">
			<div class="card-body">
				<h1 class="card-title items-baseline">
					{c.nome}
					<span class="badge badge-primary">{c.quantidade}</span>
				</h1>
				<p>R${c.preco}</p>


				<div class="card-actions">
					<button on:click={tirarDoCarrinho(c.nome, c.preco)} class="btn-error btn-sm btn">-</button
					>
				</div>
			</div>
		</div>
	{:else}
		<div class="card bg-base-200">
			<div class="card-body">
				<h1 class="card-title">Oops!</h1>
				<p>não há items dentro do carrinho</p>
			</div>
		</div>
	{/each}
</section>
