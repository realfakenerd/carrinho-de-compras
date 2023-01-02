<script lang="ts">
	import { PUBLIC_UID } from '$env/static/public';
	import EditDrawer from '$lib/components/EditDrawer.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { db } from '$lib/firebase';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/stores/carrinho.store';
	import user from '$lib/stores/user.store';
	import { deleteDoc, doc } from 'firebase/firestore';
	import { Button, ButtonGroup, Heading, Hr, Img, Input, ListgroupItem, P } from 'flowbite-svelte';
	let preco: string;
	let nome: string;
	let img: string;
	let id: number;
	let customQuantidade: number;

	export { preco, nome, img, id };
</script>

<ListgroupItem class="flex flex-col gap-y-5">
	<div class="flex flex-row items-center gap-x-5">
		<Img
			size="w-20"
			imgClass="h-20 object-cover"
			class="rounded-lg"
			src={img || 'https://dummyimage.com/80x80/fff/111'}
		/>
		<div class="grid w-full grid-cols-2 grid-rows-2 items-center">
			<Heading tag="h2" customSize="text-xl" class="col-span-2 font-semibold capitalize">
				{nome}
			</Heading>
			<P class="font-normal leading-tight text-gray-700 dark:text-gray-400">R${preco}</P>
			<div class="flex flex-row">
				{#if $user}
					<EditDrawer {preco} {nome} {img} {id} />
				{/if}
				{#if $user?.uid === PUBLIC_UID}
					<Button color="red" on:click={() => deleteDoc(doc(db, 'mercado', String(id)))}>X</Button>
				{/if}
			</div>
		</div>
	</div>
	<Hr />
	<div class="flex flex-row items-center gap-3">
		<ButtonGroup size="xs">
			<Button
				size="xs"
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
</ListgroupItem>
