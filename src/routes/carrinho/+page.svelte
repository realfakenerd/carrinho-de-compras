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

	carrinho.subscribe((val) => {
		totalDeItens = val.reduce((a, { quantidade, tipo }) => {
			if (tipo === ItemTipo.KILO) return a;
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

<div class="flex-col items-center gap-y-2 flex p-4">
	<section class="card items-center justify-between w-full bg-surface-variant min-h-[50dvh]">
		{#if $user}
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

			<button on:click={() => signOut(auth)} class="button">Logout</button>
		{:else}
			<div class="flex flex-col gap-y-4">
				<h1 class="text-headline-large">Faça o login aqui</h1>
				<p class="text-body-large">
					Hum... não fez o login ainda? Então não esta desfrutando de tudo o que o carrinho de
					compras pode lhe oferecer. <br />
					Faça agora, é rápido e simples. 😉
				</p>
			</div>
			<button on:click={login} class="btn bg-primary w-2/3 gap-x-3">
				<Icon width="24px" icon="devicon:google" class="p-1 rounded-full bg-white" />
				<p class="label-large text-on-primary">Login</p>
			</button>
		{/if}
	</section>

	<section class="card w-full bg-surface-variant p-4 sm:rounded-xl">
		<p class="text-body-medium">Itens no carrinho {totalDeItens}</p>
		<p class="text-body-medium">Vai pagar quanto? R${total.toFixed(2)}</p>
	</section>

	<ul class="card w-full bg-surface-variant py-2 sm:rounded-xl">
		{#each $carrinho as c}
			<li class="transition-colors hover:bg-surface-1">
				<section class="py-3 pl-4 pr-6">
					<div class="flex flex-row items-center justify-between">
						<div>
							<div class="flex items-center gap-x-2">
								<h1 class="text-body-large capitalize">{c.nome}</h1>
								<span class="text-body-small rounded-xl bg-secondary px-1 text-on-secondary">
									{c.quantidade}
									{c.tipo === ItemTipo.KILO ? 'Kg' : 'Uni'}
								</span>
							</div>
							<p class="text-body-medium">R${c.preco}</p>
						</div>

						<button
							class="grid h-10 w-10 place-items-center rounded-full bg-primary fill-on-primary transition-colors hover:bg-primary/50 hover:fill-on-primary/50"
							on:click={tirarDoCarrinho(c.nome)}
						>
							<Icon icon="mdi:minus" />
						</button>
					</div>
				</section>
				<hr />
			</li>
		{:else}
			<li class="py-2 pl-4 pr-6">
				<h1>Oops!</h1>
				<p class="text-text-body-medium">não há items dentro do carrinho</p>
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	li:last-child hr {
		@apply hidden;
	}
</style>
