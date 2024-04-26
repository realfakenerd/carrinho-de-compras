<script lang="ts">
	import Icon from '@iconify/svelte';
	import { TextField } from '../textfield';
	import { DrawerTitle } from '../vaul';
	import { addMercadoToDatabase } from '$lib/db';
	import type { Endereco } from '$lib/types';

	let nome = $state('');
	let endereco = $state<Endereco>({
		rua: '',
		numero: '',
		bairro: '',
		cidade: '',
		estado: '',
		pais: '',
		cep: ''
	});
</script>

<DrawerTitle class="text-title-medium">Adicione um novo mercado</DrawerTitle>

<section class="flex flex-col gap-6">
	<TextField icon="mdi:label" title="Nome do mercado" bind:value={nome} style="outlined" />

	<section class="flex flex-col gap-3">
		<div class="inline-flex items-center">
			<Icon width="24px" icon="mdi:place" />
			<h1 class="text-title-large">Endereço do mercado</h1>
		</div>
		<TextField labelColor="--color-surface" icon="mdi:road" type="text" title="Rua" bind:value={endereco.rua} style="outlined" />
		<TextField
			icon="mdi:neighbourhood"
			type="number"
			title="Bairro"
			bind:value={endereco.bairro}
			style="outlined"
		/>
		<TextField
			icon="mdi:home-city"
			type="number"
			title="Cidade"
			bind:value={endereco.cidade}
			style="outlined"
		/>
		<TextField
			icon="mdi:place"
			type="number"
			title="Estado"
			bind:value={endereco.estado}
			style="outlined"
		/>
		<TextField
			icon="mdi:number-0-box"
			type="number"
			title="Numero"
			bind:value={endereco.numero}
			style="outlined"
		/>
		<TextField
			icon="mdi:number-0-box"
			type="number"
			title="CEP"
			bind:value={endereco.cep}
			style="outlined"
		/>
	</section>
	<button
		class="btn text-label-large btn-filled w-full"
		onclick={() => addMercadoToDatabase({ nome, local: { type: 'endereco', endereco } })}
	>
		<Icon icon="mdi:plus" width="24px" />
		<span> Adicionar </span>
	</button>
</section>
