<script lang="ts">
	import { Icon } from '$lib/components';
	import { auth } from '$lib/firebase';
	import carrinho, { tirarDoCarrinho } from '$lib/stores/carrinho.store';
	import user from '$lib/stores/user.store';
	import type { FirebaseError } from 'firebase/app';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import { Avatar, Badge, Button, Hr } from 'flowbite-svelte';
	$: totalDeItens = (() => {
		if ($carrinho.length === 0) return 0;
		if ($carrinho.length === 1) return $carrinho[0].quantidade;
		return $carrinho.reduce((a, b) => {
			if (typeof a === 'number') return a + b.quantidade;
			return (a.quantidade + b.quantidade) as any;
		}) as unknown as number;
	})();

	$: total = (() => {
		if ($carrinho.length === 0) return 0;

		const lista = $carrinho.map((val) => {
			return parseFloat(val.preco) * val.quantidade;
		});

		if (lista.length === 1) return lista[0];
		return lista.reduce((a, b) => a + b);
	})();

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
</script>

<div class="flex flex-col items-center gap-y-3">
	<section class="w-full sm:rounded-xl bg-surface-variant p-4">
		{#if $user}
			<div class="flex flex-col space-y-3 pb-4">
				{#if $user.photoURL}
					<figure>
						<img class="rounded-full" src={$user.photoURL} width="96" height="96" alt="profile" />
					</figure>
				{:else}
					<svg
						class="rounded-full bg-gray-100 text-gray-400 dark:bg-gray-600"
						fill="currentColor"
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M8 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
							clip-rule="evenodd"
						/>
					</svg>
				{/if}
				<h1 class="text-title-large">{$user?.displayName}</h1>

				<button on:click={() => signOut(auth)} class="button">logout</button>
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

	<section class="w-full sm:rounded-xl bg-surface-variant p-4">
		<p class="text-body-medium">Itens no carrinho {totalDeItens}</p>
		<p class="text-body-medium">Vai pagar quanto? R${total.toFixed(2)}</p>
	</section>

	<ul class="w-full sm:rounded-xl bg-surface-variant hover: py-2">
		{#each $carrinho as c}
			<li class="transition-colors hover:bg-surface-1">
				<section class="py-3 pl-4 pr-6">
					<div class="flex flex-row justify-between items-center">
						<div>
							<h1 class="text-body-large capitalize">
								{c.nome}
								<span class="text-body-small bg-secondary text-on-secondary px-1 rounded-xl">
									{c.quantidade}
								</span>
							</h1>
							<p class="text-body-medium">R${c.preco}</p>
						</div>
						
						<button class="grid h-10 w-10 place-items-center rounded-full bg-primary fill-on-primary hover:bg-primary/50 hover:fill-on-primary/50 transition-colors" on:click={tirarDoCarrinho(c.nome)}>
							<Icon d="M19 13H5v-2h14v2z" />
						</button>
					</div>
				</section>
				<hr class="h-1 my-2 bg-outline-variant" />
			</li>
		{:else}
			<li class="py-2 pl-4 pr-6">
				<h1>Oops!</h1>
				<p class="text-text-body-medium">não há items dentro do carrinho</p>
			</li>
		{/each}
	</ul>
</div>
