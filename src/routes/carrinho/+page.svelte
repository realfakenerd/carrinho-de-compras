<script lang="ts">
	import { Icon } from '$lib/components';
	import { auth } from '$lib/firebase';
	import carrinho, { tirarDoCarrinho } from '$lib/stores/carrinho.store';
	import user from '$lib/stores/user.store';
	import type { FirebaseError } from 'firebase/app';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
	import {
		Avatar,
		Badge,
		Button,
		Card,
		Heading,
		Hr,
		Listgroup,
		ListgroupItem,
		P
	} from 'flowbite-svelte';
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

<div class="hero">
	<div class="hero-content flex-col gap-5">
		{#if $user}
			<Card class="w-full max-w-sm" color="primary">
				<div class="flex flex-col items-center space-y-3 pb-4">
					<Avatar
						size="lg"
						src={'https://lh3.googleusercontent.com/a/AEdFTp5eZPpZfCI_5IlCd6fO1AIRc7dgqINsZHgSF3nA8w=s96-c'}
					/>
					<Heading color="primary" tag="h1" customSize="text-xl">{$user?.displayName}</Heading>
					<Button color="primary" on:click={() => signOut(auth)} class="w-full">logout</Button>

					<Hr color="primary" />
					<div class="self-start ">
						<P color="primary">Itens no carrinho {totalDeItens}</P>
						<P color="primary">vai pagar quanto? R${total.toFixed(2)}</P>
					</div>
				</div>
			</Card>
		{:else}
			<Heading tag="h1" customSize="text-5xl">Faça o login aqui</Heading>
			<P class="py-6">
				Hum... não fez o login ainda? Então não esta desfrutando de tudo o que o carrinho de compras
				pode lhe oferecer. <br />
				Faça agora, é rápido e simples. 😉
			</P>

			<Card>
				<div class="flex flex-col items-center gap-5">
					<Heading tag="h1" customSize="text-xl">Faça seu login com o google</Heading>
					<Button on:click={login} class="w-2/3 justify-evenly">
						<span>Login</span>
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
					</Button>
				</div>
			</Card>
		{/if}

		<Listgroup class="w-full max-w-sm">
			{#each $carrinho as c}
				<ListgroupItem>
					<Heading
						tag="h1"
						class="flex flex-row items-center gap-x-5 font-semibold capitalize"
						customSize="text-lg"
					>
						{c.nome}
						<Badge>
							{c.quantidade}
						</Badge>
					</Heading>
					<P>R${c.preco}</P>
					<Hr height="h-1" />
					<Button color="red" size="xs" on:click={tirarDoCarrinho(c.nome)}>
						<Icon d="M19 13H5v-2h14v2z" />
					</Button>
				</ListgroupItem>
			{:else}
				<ListgroupItem>
					<Heading tag="h1" class="font-semibold" customSize="text-lg">Oops!</Heading>
					<P>não há items dentro do carrinho</P>
				</ListgroupItem>
			{/each}
		</Listgroup>
	</div>
</div>
