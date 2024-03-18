<script lang="ts">
	import EditDrawer from '$lib/components/EditDrawer.svelte';
	import Icon from '@iconify/svelte';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/servicos/carrinho-crud';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';
	import {melt, createSeparator} from '@melt-ui/svelte';
	import type { CollectionReference } from 'firebase/firestore';
	let preco: string;
	let nome: string;
	let img: string;
	let tipo: ItemTipo;
	let id: number | string;
	let ref: CollectionReference;
	let customQuantidade: number;

	const {
		elements: { root: horizontal }
	} = createSeparator({
		decorative: false,
		orientation: 'horizontal'
	})

	export { preco, nome, img, id, ref, tipo };
</script>

<li class="flex flex-col py-3 pl-4 pr-6">
	<div class="flex flex-row items-center gap-x-4">
		<img
			class="h-16 w-16 rounded-lg object-cover"
			src={img || 'https://dummyimage.com/80x80/fff/111'}
			alt=""
			height="64"
			width="64"
		/>
		<div class="grid w-full grid-cols-2 grid-rows-2 items-center">
			<h2 class="text-body-large col-span-2 capitalize">
				{nome}
				{tipo === ItemTipo.KILO ? 'Kg' : 'Uni'}
			</h2>
			<p class="text-body-medium text-on-surface-variant">R${preco}</p>
			<div class="inline-flex place-self-end">
				{#if $user}
					<EditDrawer {ref} {preco} {nome} {img} id={String(id)} />
				{/if}
			</div>
		</div>
	</div>
	<hr use:melt={$horizontal}/>
	<div class="flex flex-row items-center gap-3">
		<ul class="inline-flex h-10">
			<button
				class="cus-btn rounded-l-full"
				on:click={porNoCarrinho({
					nome,
					preco,
					quantidade: 1,
					tipo
				})}
			>

				<Icon icon="mdi:plus-one" width="24px" />
			</button>
			<button
				class="cus-btn border-on-outline-variant border-r border-l"
				on:click={porNoCarrinho({
					nome,
					preco,
					quantidade: 2,
					tipo
				})}
			>
				<Icon icon="mdi:plus" width="24px"/>
				<p class="body-medium">2</p>
			</button>
			<button
				class="cus-btn rounded-r-full"
				on:click={porNoCarrinho({
					nome,
					preco,
					quantidade: 6,
					tipo
				})}
			>
				<Icon icon="mdi:plus" width="24px"/>
				<p class="body-medium">6</p>
			</button>
		</ul>

		<div class="relative flex w-full items-center">
			<div class="absolute fill-on-surface-variant pl-2">
				<Icon icon="mdi:plus" width="24px"/>
			</div>
			<input
				class="border-nonex w-full rounded-md bg-background py-2 pl-12 pr-4 ring-1 ring-on-surface-variant transition focus:ring-2 focus:ring-on-surface-variant"
				type="number"
				bind:value={customQuantidade}
				on:keyup={porNoCarrinhoInput({
					nome,
					preco,
					quantidade: customQuantidade,
					tipo
				})}
			/>
		</div>
	</div>
</li>

<style lang="postcss">
	.cus-btn {
		@apply flex place-items-center bg-primary fill-on-primary px-3  text-on-primary transition hover:bg-primary/70;
	}
</style>
