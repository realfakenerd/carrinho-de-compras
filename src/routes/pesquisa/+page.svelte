<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import mercado from '$lib/stores/mercado.store';
	import type { DocumentData } from 'firebase/firestore';
	import { Input, Label, Listgroup, ListgroupItem, P } from 'flowbite-svelte';
	let value = '';
	let resultado: DocumentData[] = [];
	function pesquisa() {
		resultado = $mercado.filter((val) => {
			if (value) return (val.nome as string).toLowerCase().includes(value.trim().toLowerCase());
		});

		console.log('resultado', resultado);
	}
</script>

<div class="mb-6">
	<Label class="mb-2 block" for="pesquise">Pesquise o item:</Label>
	<Input bind:value on:keyup={pesquisa} type="text" id="pesquise" placeholder="Banana nanica">
		<svg
			slot="left"
			class="h-5 w-5 fill-gray-600 dark:fill-white"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
			/>
		</svg>
	</Input>
</div>

<Listgroup>
	{#each resultado as r, i (i)}
		<ListgroupItem>
            <ItemCard {...r}/>
        </ListgroupItem>
	{:else}
    <ListgroupItem>
            <P>Nada encontrado</P>
            <AddDrawer btnText="Deseja adicionar?"/>
    </ListgroupItem>
	{/each}
</Listgroup>
