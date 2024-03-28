<script lang="ts">
	import { porNoCarrinho } from '$lib/servicos/carrinho-crud';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import type { IMG } from '$lib/types';
	import Icon from '@iconify/svelte';
	import { carrinhoCard } from './index';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../vaul';
	import { db } from '$lib/db';

	let preco: string;
	let nome: string;
	let img: IMG;
	let tipo: ItemTipo;
	let id = '';

	const carrinho = carrinhoCard();

	let open = false;
	function addAndDismiss() {
		porNoCarrinho({ nome, preco, tipo, quantidade: $carrinho });
		open = false;
	}

	function removeAndDismis() {
		db.mercado.delete(id);
		open = false;
	}

	let valorAPagar = 0;
	$: {
		if (tipo === ItemTipo.UNIDADE) valorAPagar = parseFloat(preco) * $carrinho;
		else valorAPagar = parseFloat((parseFloat(preco) * $carrinho).toFixed(2));
	}

	export { preco, nome, img, tipo, id };
</script>

<section class="card p-0 card-filled w-full overflow-hidden">
	<figure>
		<img
			on:contextmenu|preventDefault
			style="height: 208px;"
			class="rounded-lg object-cover aspect-square"
			loading="lazy"
			src={img.src || 'https://dummyimage.com/200x200/fff/111.gif&text=Imagem+indisponível'}
			alt={img.alt || 'Imagem indisponível'}
			width="208px"
			height="208px"
		/>
	</figure>

	<div class="flex flex-row justify-between w-full">
		<div class="flex flex-col p-4 w-full overflow-hidden">
			<h2
				class="text-label-medium col-span-2 capitalize overflow-hidden whitespace-nowrap text-ellipsis"
			>
				{nome}
			</h2>
			<p
				class="text-title-medium text-on-surface-variant overflow-hidden whitespace-nowrap text-ellipsis"
			>
				R$ {preco}
				{tipo === ItemTipo.KILO ? 'Kg' : 'Uni'}
			</p>
		</div>
		<Drawer bind:open>
			<DrawerTrigger
				on:click={() => (open = true)}
				class="px-6 overflow-hidden text-primary hover:text-primary/70 transition-colors"
			>
				<Icon icon="mdi:cart-plus" />
			</DrawerTrigger>

			<DrawerContent>
				<hgroup>
					<DrawerTitle class="text-headline-large">{nome}</DrawerTitle>
					<h2>R$ {preco} {tipo === ItemTipo.KILO ? 'Kg' : 'Uni'} / R$ {valorAPagar}</h2>
				</hgroup>

				<figure>
					<img
						style="height: 238px;"
						class="rounded-lg object-cover"
						loading="lazy"
						src={img.src || 'https://dummyimage.com/200x200/fff/111.gif&text=Imagem+indisponível'}
						alt={img.alt || 'Imagem indisponível'}
						width="238px"
						height="238px"
					/>
				</figure>

				<div class="flex px-4 items-center justify-center gap-x-2">
					<button
						on:click={() => carrinho.decrement(tipo)}
						on:touchstart={() => carrinho.startDecrement(tipo)}
						on:touchend={carrinho.stopIncrement}
						disabled={$carrinho <= 0}
						class="flex items-center text-on-surface-variant justify-center h-10 w-10 ring-1 hover:text-error hover:ring-2 transition ring-error rounded-full"
					>
						<Icon icon="mdi:minus" width="24px" />

						<span class="sr-only">Decrease</span>
					</button>

					<div class="flex-1 text-center">
						<div class="text-headline-large">
							{$carrinho.toFixed(1)}
						</div>
						<div class="text-label-large uppercase">
							{#if tipo === ItemTipo.UNIDADE}
								{$carrinho > 1 ? 'unidades' : 'unidade'}
							{:else}
								{$carrinho > 1 ? 'quilos' : 'quilo'}
							{/if}
						</div>
					</div>
					<button
						on:click={() => carrinho.increment(tipo)}
						on:touchstart={() => {
							carrinho.startIncrement(tipo);
						}}
						on:touchend={carrinho.stopIncrement}
						class="flex items-center justify-center h-10 w-10 ring-1 hover:ring-2 text-on-surface-variant hover:text-primary ring-primary rounded-full"
					>
						<Icon icon="mdi:plus" width="24px" />
						<span class="sr-only">Increase</span>
					</button>
				</div>
				<button on:click={() => addAndDismiss()} class="btn btn-filled py-2 rounded-xl w-full">
					Adicionar no carrinho
				</button>
				<button
					on:click={() => removeAndDismis()}
					class="btn bg-error-container py-2 rounded-xl w-full"
				>
					Editar produto
				</button>
				<button
					on:click={() => removeAndDismis()}
					class="btn bg-error-container py-2 rounded-xl w-full"
				>
					Remover do mercado
				</button>
			</DrawerContent>
		</Drawer>
	</div>
</section>
