<script lang="ts">
	import { PUBLIC_UID } from '$env/static/public';
	import EditDrawer from '$lib/components/EditDrawer.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { db } from '$lib/firebase';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/stores/carrinho.store';
	import user from '$lib/stores/user.store';
	import { deleteDoc, doc } from 'firebase/firestore';
	let preco: string;
	let nome: string;
	let img: string;
	let id: number;
	let customQuantidade: number;

	export { preco, nome, img, id };
</script>

<li class="flex flex-col py-3 pl-4 pr-6">
	<div class="flex flex-row items-center gap-x-4">
		<img
			class="h-16 w-16 rounded-lg object-cover"
			src={img || 'https://dummyimage.com/80x80/fff/111'}
			alt=""
		/>
		<div class="grid w-full grid-cols-2 grid-rows-2 items-center">
			<h2 class="body-large col-span-2 capitalize">
				{nome}
			</h2>
			<p class="body-large">R${preco}</p>
			<div class="inline-flex place-self-end">
				{#if $user}
					<EditDrawer {preco} {nome} {img} {id} />
				{/if}
				{#if $user?.uid === PUBLIC_UID}
					<button
						class="grid h-10 w-10 place-items-center rounded-full bg-primary"
						on:click={() => deleteDoc(doc(db, 'mercado', String(id)))}
					>
						<Icon
							d={'M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z'}
						/>
					</button>
				{/if}
			</div>
		</div>
	</div>
	<div class="divider" />
	<div class="flex flex-row items-center gap-3">
		<ul class="inline-flex h-10 rounded-full border">
			<button
				class="cus-btn rounded-l-full"
				on:click={porNoCarrinho({
					nome: nome,
					preco: preco,
					quantidade: 1
				})}
			>
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
			</button>
			<button
				class="cus-btn border-r border-l"
				on:click={porNoCarrinho({
					nome: nome,
					preco: preco,
					quantidade: 5
				})}
			>
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
				<p class="body-medium">5</p>
			</button>
			<button
				class="cus-btn rounded-r-full"
				on:click={porNoCarrinho({
					nome: nome,
					preco: preco,
					quantidade: 10
				})}
			>
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
				<p class="body-medium">10</p>
			</button>
		</ul>

		<div class="relative flex w-full items-center">
			<div class="absolute pl-4">
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
			</div>
			<input
				class="w-full rounded-t-md border-b-2 border-primary py-2 pl-12 pr-4"
				type="number"
				bind:value={customQuantidade}
				on:keyup={porNoCarrinhoInput({
					nome: nome,
					preco: preco,
					quantidade: customQuantidade
				})}
			/>
		</div>
	</div>
</li>

<style lang="scss">
	.cus-btn {
		@apply flex place-items-center bg-primary px-3 transition hover:bg-primary/70;
	}
</style>
