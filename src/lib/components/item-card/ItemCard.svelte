<script lang="ts">
	import { db } from '$lib/db';
	import { porNoCarrinho } from '$lib/servicos/carrinho-crud';
	import type { Foto } from '$lib/types';
	import { ItemTipo } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';
	import { slide } from 'svelte/transition';
	import { photo } from '../camera/stores';
	import TextField from '../textfield/text-field.svelte';
	import { Unsplash, value } from '../unsplash';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '../vaul';
	import { addCarrinho, carrinhoContas } from './index';
	import { URL } from 'svelte/reactivity';

	let hidden = $state(true);

	interface Props {
		preco?: string;
		nome?: string;
		foto?: Foto;
		tipo?: ItemTipo;
		id?: string;
	}

	let { preco, nome, foto, tipo, id }: Props = $props();

	const carrinho = carrinhoContas();

	let open = $state(false);
	function addAndDismiss() {
		addCarrinho({ nome, preco, tipo, quantidade: carrinho.value });
		porNoCarrinho({ nome, preco, tipo, quantidade: carrinho.value });
		open = false;
		toast.success(`Adicionado ao seu carrinho`);
	}

	function removeAndDismis() {
		db.mercado.delete(id!);
		open = false;
	}

	type StringToIMG = [string: 'src', string: 'alt', string: 'color', string: 'blurhash'];
	async function editAndDismis() {
		const string = ($value.split('|') as StringToIMG | null) ?? $photo?.src!;
		foto = {
			src: typeof string === 'string' ? string : string[0],
			alt: string[1]
		};
		const result = await db.mercado.put({ nome, preco, img: foto, tipo, id }, id);
		if (result) {
			hidden = true;
			toast.success(`Editado com sucesso`);
		}
	}

	let valorAPagar = $state(0);
	$effect(() => {
		if (tipo === ItemTipo.UNIDADE) valorAPagar = parseFloat(preco) * carrinho.value;
		else valorAPagar = parseFloat((parseFloat(preco) * carrinho.value).toFixed(2));
	});

	function getFoto() {
		if (foto) {
			if (typeof foto.src === 'string') {
				return foto.src;
			}
			
			if (foto.src) {
				return URL.createObjectURL(foto.src);
			}
		}

		return {
			alt: 'Imagem indisponível',
			src: 'https://dummyimage.com/200x200/fff/111.gif&text=Imagem+indisponível'
		};
	}
</script>

<section class="card p-0 card-filled w-full overflow-hidden">
	<figure>
		<img
			oncontextmenu={(e) => e.preventDefault()}
			style="height: 208px;background-color: {(foto as IMG)?.color};"
			class="rounded-lg object-cover aspect-square"
			loading="lazy"
			src={getFoto()}
			alt={(foto as Foto)?.alt}
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
						style="height: 238px; background-color: {(foto as IMG).color};"
						class="rounded-lg object-cover"
						loading="lazy"
						src="getFoto()}"
						alt={(foto as Foto).alt || 'Imagem indisponível'}
						width="238px"
						height="238px"
					/>
				</figure>

				<div class="flex px-4 items-center justify-center gap-x-2">
					<button
						onclick={() => carrinho.decrement(tipo)}
						ontouchstart={() => carrinho.startDecrement(tipo)}
						ontouchend={carrinho.stopIncrement}
						disabled={carrinho.value <= 0}
						class="flex items-center text-on-surface-variant justify-center h-10 w-10 ring-1 hover:text-error hover:ring-2 transition ring-error rounded-full"
					>
						<Icon icon="mdi:minus" width="24px" />

						<span class="sr-only">Decrease</span>
					</button>

					<div class="flex-1 text-center">
						<div class="text-headline-large">
							{carrinho.value.toFixed(1)}
						</div>
						<div class="text-label-large uppercase">
							{#if tipo === ItemTipo.UNIDADE}
								{carrinho.value > 1 ? 'unidades' : 'unidade'}
							{:else}
								{carrinho.value > 1 ? 'quilos' : 'quilo'}
							{/if}
						</div>
					</div>
					<button
						onclick={() => carrinho.increment(tipo)}
						ontouchstart={() => {
							carrinho.startIncrement(tipo);
						}}
						ontouchend={carrinho.stopIncrement}
						class="flex items-center justify-center h-10 w-10 ring-1 hover:ring-2 text-on-surface-variant hover:text-primary ring-primary rounded-full"
					>
						<Icon icon="mdi:plus" width="24px" />
						<span class="sr-only">Increase</span>
					</button>
				</div>
				<button onclick={addAndDismiss} class="btn interactive-bg-primary py-2 rounded-xl w-full">
					Adicionar no carrinho
				</button>

				{#if !hidden}
					<div class="h-full flex flex-col gap-3" transition:slide={{ axis: 'y' }}>
						<form class="flex flex-col gap-2">
							<TextField bind:value={nome} title="Nome" />
							<TextField bind:value={preco} title="Preço" />
							<Unsplash />
						</form>

						<button
							onclick={editAndDismis}
							class="btn interactive-bg-secondary-container py-2 rounded-xl w-full"
						>
							Salvar
						</button>
					</div>
				{/if}
				<button
					onclick={() => (hidden = false)}
					class="btn interactive-bg-secondary py-2 rounded-xl w-full"
				>
					Editar produto
				</button>
				<button
					onclick={removeAndDismis}
					class="btn interactive-bg-error-container py-2 rounded-xl w-full"
				>
					Remover do mercado
				</button>
			</DrawerContent>
		</Drawer>
	</div>
</section>
