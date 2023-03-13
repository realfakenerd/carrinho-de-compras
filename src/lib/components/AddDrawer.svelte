<script lang="ts">
	import { db } from '$lib/firebase';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/stores/carrinho.store';
	import { doc, setDoc } from 'firebase/firestore';
	import { slide } from 'svelte/transition';
	import {expoIn, expoOut} from 'svelte/easing'
	import Fab from './FAB.svelte';
	import Icon from './Icon.svelte';

	let hidden = true;

	let nome = '',
		preco = '',
		img = '';

	const id = String(Date.now());
	async function addItem() {
		if (nome !== '' && preco !== '') {
			setDoc(doc(db, 'mercado', id), {
				nome,
				preco,
				img,
				id
			});
			img = nome = preco = '';
		}
	}
	function handleDrawer() {
		hidden = !hidden;
	}

	function clickOutside(node: HTMLElement, callback: () => void) {
		const handleClick = (event: Event) => {
			if (!event?.target) return;
			if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
				callback();
			}
		};
		document.addEventListener('click', handleClick, true);
		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
	export let d = '';
	let customQuantidade: number;
</script>

<Fab on:click={() => (hidden = false)} {d} />

{#if !hidden}
	<div
		role="presentation"
		class="fixed top-0 left-0 z-50 h-full w-full bg-surface-2 bg-opacity-95 transition"
		on:click={() => !hidden && handleDrawer()}
	/>

	<div
		use:clickOutside={() => !hidden && handleDrawer()}
		{id}
		class="fixed inset-x-0  bottom-20 z-50 overflow-y-auto bg-surface-1 px-4 py-6 sm:rounded-t-xl md:mx-6"
		in:slide={{ duration: 400, easing: expoOut}}
		out:slide={{ duration: 200, easing: expoIn }}
		tabindex="-1"
		aria-controls={id}
		aria-labelledby={id}
	>
		<form class="flex flex-col space-y-6">
			<h2 class="text-title-medium">Adicione um novo item ao mercado</h2>
			<label class="space-y-2">
				<span>Nome do produto{nome ? ':' : ''} {nome}</span>
				<input type="email" bind:value={nome} required />
			</label>
			<label class="space-y-2">
				<span>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span>
				<input bind:value={preco} type="number" required />
			</label>
			<label class="space-y-2">
				<span>Escolha uma imagem também</span>
				<input bind:value={img} type="text" required />
			</label>
			<button on:click={addItem} class="button w-full1">ADD</button>
			<hr class="my-2 h-1 bg-outline-variant" />
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
					<div class="absolute fill-on-surface-variant pl-2">
						<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
					</div>
					<input
						class="border-nonex w-full rounded-md bg-background py-2 pl-12 pr-4 ring-1 ring-on-surface-variant transition focus:ring-2 focus:ring-on-surface-variant"
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
		</form>
	</div>
{/if}

<style>
	input {
		@apply w-full rounded-full border-none bg-surface-variant 
			 
			pl-4 ring-1 ring-on-surface-variant  transition;
	}

	input:placeholder {
		@apply text-on-surface-variant;
	}

	input:focus {
		@apply bg-surface-1 ring-2 ring-on-surface-variant;
	}

	.cus-btn {
		@apply flex place-items-center bg-primary text-on-primary fill-on-primary  px-3 transition ;
	}

	.cus-btn:hover{
		@apply bg-primary/70;
	}
</style>
