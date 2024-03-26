<script lang="ts">
	import TextField from '$lib/components/textfield/text-field.svelte';
	import { db } from '$lib/db';
	import { tirarDoCarrinho } from '$lib/servicos/carrinho-crud';
	import carrinho from '$lib/stores/carrinho.store';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import Icon from '@iconify/svelte';

	const user = db.cloud.currentUser;

	let totalDeItens = 0;
	let pesoDoCarrinho = 0;

	carrinho.subscribe((val) => {
		totalDeItens = val.reduce((a, { quantidade, tipo }) => {
			if (tipo === ItemTipo.KILO) return a;
			return a + quantidade;
		}, 0);

		console.log(totalDeItens);

		pesoDoCarrinho = val.reduce((a, { quantidade, tipo }) => {
			if (tipo === ItemTipo.UNIDADE) return a;
			return a + quantidade;
		}, 0);
	});

	let total = 0;

	$: {
		for (let i = 0; i < $carrinho.length; i++) {
			const item = $carrinho[i];
			if (item.tipo === ItemTipo.UNIDADE) total += parseFloat(item.preco) * item.quantidade;
			else total += +(parseFloat(item.preco) * item.quantidade).toFixed(2);
		}
	}

	let email = '';
</script>

<div class="flex flex-col md:flex-row items-start gap-4 p-4">
	<section class="card card-filled flex-1 items-center justify-between w-full min-h-[40dvh]">
		{#if $user.isLoggedIn}
			<div class="flex flex-col gap-y-4 items-center">
				<h1 class="text-title-large">{$user?.name}</h1>
				<p>{$user.email}</p>
			</div>
			<button on:click={() => db.cloud.logout()} class="btn interactive-bg-error">Logout</button>
		{:else}
			<div class="flex flex-col gap-y-4">
				<h1 class="text-headline-large">Faça o login aqui</h1>
			</div>
			<TextField bind:value={email} icon="mdi:email" title="Email" />
			<button
				on:click={() =>
					db.cloud.login({
						email
					})}
				class="btn interactive-bg-primary w-2/3 gap-x-3"
			>
				<!-- <Icon width="24px" icon="devicon:google" class="p-1 rounded-full bg-white" /> -->
				<p class="text-label-large">Login</p>
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
			{#each $carrinho as c}
				<li class="transition-colors hover:bg-surface-1">
					<div class="flex flex-row items-center justify-between w-full">
						<div>
							<div class="flex items-center gap-x-2">
								<h1 class="text-body-large capitalize">{c.nome}</h1>
								<span class="text-body-small rounded-xl bg-secondary px-1 text-on-secondary">
									{c.quantidade.toFixed(2)}
									{c.tipo === ItemTipo.KILO ? 'Kg' : 'Uni'}
								</span>
							</div>
							<p class="text-body-medium">R${c.preco}</p>
						</div>

						<button
							class="icon-btn-container interactive-bg-error"
							on:click={tirarDoCarrinho(c.nome)}
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
		</ul>
	</section>
</div>
