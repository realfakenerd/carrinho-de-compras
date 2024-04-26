<script>
	import { addProdutoToMercado } from '$lib/db';
	import { ItemTipo } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import Camera from '../camera/Camera.svelte';
	import { image } from '../camera/stores';
	import { RadioGroup, RadioGroupItem } from '../radio-group';
	import { TextField } from '../textfield';
	import { DrawerTitle } from '../vaul';

	let nome = $state('');
	let preco = $state('');
	let tipo = $state(ItemTipo.UNIDADE);
	let hidden = $state(false);
</script>

<DrawerTitle class="text-title-medium">Adicione um novo item ao mercado</DrawerTitle>

<section class="flex flex-col space-y-6">
	<TextField icon="mdi:label" title="Nome do produto" bind:value={nome} style="outlined" />
	<TextField
		icon="mdi:currency-usd"
		type="number"
		title="Preço do produto"
		bind:value={preco}
		style="outlined"
	/>
	<div class="inline-flex gap-4 items-center">
		<Camera />
	</div>
	<RadioGroup defaultValue={String(ItemTipo.UNIDADE)}>
		<RadioGroupItem bind:value={tipo} label="Unidade" option={String(ItemTipo.UNIDADE)} />
		<RadioGroupItem bind:value={tipo} label="Kilo" option={String(ItemTipo.KILO)} />
	</RadioGroup>
	<button
		onclick={() => {
			hidden = !hidden;
			addProdutoToMercado({
				nome,
				preco,
				tipo,
				foto: {
					src: $image,
					alt: 'Foto da camera'
				}
			});
		}}
		class="btn text-label-large btn-filled w-full"
	>
		<Icon icon="mdi:plus" width="24px" />
		<span> Adicionar </span>
	</button>
</section>
