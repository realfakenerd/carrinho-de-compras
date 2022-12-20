<script lang="ts">
	import carrinho from '$lib/stores/carrinho.store';

	function tirarDoCarrinho(nome: string, preco: string) {
		for (let i = 0; i < $carrinho.length; i++) {
			if ($carrinho[i].nome == nome) {
				$carrinho.splice(i, 1);
			}
		}

		return null;
	}

	const total =
		$carrinho.length > 0 &&
		//@ts-expect-error is not carrinho
		$carrinho.reduce((a, b) => {
			if (typeof a === 'number') {
				return a + parseFloat(b.preco);
			}
			return parseFloat(a.preco) + parseFloat(b.preco);
		});
</script>

<section class="flex flex-col gap-5">
	<div class="card bg-base-200">
		<div class="card-body">
			<p>Itens no carrinho {$carrinho.length}</p>
			<p>Vai pagar quanto? {total}</p>
		</div>
	</div>

	{#each $carrinho as c}
		<div class="card-compact card bg-base-200">
			<div class="card-body">
				<h1 class="card-title">{c.nome}</h1>
				<p>R${c.preco}</p>

				<div class="card-actions">
					<button on:click={tirarDoCarrinho(c.nome, c.preco)} class="btn btn-error">-</button>
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
