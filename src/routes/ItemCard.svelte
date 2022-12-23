<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { porNoCarrinho } from '$lib/stores/carrinho.store';

	let preco: string;
	let nome: string;
	let img: string;
	let customQuantidade = 0;

	export { preco, nome, img };

	// card-side h-40 w-24 w-60
</script>

<section class="card card-side card-compact bg-base-300">
	<figure class="w-32">
		<img class="max-h-[13rem] w-60" src={img} alt="produto" />
	</figure>
	<div class="card-body">
		<div class="card-title capitalize">{nome}</div>
		<p>Preço R${preco}</p>

		<div class="card-actions justify-end">
			<div class="btn-group">
				<button
					on:click={porNoCarrinho({
						nome: nome,
						preco: preco,
						quantidade: 1
					})}
					class="btn btn-primary btn-sm fill-white"
				>
					<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
				</button>
				<button
					on:click={porNoCarrinho({
						nome: nome,
						preco: preco,
						quantidade: 5
					})}
					class="btn btn-secondary btn-sm fill-white"
				>
					<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
					5
				</button>
				<button
					on:click={porNoCarrinho({
						nome: nome,
						preco: preco,
						quantidade: 10
					})}
					class="btn btn-accent btn-sm fill-white"
				>
					<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
					10
				</button>
			</div>

			<div class="form-control">
				<div class="input-group-sm input-group">
					<input
						type="number"
						class="input-bordered input input-sm w-14"
						bind:value={customQuantidade}
						on:keyup={porNoCarrinho({
							nome: nome,
							preco: preco,
							quantidade: customQuantidade
						})}
					/>
					<button
						on:click={porNoCarrinho({
							nome: nome,
							preco: preco,
							quantidade: customQuantidade
						})}
						class="btn btn-square btn-sm fill-base-content"
					>
						<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
					</button>
				</div>
			</div>
		</div>
	</div>
</section>
