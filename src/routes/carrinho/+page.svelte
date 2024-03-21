<script lang="ts">
	import { auth } from '$lib/firebase';
	import { tirarDoCarrinho } from '$lib/servicos/carrinho-crud';
	import carrinho from '$lib/stores/carrinho.store';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';
	import Icon from '@iconify/svelte';
	import { createAvatar, melt } from '@melt-ui/svelte';
	import type { FirebaseError } from 'firebase/app';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	let totalDeItens = 0;
	let pesoDoCarrinho = 0;
	carrinho.subscribe((val) => {
		totalDeItens = val.reduce((a, { quantidade, tipo }) => {
			if (tipo === ItemTipo.KILO) return a;
			return a + quantidade;
		}, 0);

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

	async function login() {
		try {
			await signInWithPopup(auth, new GoogleAuthProvider());
		} catch (err) {
			const error = err as FirebaseError;
			throw new Error(error.message, {
				cause: error.cause
			});
		}
	}

	const {
		elements: { image, fallback }
	} = createAvatar({
		src: $user?.photoURL!,
		delayMs: 500
	});
</script>

<div class="flex flex-col md:flex-row items-start gap-4 p-4">
	<section class="card card-filled flex-1 items-center justify-between w-full min-h-[40dvh]">
		{#if $user}
			<div class="flex flex-col gap-y-4 items-center">
				<figure
					style="height: 96px"
					class="rounded-full flex w-24 items-center justify-center bg-surface-1"
				>
					<img class="rounded-[inherit]" use:melt={$image} width="96" height="96" alt="profile" />
					<span use:melt={$fallback} class="font-medium">
						{$user.displayName
							?.split(' ')
							.slice(0, 2)
							.map((nome) => nome[0])
							.join('')}
					</span>
				</figure>
				<h1 class="text-title-large">{$user?.displayName}</h1>
			</div>

			<button on:click={() => signOut(auth)} class="btn interactive-bg-error">Logout</button>
		{:else}
			<div class="flex flex-col gap-y-4">
				<h1 class="text-headline-large">Faça o login aqui</h1>
				<p class="text-body-large">
					Hum... não fez o login ainda? Então não esta desfrutando de tudo o que o carrinho de
					compras pode lhe oferecer. <br />
					Faça agora, é rápido e simples. 😉
				</p>
			</div>
			<button on:click={login} class="btn interactive-bg-primary w-2/3 gap-x-3">
				<Icon width="24px" icon="devicon:google" class="p-1 rounded-full bg-white" />
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
			<hr class="border border-outline"/>
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
