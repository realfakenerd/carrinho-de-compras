<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { mercado } = data;
</script>

<section class="flex flex-col gap-5">
	{#each mercado as item (item.id)}
		<div class="card bg-base-300 card-compact">
			<div class="card-body">
				<div class="card-title">{item.nome}</div>
				<p>Preço R${item.preco}</p>
				<div class="card-actions justify-end">
					<button class="btn-primary btn-sm btn-circle btn">+</button>
					<button class="btn-secondary btn-sm btn-circle btn">-</button>
				</div>
			</div>
		</div>
	{:else}
		<div class="card">
			<div class="card-body">
				<div class="card-title">não foram achados items</div>
			</div>
		</div>
	{/each}
</section>
