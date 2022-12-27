<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/stores/carrinho.store';
	import { Avatar, Button, ButtonGroup, Heading, Input, ListgroupItem, P } from 'flowbite-svelte';

	let preco: string;
	let nome: string;
	let img: string;
	let customQuantidade: number;

	export { preco, nome, img };

	// card-side h-40 w-24 w-60
</script>

<ListgroupItem class="flex flex-col gap-y-5">
	<div class="flex flex-row items-center gap-x-5">
		<Avatar size="lg" rounded src={img} />
		<div>
			<Heading tag="h2" customSize="text-xl" class="font-semibold capitalize">
				{nome}
			</Heading>
			<P class="font-normal leading-tight text-gray-700 dark:text-gray-400">{preco}</P>
		</div>
	</div>
	<div class="flex flex-row items-center gap-3">
		<ButtonGroup>
			<Button
				on:click={porNoCarrinho({
					nome: nome,
					preco: preco,
					quantidade: 1
				})}
			>
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
			</Button>
			<Button
				on:click={porNoCarrinho({
					nome: nome,
					preco: preco,
					quantidade: 5
				})}
			>
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
				<span>5</span>
			</Button>
			<Button
				on:click={porNoCarrinho({
					nome: nome,
					preco: preco,
					quantidade: 10
				})}
			>
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
				<span>10</span>
			</Button>
		</ButtonGroup>

		<Input class="w-full" let:props>
			<input
				type="number"
				{...props}
				bind:value={customQuantidade}
				on:keyup={porNoCarrinhoInput({
					nome: nome,
					preco: preco,
					quantidade: customQuantidade
				})}
			/>

			<div slot="right">
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
			</div>
		</Input>
	</div>
</ListgroupItem>
