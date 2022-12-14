<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import supabase, { type Mercado } from '$lib/supa';
	import { get, readable } from 'svelte/store';
	import type { PageData } from './$types';
	export let data: PageData;

	const mercado = readable<Mercado[] | null>(null, (set) => {
		supabase
			.from('mercado')
			.select('*')
			.then(({ data: mercado, error }) => set(mercado));

		supabase
			.channel('custom-all-channel')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'mercado' },
				(payload) => {
					console.log('Change received!', payload);
					set([...get(mercado), payload.new]);
				}
			)
			.subscribe();

		return () => supabase.channel('custom-all-channel').unsubscribe();
	});

	let itemName = '';
	let itemPreco = '';

	const addItem = async () => {
		const { data, error } = await supabase
			.from('mercado')
			.insert([{ name: itemName, preco: parseFloat(itemPreco) }]);
	};
</script>

<ul class="mb-10 flex flex-col gap-5">
	{#if $mercado !== null}
		{#each $mercado as item (item.id)}
			<li>
				<section>
					<h1>{item.name}</h1>
					<h2>{item.preco}</h2>
				</section>
			</li>
		{/each}
	{:else}
		<li>
			<div>
				<div class="capitalize">sem items dentro do carrinho</div>
			</div>
		</li>
	{/if}
</ul>
<section class="card">
	<div class="card-container">
		<header class="card-header">
			<h1>Adicione um novo item</h1>
		</header>
		<main class="card-body">
			<form>
				<fieldset>
					<section>
						<div>
							<input bind:value={itemName} type="text" placeholder="Email address" id="nome" />
							<label for="nome">nome: {itemName}</label>
						</div>
					</section>
					<div class="suporting-text">
						<span> Nome do produto </span>
					</div>
				</fieldset>
				<fieldset>
					<section>
						<div>
							<input bind:value={itemPreco} type="text" placeholder="Email address" id="preco" />
							<label for="preco">preco: {itemPreco}</label>
						</div>
					</section>
					<div class="suporting-text">
						<span>Preço do produto </span>
					</div>
				</fieldset>
			</form>
			<div class="card-action">
				<button class="btn btn-outlined">
					<span>Remover</span>
				</button>
				<button on:click={addItem} class="btn btn-filled">
					<span>Add</span>
				</button>
			</div>
		</main>
	</div>
</section>

<style lang="scss">
	li {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 8px 24px 8px 16px;
		gap: 16px;
		min-height: 72px;
		flex: none;
		order: 1;
		align-self: stretch;
		flex-grow: 1;
		z-index: 1;
		background: #fffbfe;

		section {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			flex: none;
			order: 0;
			align-self: stretch;
			flex-grow: 1;
			height: 56px;
			padding: 0px;

			h1 {
				text-transform: capitalize;
				letter-spacing: 0.5px;
				font-size: 16px;
				line-height: 24px;
			}
			h2 {
				font-size: 14px;
				line-height: 20px;
				letter-spacing: 0.25px;
			}
		}
	}
</style>
