<script lang="ts">
	import { updateItem } from '$lib/servicos/mercado-crud';
	import Icon from '@iconify/svelte';
	import { createLabel, melt } from '@melt-ui/svelte';
	import type { CollectionReference } from 'firebase/firestore';
	import { Drawer } from "vaul-svelte";

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
			await updateItem({ nome, preco, img, ref });
			hidden = true;
		}
	}

	const {
		elements: {root}
	} = createLabel()

	export { nome, preco, img, id, ref };
</script>


<Drawer.Root>

<Drawer.Trigger
	class="grid h-10 w-10 place-items-center justify-self-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary/50"
>
	<Icon
		width="24px"
		icon="mdi:edit"
	/>
</Drawer.Trigger>

<Drawer.Portal>
	<Drawer.Overlay clas="fixed top-0 left-0 z-50 h-full w-full bg-surface-2 bg-opacity-95 transition"/>
	<Drawer.Content class="fixed inset-x-0 bottom-20 z-50 overflow-y-auto bg-surface-1 px-4 py-6 sm:rounded-t-xl md:mx-6">
	<form class="flex flex-col space-y-6">
		<h2 class="text-title-medium">Edite o item</h2>
		<label class="space-y-2" use:melt={$root}>
			<span class="text-label-medium">Nome do produto{nome ? ':' : ''} {nome}</span>
			<input type="text" bind:value={nome} required />
		</label>
		<label class="space-y-2" use:melt={$root}>
			<span class="text-label-medium"
				>Preço do produto{preco ? ':' : ''} {preco ? `R$${preco}` : ''}</span
			>
			<input type="number" bind:value={preco} required />
		</label>
		<label class="space-y-2" use:melt={$root}>
			<span class="text-label-medium">Img do produto</span>
			<input type="text" bind:value={img} />
		</label>
		<button on:click={localUpdateItem} class="button w-full1">Salvar edição</button>
	</form>
	</Drawer.Content>
</Drawer.Portal>

</Drawer.Root>
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
