<script lang="ts">
	import { AddDrawer } from '$lib/components';
	import { ItemCard } from '$lib/components/item-card';
	import { TextField } from '$lib/components/textfield/index.js';
	import { db } from '$lib/db';
	import { createMercadoIndex, searchMercadoIndex } from '$lib/search';
	import type { ItemTipo } from '$lib/types';
	import Icon from '@iconify/svelte';
	import { liveQuery } from 'dexie';
	import { toast } from 'svelte-sonner';
	import { read, utils } from 'xlsx';
	import type { PageData } from './$types';
	import { fade, fly } from 'svelte/transition';

	export let data: PageData;

	let value = '';
	let { mercado } = data;
	let result = $mercado;

	// $: if (value)
	// 	mercado = liveQuery(() =>
	// 		db.mercado.where('nome').startsWithIgnoreCase(value.trim()).toArray()
	// 	);
	// else mercado = data.mercado;

	interface ImportedData {
		Produto: string;
		Valor: number;
		Tipo: ItemTipo;
	}

	$: if ($mercado) {
		createMercadoIndex($mercado);
	}

	$: if (value) {
		result = searchMercadoIndex(value.trim());
	} else result = $mercado;

	async function handleFile(e: Event) {
		const { files } = e.target as HTMLInputElement;
		const file = files?.item(0);
		if (!file) return;

		if (!file?.type.startsWith('application/vnd')) {
			toast.error('Tipo invalido de arquivo', {
				description: 'Apenas arquivos .xlsx e .ods são permitidos',
				duration: 3000
			});
			return;
		}

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

	<section class="flex flex-col gap-4 md:flex-row items-center">
		<div class="flex flex-row gap-2 w-full">
			<h1 class="text-headline-large w-full">Carrinho de compras</h1>

			{#if $mercado && $mercado.length}
				<button
					class="h-12 min-w-12 grid place-items-center rounded-full interactive-bg-error"
					on:click={() => db.mercado.clear()}
				>
					<Icon width="24px" icon="mdi:trash-can-outline" />
				</button>
			{/if}
		</div>

		<section class="flex flex-col gap-2 w-full">
			<label class="text-label-large" for="d"> Importar de planilha </label>
			<input
				accept=".ods,.xls,.xlsx"
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
		{#if result}
			{#each result as { img, nome, preco, tipo, id }, i (i)}
				<li transition:fly>
					<ItemCard {img} {nome} {preco} {tipo} {id} />
				</li>
			{:else}
				<li class="card card-filled gap-1 justify-end w-full h-[280px]">
					<h1 class="text-title-large">Oops!</h1>
					<p class="text-body-medium">Nenhum item encontrado</p>
					<p class="text-body-medium">Tente Adicionar algo na lista</p>
				</li>
			{/each}
		{:else}
			<li transition:fly class="card card-filled animate-pulse h-[280px] w-full" />
			<li transition:fly class="card card-filled animate-pulse h-[280px] w-full" />
			<li transition:fly class="card card-filled animate-pulse h-[280px] w-full" />
			<li transition:fly class="card card-filled animate-pulse h-[280px] w-full" />
		{/if}
	</ul>
</section>

<AddDrawer />

<style>
	ul.grid {
		grid-template-columns: repeat(auto-fit, minmax(0, 11rem));
	}
</style>
