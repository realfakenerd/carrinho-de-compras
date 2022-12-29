<script lang="ts">
	import db from '$lib/db';
	import { doc, updateDoc } from 'firebase/firestore';
	import { Button, Drawer, Label, Input } from 'flowbite-svelte';
	import { cubicInOut, sineIn, sineInOut } from 'svelte/easing';
	import Icon from './Icon.svelte';
	let hidden = true;
	let nome: string;
	let preco: string;
	let img: string;
	let id: number;

	async function updateItem() {
		await updateDoc(doc(db, 'mercado', String(id)), {
			preco,
			nome,
			img
		});
	}

	export { nome, preco, img, id };
</script>

<Button on:click={() => (hidden = false)} size="xs" class="justify-self-center">
	<Icon
		d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
	/>
</Button>
<Drawer placement="bottom" width="w-full" size="xs" bind:hidden transitionType="slide" transitionParams={{duration: 300, easing: cubicInOut}}>
	<form class="flex flex-col space-y-6">
		<Label class="space-y-2">
			<span>Nome do produto{nome ? ':' : ''} {nome}</span>
			<Input type="text" bind:value={nome} required />
		</Label>
		<Label class="space-y-2">
			<span>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span>
			<Input type="number" bind:value={preco} required />
		</Label>
		<Label class="space-y-2">
			<span>Img do produto</span>
			<Input type="text" bind:value={img} required />
		</Label>
		<Button on:click={updateItem} class="w-full1">Edite o item</Button>
	</form>
</Drawer>
