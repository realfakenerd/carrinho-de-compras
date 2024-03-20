<script lang="ts">
	import { auth } from '$lib/firebase';
	import { tirarDoCarrinho } from '$lib/servicos/carrinho-crud';
	import carrinho from '$lib/stores/carrinho.store';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';
	import Icon from '@iconify/svelte';
	import { createAvatar } from '@melt-ui/svelte';
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
			else total += +((parseFloat(item.preco) * item.quantidade).toFixed(2));
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

<div class="flex-col items-center gap-y-2 flex">
	<section class="w-full bg-surface-variant p-4 sm:rounded-xl">
		{#if $user}
			<div class="flex flex-col space-y-3 pb-4">
				<figure
					style="height: 96px"
					class="rounded-full flex w-24 items-center justify-center bg-surface-1"
				>
					<img class="rounded-[inherit]" use:melt={$image} width="96" height="96" alt="profile" />
					<span use:melt={$fallback} class="font-medium">
						{$user.displayName?.split(' ')[0][0]}
					</span>
				</figure>
				<h1 class="text-title-large">{$user?.displayName}</h1>

				<button on:click={() => signOut(auth)} class="button">Logout</button>
			</div>
		{:else}
			<h1 class="text-title-large">Faça o login aqui</h1>
			<p class="text-body-medium pb-4">
				Hum... não fez o login ainda? Então não esta desfrutando de tudo o que o carrinho de compras
				pode lhe oferecer. <br />
				Faça agora, é rápido e simples. 😉
			</p>
			<div class="flex w-full flex-row justify-center">
				<button on:click={login} class="button w-2/3 justify-evenly space-x-3">
					<svg
						class="rounded-full bg-white p-1"
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 0 24 24"
						width="24"
					>
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/>
						<path d="M1 1h22v22H1z" fill="none" />
					</svg>
					<p class="label-large text-on-primary">Login</p>
				</button>
			</div>
		{/if}
	</section>

	<section class="w-full bg-surface-variant p-4 sm:rounded-xl">
		<p class="text-body-medium">Itens no carrinho {totalDeItens}</p>
		<p class="text-body-medium">Vai pagar quanto? R${total.toFixed(2)}</p>
	</section>

	<ul class="hover: w-full bg-surface-variant py-2 sm:rounded-xl">
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
