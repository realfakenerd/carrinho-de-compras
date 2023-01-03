<script lang="ts">
	import { db } from '$lib/firebase';
	import { doc, setDoc } from 'firebase/firestore';
	import { Button, Drawer, Heading, Input, Label } from 'flowbite-svelte';
	import { sineOut } from 'svelte/easing';

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

	export let btnText = '';

</script>

<Button class="w-full" on:click={() => (hidden = false)}>{btnText}</Button>
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
	</form>
</Drawer>
