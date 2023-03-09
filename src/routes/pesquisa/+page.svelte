<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import mercado from '$lib/stores/mercado.store';
	import type { DocumentData } from 'firebase/firestore';
	let value = '';
	let resultado: DocumentData[] = [];
	function pesquisa() {
		resultado = $mercado.filter((val) => {
			if (value) return (val.nome as string).toLowerCase().includes(value.trim().toLowerCase());
		});

		console.log('resultado', resultado);
	}
</script>

<div class="relative mb-6 flex w-full items-center px-5">
	<label class="sr-only" for="pesquise">Pesquise o item:</label>
	<input
		class="w-full rounded-full pl-4 placeholder:text-base-content"
		bind:value
		on:keyup={pesquisa}
		type="text"
		id="pesquise"
		placeholder="Pesquise o item:"
	/>
	<div class="absolute right-8">
		<Icon
			d={'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'}
		/>
	</div>
</div>

<ul>
	{#each resultado as r, i (i)}
		<li>
			<ItemCard {...r} />
		</li>
	{:else}
		<li>
			<div class="bg-base-300 pl-4 pr-6 py-2">
				<p>Nada encontrado</p>
			</div>
			<AddDrawer d={'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'} />
		</li>
	{/each}
</ul>
