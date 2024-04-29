<script lang="ts">
	import { Camera } from '$lib/components/camera';
	import { image } from '$lib/components/camera/stores';
	import { addMercadoToDatabase } from '$lib/db';
	import type { Endereco } from '$lib/types';
	import { debounce } from '$lib/utils.svelte';
	import Icon from '@iconify/svelte';
	import { createCollapsible, melt } from '@melt-ui/svelte';
	import { parse, stringify } from 'devalue';
	import { circInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { TextField } from '../textfield';
	import { DrawerTitle } from '../vaul';

	let nome = $state('');
	let value = $state<string>();
	let endereco = $state<Endereco>({
		logradouro: '',
		complemento: '',
		numero: '',
		bairro: '',
		localidade: '',
		uf: '',
		cep: ''
	});

	async function buscaCEP() {
		const cep = value?.toString().replace(/\D/g, '');
		if (cep?.length === 8) {
			const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
			const data = (await res.json()) as Endereco;

			if (res.ok) {
				endereco.logradouro = data.logradouro;
				endereco.complemento = data.complemento;
				endereco.numero = data.numero;
				endereco.bairro = data.bairro;
				endereco.localidade = data.localidade;
				endereco.uf = data.uf;
				endereco.cep = data.cep;
			}
		}
	}

	const {
		elements: { root, content, trigger },
		states: { open }
	} = createCollapsible();
</script>

<DrawerTitle class="text-title-medium">Adicione um novo mercado</DrawerTitle>

<section class="flex flex-col gap-6 mb-24">
	<TextField icon="mdi:label" title="Nome do mercado" bind:value={nome} style="outlined" />

	<section class="relative flex flex-col gap-3" use:melt={$root}>
		<div class="inline-flex items-center w-full justify-between">
			<div class="inline-flex items-center">
				<Icon width="18px" icon="mdi:place" />
				<h1 class="text-title-medium">Endereço do mercado</h1>
			</div>

			<button
				class="icon-btn-container hover:bg-primary hover:text-on-primary transition-colors"
				use:melt={$trigger}
			>
				<span class="icon-btn">
					{#if $open}
						<Icon width="24px" icon="mdi:chevron-up" />
					{:else}
						<Icon width="24px" icon="mdi:chevron-down" />
					{/if}
				</span>
			</button>
		</div>
		{#if $open}
			<div class="flex flex-col gap-3" transition:fly={{ easing: circInOut }} use:melt={$content}>
				<TextField
					required
					icon="mdi:number-0-box"
					type="number"
					title="CEP"
					bind:value
					style="outlined"
					onkeydown={debounce(buscaCEP, 500)}
				/>
				<TextField
					required
					icon="mdi:road"
					type="text"
					title="Rua"
					bind:value={endereco.logradouro}
					style="outlined"
				/>
				<TextField
					icon="mdi:road"
					type="text"
					title="Complemento"
					bind:value={endereco.complemento}
					style="outlined"
				/>
				<TextField
					required
					icon="mdi:neighbourhood"
					type="text"
					title="Bairro"
					bind:value={endereco.bairro}
					style="outlined"
				/>
				<TextField
					required
					icon="mdi:home-city"
					type="text"
					title="Cidade"
					bind:value={endereco.localidade}
					style="outlined"
				/>
				<TextField
					required
					icon="mdi:place"
					type="text"
					title="Estado"
					bind:value={endereco.uf}
					style="outlined"
				/>
				<TextField
					required
					icon="mdi:number-0-box"
					type="number"
					title="Numero"
					bind:value={endereco.numero}
					style="outlined"
				/>
			</div>
		{/if}
	</section>

	<Camera />

	<button
		class="btn text-label-large btn-filled w-full"
		onclick={() =>
			addMercadoToDatabase({
				nome,
				foto: { src: $image ?? '', alt: 'Foto da camera' },
				local: { type: 'endereco', endereco: parse(stringify(endereco)) }
			})}
	>
		<Icon icon="mdi:plus" width="24px" />
		<span> Adicionar </span>
	</button>
</section>
