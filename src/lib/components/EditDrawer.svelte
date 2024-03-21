<script lang="ts">
	import { updateItem } from '$lib/servicos/mercado-crud';
	import Icon from '@iconify/svelte';
	import { createLabel, melt } from '@melt-ui/svelte';
	import type { CollectionReference } from 'firebase/firestore';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '$lib/components/vaul';

	let ref: CollectionReference;
	let nome = '',
		preco = '',
		img = '';

	async function localUpdateItem() {
		if (nome !== '' && preco !== '') {
			await updateItem({ nome, preco, img, ref });
		}
	}

	const {
		elements: { root }
	} = createLabel();

	export { nome, preco, img, ref };
</script>

<Drawer>
	<DrawerTrigger
		class="flex justify-center items-center h-10 w-10 rounded-full bg-primary text-on-primary transition-colors hover:bg-primary/50"
	>
		<Icon width="24px" icon="mdi:edit" />
	</DrawerTrigger>
	<DrawerContent
		class="fixed inset-x-0 bottom-20 z-50 bg-surface-1 px-4 py-6 sm:rounded-t-xl md:mx-6"
	>
		<form class="flex flex-col space-y-6">
			<DrawerTitle class="text-title-large">Edite o item</DrawerTitle>
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
	</DrawerContent>
</Drawer>

<style lang="postcss">
	input {
		width: 100%;
		border-radius: 999px;
		border: none;
		background-color: theme('colors.surface-variant');
		padding-inline-start: 1rem;
		padding-block: .5rem;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;

		@apply ring-1 ring-on-surface-variant ;
	}

	input:placeholder {
		@apply text-on-surface-variant;
	}

	input:focus {
		@apply bg-surface-variant ring-2 ring-on-surface-variant;
	}
</style>
