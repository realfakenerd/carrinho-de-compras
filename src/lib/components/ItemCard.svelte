<script lang="ts">
	import EditDrawer from '$lib/components/EditDrawer.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/stores/carrinho.store';
	import user from '$lib/stores/user.store';
	let preco: string;
	let nome: string;
	let img: string;
	let id: number | string;
	let customQuantidade: number;

	export { preco, nome, img, id }
</script>

<li class="flex flex-col py-3 pl-4 pr-6">
	<div class="flex flex-row items-center gap-x-4">
		<img
			class="h-16 w-16 rounded-lg object-cover"
			src={img || 'https://dummyimage.com/80x80/fff/111'}
			alt=""
		/>
		<div class="grid w-full grid-cols-2 grid-rows-2 items-center">
			<h2 class="text-body-large col-span-2 capitalize">
				{nome}
			</h2>
			<p class="text-body-medium text-on-surface-variant">R${preco}</p>
			<div class="inline-flex place-self-end">
				{#if $user}
					<EditDrawer {preco} {nome} {img} id={String(id)} />
				{/if}
				
			</div>
		</div>
	</div>
	<hr  />
	<div class="flex flex-row items-center gap-3">
		<ul class="inline-flex h-10">
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
				class="cus-btn border-on-outline-variant border-r border-l"
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
			<div class="absolute pl-2 fill-on-surface-variant">
				<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
			</div>
			<input
				class="w-full rounded-md ring-1 border-nonex ring-on-surface-variant bg-background py-2 pl-12 pr-4 transition focus:ring-2 focus:ring-on-surface-variant"
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
		@apply flex place-items-center bg-primary text-on-primary fill-on-primary  px-3 transition hover:bg-primary/70;
	}
</style>
