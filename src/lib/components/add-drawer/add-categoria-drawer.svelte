<script lang="ts">
	import { TextField } from '$lib/components/textfield';
	import { db } from '$lib/db';
	import Icon from '@iconify/svelte';
	import { categoriaDrawerState } from '.';

	let nome = $state('');

	function addCategoria() {
		db.categorias.add({
			nome
		});
		categoriaDrawerState.set(false);
	}
</script>

<section class="flex flex-col space-y-6">
	<TextField icon="mdi:label" title="Nome do produto" bind:value={nome} style="outlined" />

	<button onclick={addCategoria} class="btn text-label-large btn-filled w-full">
		<Icon icon="mdi:plus" width="24px" />
		<span> Adicionar </span>
	</button>
</section>
