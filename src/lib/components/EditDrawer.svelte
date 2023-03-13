<script lang="ts">
	import { db } from '$lib/firebase';
	import { doc, updateDoc } from 'firebase/firestore';
	import { expoIn, expoOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';
	let hidden = true;
	let nome: string;
	let preco: string;
	let img: string;
	let id: string;

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
	
	async function updateItem() {
		await updateDoc(doc(db, 'mercado', String(id)), {
			preco,
			nome,
			img
		});
	}

	export { nome, preco, img, id };
</script>

<button
	on:click={() => hidden = false}
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
		on:click={() => !hidden && handleDrawer()}
	/>

	<div
		use:clickOutside={() => !hidden && handleDrawer()}
		{id}
		class="z-50 overflow-y-auto  bg-surface-1 sm:rounded-t-xl md:mx-6 px-4 py-6 fixed inset-x-0 bottom-20"
		in:slide={{duration: 400, easing: expoIn}}
        out:slide={{duration: 200, easing: expoOut}}
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
				<span class="text-label-medium">Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span>
				<input type="number" bind:value={preco} required />
			</label>
			<label class="space-y-2">
				<span class="text-label-medium">Img do produto</span>
				<input type="text" bind:value={img} required />
			</label>
			<button on:click={updateItem} class="button w-full1">salvar edição</button>
		</form>
	</div>
{/if}

<style>
	
	input {
		@apply w-full bg-surface-variant ring-1 ring-on-surface-variant 
			 
			rounded-full pl-4 border-none  transition;
	}

	input:placeholder {
		@apply text-on-surface-variant;
	}

	input:focus {
		@apply ring-2 ring-on-surface-variant bg-surface-1;
	}
</style>