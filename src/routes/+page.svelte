<script lang="ts">
	import { AddDrawer } from '$lib/components';
	import { ItemCard } from '$lib/components/item-card';
	import { TextField } from '$lib/components/textfield/index.js';
	import { db } from '$lib/db';
	import type { ItemTipo } from '$lib/types';
	import { liveQuery } from 'dexie';
	import { toast } from 'svelte-sonner';
	import { read, utils } from 'xlsx';
	import type { PageData } from './$types';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	let value = '';
	let { mercado } = data;

	$: if (value)
		mercado = liveQuery(() => db.mercado.where('nome').startsWithIgnoreCase(value).toArray());
	else mercado = data.mercado;

	interface ImportedData {
		Produto: string;
		Valor: number;
		Tipo: ItemTipo;
	}

	async function handleFile(e: Event) {
		const { files } = e.target as HTMLInputElement;
		const file = files?.item(0);
		if (!file) return;
		toast.info('Importando...');

		const wb = read(await file.arrayBuffer());
		const sheet = wb.Sheets[wb.SheetNames[0]];
		const json = utils.sheet_to_json<ImportedData>(sheet);

		await db.mercado.bulkAdd(
			json.map(({ Produto, Valor, Tipo }) => {
				return {
					nome: Produto,
					preco: String(Valor),
					tipo: Tipo,
					img: {
						alt: 'Imagem indisponível',
						color: '#111',
						src: 'https://dummyimage.com/200x200/fff/111.gif&text=Imagem+indisponível',
						blur_hash: ''
					}
				};
			})
		);

		toast.success(`Importado com sucesso`, {
			description: `Importado ${json.length} itens ao mercado`,
			duration: 2000
		});
	}
</script>

<section class="py-8 px-2 flex flex-col gap-4">
	<div class="relative mb-6 flex w-full items-center">
		<TextField bind:value style="outlined" title="Pesquisar" trailingIcon="mdi:search" />
	</div>

	<section class="flex flex-col md:flex-row items-center">
		<div>
			<h1 class="text-headline-large w-full">Carrinho de compras</h1>

			{#if $mercado && $mercado.length}
				<button class="icon-btn-container interactive-bg-error" on:click={() => db.mercado.clear()}>
					<span class="icon-btn">
						<Icon icon="mdi:trash-can-outline" />
					</span>
				</button>
			{/if}
		</div>

		<section class="flex flex-col gap-2 w-full">
			<label class="text-label-large" for="d"> Importar de planilha </label>
			<input
				class="bg-surface-variant p-4 rounded-lg file:border-0 file:rounded-md file:p-1 file:bg-surface file:text-label-medium file:text-primary"
				on:input={handleFile}
				type="file"
				multiple={false}
				name="import"
				id="d"
			/>
		</section>
	</section>
	<ul class="grid gap-4 justify-center">
		{#if $mercado}
			{#each $mercado as { img, nome, preco, tipo, id } (id)}
				<li>
					<ItemCard {img} {nome} {preco} {tipo} {id} />
				</li>
			{:else}
				<li class="card card-filled gap-1 w-full">
					<h1 class="text-title-large">Oops!</h1>
					<p class="text-body-medium">Nenhum item encontrado</p>
					<p class="text-body-medium">Tente Adicionar algo na lista</p>
				</li>
			{/each}
		{:else}
			<li class="card card-filled animate-pulse h-[280px] w-full" />
			<li class="card card-filled animate-pulse h-[280px] w-full" />
			<li class="card card-filled animate-pulse h-[280px] w-full" />
			<li class="card card-filled animate-pulse h-[280px] w-full" />
		{/if}
	</ul>
</section>

<AddDrawer />

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fit, minmax(0, 11rem));
	}
</style>
