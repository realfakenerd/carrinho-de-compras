<script lang="ts">
	import { updateItem } from '$lib/servicos/mercado-crud';
	import type { CollectionReference } from 'firebase/firestore';
	import { expoIn, expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';
	let hidden = true;
	let ref: CollectionReference;
	let nome = '',
		preco = '',
		img = '',
		id = '';

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

	async function localUpdateItem() {
		if (nome !== '' && preco !== '') {
			await updateItem({nome, preco, img, ref})
			hidden = true;
		}
	}

	export { nome, preco, img, id, ref };
</script>

<button
	on:click={() => (hidden = false)}
	class="grid h-10 w-10 place-items-center justify-self-center rounded-full bg-primary fill-on-primary transition-colors hover:bg-primary/50"
>
	<Icon
		d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"
	/>
</button>

{#if !hidden}
	<div
		role="presentation"
		class="fixed top-0 left-0 z-50 h-full w-full bg-surface-2 bg-opacity-95 transition"
		on:click={() => !hidden && (hidden = !hidden)}
	/>

	<div
		use:clickOutside={() => !hidden && (hidden = !hidden)}
		{id}
		class="fixed inset-x-0  bottom-20 z-50 overflow-y-auto bg-surface-1 px-4 py-6 sm:rounded-t-xl md:mx-6"
		in:slide={{ duration: 400, easing: expoOut }}
		out:slide={{ duration: 200, easing: expoIn }}
		tabindex="-1"
		aria-controls={id}
		aria-labelledby={id}
	>
		<form class="flex flex-col space-y-6">
			<h2 class="text-title-medium">Edite o item</h2>
			<label class="space-y-2">
				<span class="text-label-medium">Nome do produto{nome ? ':' : ''} {nome}</span>
				<input type="text" bind:value={nome} required />
			</label>
			<label class="space-y-2">
				<span class="text-label-medium"
					>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span
				>
				<input type="number" bind:value={preco} required />
			</label>
			<label class="space-y-2">
				<span class="text-label-medium">Img do produto</span>
				<input type="text" bind:value={img} />
			</label>
			<button on:click={localUpdateItem} class="button w-full1">Salvar edição</button>
		</form>
	</div>
{/if}

<style lang="postcss">
	input {
		@apply w-full rounded-full border-none bg-surface-variant 
		pl-4 ring-1 ring-on-surface-variant  transition py-2;
	}

	input:placeholder {
		@apply text-on-surface-variant;
	}

	input:focus {
		@apply bg-surface-1 ring-2 ring-on-surface-variant;
	}
</style>
