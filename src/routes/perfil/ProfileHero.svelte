<script lang="ts">
	import { auth } from '$lib/firebase';
	import user from '$lib/stores/user.store';
	import { signOut } from 'firebase/auth';
	import { Avatar, Card, Heading, Button, Hr, P, Listgroup, ListgroupItem, Badge } from 'flowbite-svelte';
	import carrinho, { tirarDoCarrinho } from '$lib/stores/carrinho.store';
	import {Icon} from '$lib/components/index';
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
</script>

<div class="hero">
	<div class="hero-content">
		<Card>
			<div class="flex flex-col items-center space-y-3 pb-4">
				<Avatar size="lg" src={"https://lh3.googleusercontent.com/a/AEdFTp5eZPpZfCI_5IlCd6fO1AIRc7dgqINsZHgSF3nA8w=s96-c"} />
				<Heading tag="h1" customSize="text-xl">{$user?.displayName}</Heading>
				<Button on:click={() => signOut(auth)} class="w-full">logout</Button>

				<Hr />
			</div>
		</Card>
	</div>
</div>


<section class="flex flex-col gap-5">
	<Card class="w-full">
		<P>Itens no carrinho {totalDeItens}</P>
		<P>vai pagar quanto? R${total.toFixed(2)}</P>
	</Card>

	<Listgroup>
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
</section>
