<script lang="ts">
	import { db } from '$lib/db';
	import { ItemTipo } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import { liveQuery } from 'dexie';
	import { slide } from 'svelte/transition';

	let dbCarrinho = liveQuery(() => db.carrinho.toArray());

	let total = $state(0);
	let totalDeItens = $state(0);
	let pesoDoCarrinho = $state(0);

	dbCarrinho.subscribe((items) => {
		const unidades = items.filter(({ tipo }) => tipo === ItemTipo.UNIDADE);
		const kg = items.filter(({ tipo }) => tipo === ItemTipo.KILO);

		totalDeItens = unidades.length + kg.length;
		pesoDoCarrinho = kg.reduce((a, { quantidade }) => a + quantidade, 0);

		total = items.reduce((acc, { preco, quantidade, tipo }) => {
			const price = parseFloat(preco);
			return tipo === ItemTipo.UNIDADE
				? acc + price * quantidade
				: acc + +(price * quantidade).toFixed(2);
		}, 0);
	});

	async function removerCarrinho(id?: string) {
		await db.carrinho.delete(id!);
	}

	const produtos = liveQuery(() => db.produtos.toArray());
</script>

<div class="flex flex-col md:flex-row items-start gap-4 p-4">
	<section class="card card-filled flex-1 items-center justify-between w-full min-h-[40dvh]">
		<h1>Seu Carrinho</h1>

		{#if $produtos && $produtos.length}
			<button
				class="btn text-label-large interactive-bg-error"
				on:click={() => db.produtos.clear()}
			>
				<Icon width="24px" icon="mdi:trash-can-outline" />
				Apagar Tudo
			</button>
		{/if}
	</section>

	<section class="w-full md:w-1/2 flex flex-col gap-2">
		<section class="[&>div]:flex [&>div]:justify-between card card-filled w-full text-body-large">
			<div>
				<p>Itens no carrinho</p>
				<span>{totalDeItens}</span>
			</div>
			<hr class="border border-outline" />
			<div>
				<p>Peso do carrinho</p>
				<span>{pesoDoCarrinho.toFixed(2)} Kg</span>
			</div>
			<hr class="border border-outline" />
			<div>
				<p>Vai pagar quanto?</p>
				<span>R$ {total.toFixed(2)}</span>
			</div>
		</section>

		<ul class="card gap-4 card-filled w-full">
			{#if $dbCarrinho}
				{#each $dbCarrinho as { nome, preco, quantidade, id, tipo } (id)}
					<li out:slide={{ axis: 'y' }} class="transition-colors hover:bg-surface-1 min-h-full">
						<div class="flex flex-row items-center justify-between w-full">
							<div>
								<div class="flex items-center gap-x-2">
									<h1 class="text-body-large capitalize">{nome}</h1>
									<span class="text-body-small rounded-xl bg-secondary px-1 text-on-secondary">
										{quantidade.toFixed(2)}
										{tipo === ItemTipo.KILO ? 'Kg' : 'Uni'}
									</span>
								</div>
								<p class="text-body-medium">R${preco}</p>
							</div>

							<button
								class="icon-btn-container interactive-bg-error"
								on:click={() => removerCarrinho(id)}
							>
								<span class="icon-btn">
									<Icon icon="mdi:minus" />
								</span>
							</button>
						</div>
					</li>
				{:else}
					<li class="py-2 pl-4 pr-6 flex flex-col gap-1">
						<h1>Oops!</h1>
						<p class="text-text-body-medium">Não há items dentro do carrinho</p>
					</li>
				{/each}
			{/if}
		</ul>
	</section>
</div>
