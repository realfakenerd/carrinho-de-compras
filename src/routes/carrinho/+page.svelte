<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import carrinho from '$lib/stores/carrinho.store';

	function tirarDoCarrinho(nome: string) {
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

	$: totalDeItens = (() => {
		if ($carrinho.length === 0) return 0;
		if ($carrinho.length === 1) return $carrinho[0].quantidade;
		return $carrinho.reduce((a, b) => (a.quantidade + b.quantidade) as any) as unknown as number;
	})();

	$: total = (() => {
		if ($carrinho.length === 0) return 0;

		const lista = $carrinho.map((val) => {
			return parseFloat(val.preco) * val.quantidade;
		});

		if (lista.length === 1) return lista[0];
		return lista.reduce((a, b) => a + b);
	})();
</script>

<section class="flex flex-col gap-5">
	<div class="card bg-base-200">
		<div class="card-body">
			<p>Itens no carrinho {totalDeItens}</p>
			<p>Vai pagar quanto? R${total.toFixed(2)}</p>
		</div>
	</div>

	{#each $carrinho as c}
		<div class="card card-compact bg-base-200">
			<div class="card-body">
				<h1 class="card-title items-baseline">
					{c.nome}
					<span class="badge-primary badge">{c.quantidade}</span>
				</h1>
				<p>R${c.preco}</p>

				<div class="card-actions justify-end">
					<button on:click={tirarDoCarrinho(c.nome)} class="btn-error btn-sm btn">
						<Icon d="M19 13H5v-2h14v2z" />
					</button>
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
