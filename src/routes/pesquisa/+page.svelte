<script lang="ts">
	import AddDrawer from '$lib/components/AddDrawer.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ItemCard from '$lib/components/ItemCard.svelte';
	import type { Mercado } from '$lib/stores/mercado.store';
	import user from '$lib/stores/user.store';
	import { slide } from 'svelte/transition';

	export let data;
	let value = '';
	let resultado: Mercado[] = [];
	
	const {mercado} = data;

	function pesquisa() {
		resultado = $mercado.filter((val) => {
			if (value) return (val.nome as string).toLowerCase().includes(value.trim().toLowerCase());
		});		
	}
</script>

<div class="relative mb-6 flex w-full items-center">
	<label class="sr-only" for="pesquise">Pesquise o item:</label>
	<input
		class="w-full max-w-3xl rounded-full border-none bg-surface-3
			py-4 px-4 transition placeholder:text-on-background focus:bg-surface-1"
		bind:value
		on:keyup={pesquisa}
		type="text"
		id="pesquise"
		placeholder="Pesquise o item:"
	/>
	<div class="absolute right-4 fill-on-background">
		<Icon
			d={'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'}
		/>
	</div>
</div>

<ul class="bg-surface-variant sm:rounded-xl">
	{#each resultado as r, i (i)}
		<li transition:slide>
			<ItemCard {...r} />
			<hr />
		</li>
	{:else}
		<li>
			<div class="pl-4 pr-6 py-2">
				<p class="text-body-large">Nada encontrado</p>
			</div>
			{#if $user}
				<AddDrawer />
			{/if}
		</li>
	{/each}
</ul>

<style lang="postcss">
	li:last-child hr {
		@apply hidden;
	}
</style>