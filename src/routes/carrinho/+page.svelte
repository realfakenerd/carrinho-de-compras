<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import carrinho from '$lib/stores/carrinho.store';
	import { Badge, Button, Card, Heading, Listgroup, ListgroupItem, P } from 'flowbite-svelte';
	function tirarDoCarrinho(nome: string) {
		carrinho.update((val) => {
			for (let i = 0; i < val.length; i++) {
				if (val[i].nome == nome) {
					val.splice(i, 1);
				}
			}
			return val;
		});
		return null;
	}

	$: totalDeItens = (() => {
		if ($carrinho.length === 0) return 0;
		if ($carrinho.length === 1) return $carrinho[0].quantidade;
		return $carrinho.reduce((a, b) => (a.quantidade + b.quantidade) as any) as unknown as number;
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
