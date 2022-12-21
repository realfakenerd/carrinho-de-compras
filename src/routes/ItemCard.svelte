<script lang="ts">
	import { porNoCarrinho } from '$lib/stores/carrinho.store';

	let preco: string;
	let nome: string;
    let img: string;
	let customQuantidade = 0;

	export { preco, nome, img };
</script>

<section class="card card-compact card-side bg-base-300">
	<figure class="w-24 h-40">
		<img class="w-60" src={img} alt="produto" />
	</figure>
	<div class="card-body">
		<div class="card-title capitalize">{nome}</div>
		<p>Preço R${preco}</p>

		<div class="card-actions flex-nowrap justify-between">
			<div class="btn-group">
				<button
					on:click={porNoCarrinho({
						nome: nome,
						preco: preco,
						quantidade: 1
					})}
					class="btn btn-primary btn-sm"
				>
					+
				</button>
				<button
					on:click={porNoCarrinho({
						nome: nome,
						preco: preco,
						quantidade: 5
					})}
					class="btn btn-secondary btn-sm"
				>
					+ 5
				</button>
				<button
					on:click={porNoCarrinho({
						nome: nome,
						preco: preco,
						quantidade: 10
					})}
					class="btn btn-accent btn-sm">+ 10</button
				>
			</div>

			<div class="form-control">
				<div class="input-group-sm input-group">
					<input
						type="number"
						class="input-bordered input input-sm w-14"
						bind:value={customQuantidade}
					/>
					<button
						on:click={porNoCarrinho({
							nome: nome,
							preco: preco,
							quantidade: customQuantidade
						})}
						class="btn btn-square btn-sm"
					>
						+
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
