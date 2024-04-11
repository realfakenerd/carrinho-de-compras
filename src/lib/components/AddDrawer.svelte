<script lang="ts">
	import { addItemToMercado } from '$lib/db';
	import { ItemTipo } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { toast } from 'svelte-sonner';
	import Fab from './FAB.svelte';
	import { RadioGroup, RadioGroupItem } from './radio-group';
	import { TextField } from './textfield';
	import { Unsplash, value } from './unsplash';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger, drawerState } from './vaul';

	let nome = '',
		preco = '',
		tipo = ItemTipo.UNIDADE;

	type StringToIMG = [string: 'src', string: 'alt', string: 'color', string: 'blurhash'];

	function addItem() {
		if (nome && preco) {
			const string = $value.startsWith('data:image/png;base64')
				? ($value as string)
				: ($value.split('|') as StringToIMG | null);

			const img = (string as string).startsWith('data:image/png;base64')
				? string
				: {
						src: string?.[0],
						alt: string?.[1],
						color: string?.[2],
						blur_hash: string?.[3]
					};

			console.log('img', img);
			addItemToMercado({
				nome,
				preco,
				img,
				tipo
			});

			toast.success('Adicionado com sucesso!', {
				description: `${nome}: R$ ${preco}`
			});

			drawerState.set(false);
			nome = preco = '';
			tipo = ItemTipo.UNIDADE;
		}
	}
</script>

<Drawer bind:open={$drawerState}>
	<DrawerTrigger on:click={() => drawerState.set(true)}>
		<Fab />
	</DrawerTrigger>

	<DrawerContent>
		<DrawerTitle class="text-title-medium">Adicione um novo item ao mercado</DrawerTitle>
		<section class="flex flex-col space-y-6">
			<TextField title="Nome do produto" bind:value={nome} style="outlined" />
			<TextField title="Preço do produto" bind:value={preco} style="outlined" />
			<Unsplash />
			<RadioGroup defaultValue={String(ItemTipo.UNIDADE)}>
				<RadioGroupItem bind:value={tipo} label="Unidade" option={String(ItemTipo.UNIDADE)} />
				<RadioGroupItem bind:value={tipo} label="Kilo" option={String(ItemTipo.KILO)} />
			</RadioGroup>
			<button on:click={() => addItem()} class="btn text-label-large btn-filled w-full">
				<Icon icon="mdi:plus" width="24px" />
				<span> Adicionar </span>
			</button>
		</section>
	</DrawerContent>
</Drawer>
