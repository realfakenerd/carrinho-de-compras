<script>
	import { ItemTipo } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import { RadioGroup, RadioGroupItem } from '../radio-group';
	import { TextField } from '../textfield';
	import { Unsplash, value } from '../unsplash';
	import { addItem } from './add-item.svelte';
	import { DrawerTitle } from '../vaul';
	import Camera, {image} from '../camera/Camera.svelte';

	let nome = $state('');
	let preco = $state('');
	let tipo = $state(ItemTipo.UNIDADE);
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
		<Unsplash />
		<Camera />
	</div>
	<RadioGroup defaultValue={String(ItemTipo.UNIDADE)}>
		<RadioGroupItem bind:value={tipo} label="Unidade" option={String(ItemTipo.UNIDADE)} />
		<RadioGroupItem bind:value={tipo} label="Kilo" option={String(ItemTipo.KILO)} />
	</RadioGroup>
	<button
		onclick={() =>
			addItem({
				nome,
				preco,
				tipo,
				foto: image ?? $value
			})}
		class="btn text-label-large btn-filled w-full"
	>
		<Icon icon="mdi:plus" width="24px" />
		<span> Adicionar </span>
	</button>
</section>
