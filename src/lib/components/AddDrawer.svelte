<script lang="ts">
	import { db } from '$lib/firebase';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/stores/carrinho.store';
	import { doc, setDoc } from 'firebase/firestore';
	import { Button, ButtonGroup, Drawer, Heading, Hr, Input, Label } from 'flowbite-svelte';
	import { sineOut } from 'svelte/easing';
	import Fab from './FAB.svelte';
	import Icon from './Icon.svelte';

	let hidden = true;

	let nome = '',
		preco = '',
		img = '';

	async function addItem() {
		const id = Date.now();
		if (nome !== '' && preco !== '') {
			setDoc(doc(db, 'mercado', String(id)), {
				nome,
				preco,
				img,
				id
			});
			img = nome = preco = '';
		}
	}

	export let d = '';
	let customQuantidade: number;
</script>

<Fab on:click={() => (hidden = false)} {d} />
<Drawer
	placement="bottom"
	width="w-full"
	transitionType="slide"
	transitionParams={{ duration: 300, easing: sineOut }}
	bind:hidden
	autoclose
>
	<form class="flex flex-col space-y-6">
		<Heading tag="h4">Adicione um novo item ao mercado</Heading>
		<Label class="space-y-2">
			<span>Nome do produto{nome ? ':' : ''} {nome}</span>
			<Input type="email" bind:value={nome} required />
		</Label>
		<Label class="space-y-2">
			<span>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span>
			<Input bind:value={preco} type="number" required />
		</Label>
		<Label class="space-y-2">
			<span>Escolha uma imagem também</span>
			<Input bind:value={img} type="text" required />
		</Label>
		<Button on:click={addItem} class="w-full1">ADD</Button>
		<Hr />
		<div class="flex flex-row items-center gap-3">
			<ButtonGroup size="xs">
				<Button
					size="xs"
					color="primary"
					on:click={porNoCarrinho({
						nome: nome,
						preco: preco,
						quantidade: 1
					})}
				>
					<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
				</Button>
				<Button
					size="xs"
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
					size="xs"
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
	</form>
</Drawer>
