<script>
	import { ItemTipo } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import { RadioGroup, RadioGroupItem } from '../radio-group';
	import { TextField } from '../textfield';
	import { Unsplash } from '../unsplash';
	import { DrawerTitle } from '../vaul';

	let nome = $state('');
	let preco = $state('');
	let tipo = $state(ItemTipo.UNIDADE);
</script>

<DrawerTitle class="text-title-medium">Adicione um novo mercado</DrawerTitle>

<section class="flex flex-col space-y-6">
	<TextField icon="mdi:label" title="Nome do mercado" bind:value={nome} style="outlined" />
	<TextField
		icon="mdi:currency-usd"
		type="number"
		title="Preço do produto"
		bind:value={preco}
		style="outlined"
	/>
	<Unsplash />
	<button
		class="btn text-label-large btn-filled w-full"
	>
		<Icon icon="mdi:plus" width="24px" />
		<span> Adicionar </span>
	</button>
</section>
