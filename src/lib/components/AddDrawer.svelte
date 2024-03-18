<script lang="ts">
	import { createItem } from '$lib/servicos/mercado-crud';
	import { porNoCarrinho, porNoCarrinhoInput } from '$lib/servicos/carrinho-crud';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import { expoIn, expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import Fab from './FAB.svelte';
	import Icon from './Icon.svelte';

	let hidden = true;
	let customQuantidade: number;
	let nome = '',
		preco = '',
		img = '',
		tipo = ItemTipo.UNIDADE;

	const id = String(Date.now());
	function addItem() {
		if (nome !== '' && preco !== '') {
			createItem({ nome, preco, img, tipo });
			img = nome = preco = '';
			tipo = ItemTipo.UNIDADE;
			hidden = true;
		}
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
</script>

<Fab on:click={() => (hidden = false)} d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />

{#if !hidden}
	<div
		role="presentation"
		class="fixed top-0 left-0 z-50 h-full w-full bg-surface-2 bg-opacity-95 transition"
		on:click={() => !hidden && (hidden = !hidden)}
	/>

	<div
		use:clickOutside={() => !hidden && (hidden = !hidden)}
		{id}
		class="fixed inset-x-0 bottom-20 z-50 overflow-y-auto bg-surface-1 px-4 py-6 sm:rounded-t-xl md:mx-6"
		in:slide={{ duration: 400, easing: expoOut }}
		out:slide={{ duration: 200, easing: expoIn }}
		tabindex="-1"
		aria-controls={id}
		aria-labelledby={id}
	>
		<form class="flex flex-col space-y-6">
			<h2 class="text-title-medium">Adicione um novo item ao mercado</h2>
			<label class="space-y-2">
				<span class="text-label-medium">Nome do produto{nome ? ':' : ''} {nome}</span>
				<input type="text" bind:value={nome} required />
			</label>
			<label class="space-y-2">
				<span class="text-label-medium"
					>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span
				>
				<input bind:value={preco} type="number" required />
			</label>
			<label class="space-y-2">
				<span class="text-label-medium">Escolha uma imagem também</span>
				<input bind:value={img} type="text" />
			</label>
			<section class="flex flex-col gap-y-3">
				<div class="inline-flex items-center gap-x-2">
					<input
						bind:group={tipo}
						value={ItemTipo.UNIDADE}
						type="radio"
						name="tipo"
						id="UNIDADE"
						checked
					/>
					<label class="text-label-large w-full" for="UNIDADE">Unidade</label>
				</div>
				<div class="inline-flex items-center gap-x-2">
					<input bind:group={tipo} value={ItemTipo.KILO} type="radio" name="tipo" id="KILO" />
					<label class="text-label-large w-full" for="KILO">Kilo</label>
				</div>
			</section>
			<button on:click={addItem} class="button w-full1">ADD</button>
			<hr />
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
						<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
					</button>
					<button
						class="cus-btn border-on-outline-variant border-r border-l"
						on:click={porNoCarrinho({
							nome,
							preco,
							quantidade: 5,
							tipo
						})}
					>
						<Icon d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
						<p class="body-medium">5</p>
					</button>
					<button
						class="cus-btn rounded-r-full"
						on:click={porNoCarrinho({
							nome,
							preco,
							quantidade: 10,
							tipo
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
		</form>
	</div>
{/if}

<style lang="postcss">
	[type='radio'] {
		@apply form-radio w-5 h-5 text-on-surface-variant transition border-2 border-on-surface-variant ease-in-out bg-transparent outline-none;
	}

	[type='radio']:checked {
		@apply text-primary-container;
	}

	[type='radio']:focus {
		@apply ring-primary-container;
	}

	input:not(input[type='radio']) {
		@apply w-full rounded-full border-none bg-surface-variant 
		pl-4 ring-1 ring-on-surface-variant  transition py-2;
	}
	input:not(input[type='radio']):placeholder {
		@apply text-on-surface-variant;
	}
	input:not(input[type='radio']):focus {
		@apply bg-surface-1 ring-2 ring-on-surface-variant;
	}
	.cus-btn {
		@apply flex place-items-center bg-primary fill-on-primary px-3  text-on-primary transition;
	}
	.cus-btn:hover {
		@apply bg-primary/70;
	}
</style>
