<script lang="ts">
	import { porNoCarrinho } from '$lib/servicos/carrinho-crud';
	import { ItemTipo } from '$lib/stores/mercado.store';
	import Icon from '@iconify/svelte';
	import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from './vaul';

	let preco: string;
	let nome: string;
	let img: string | null;
	let tipo: ItemTipo;
	let quantidade = 0;

	let open = false;
	function addAndDismiss() {
		porNoCarrinho({ nome, preco, tipo, quantidade });
		open = false;
	}

	export { preco, nome, img, tipo };

	let valorAPagar = 0;
	$: {
		if (tipo === ItemTipo.UNIDADE) valorAPagar = parseFloat(preco) * quantidade;
		else valorAPagar = parseFloat((parseFloat(preco) * quantidade).toFixed(2));
	}

	function increment() {
		if (tipo === ItemTipo.UNIDADE) {
			quantidade++;
			return;
		}
		quantidade += 0.1;
		return;
	}

	function decrement() {
		if (tipo === ItemTipo.UNIDADE) {
			quantidade--;
			return;
		}
		quantidade -= 0.1;
		return;
	}

	let timer: ReturnType<typeof setTimeout> | undefined;

	function startIncrement() {
		timer = setTimeout(increment, 150);
	}

	function startDecrement() {
		if (quantidade > 0.0) {
			timer = setTimeout(decrement, 100);
		}
	}

	function stopIncrement() {
		clearTimeout(timer);
		timer = undefined;
	}
</script>

<section class="card p-0 card-filled w-full max-w-52 overflow-hidden">
	<figure>
		<img
			on:contextmenu|preventDefault
			style="height: 208px;"
			class="rounded-lg object-cover aspect-square"
			loading="lazy"
			src={img || 'https://dummyimage.com/200x200/fff/111.gif&text=Imagem+indisponível'}
			alt={nome}
			width="208px"
			height="208px"
		/>
	</figure>

	<div class="flex flex-row justify-between w-full">
		<div class="flex flex-col p-4 w-full overflow-hidden">
			<h2
				class="text-label-medium col-span-2 capitalize overflow-hidden whitespace-nowrap text-ellipsis"
			>
				{nome}
			</h2>
			<p
				class="text-title-medium text-on-surface-variant overflow-hidden whitespace-nowrap text-ellipsis"
			>
				R$ {preco}
				{tipo === ItemTipo.KILO ? 'Kg' : 'Uni'}
			</p>
		</div>
		<Drawer {open}>
			<DrawerTrigger
				on:click={() => (open = true)}
				class="px-6 overflow-hidden text-primary hover:text-primary/70 transition-colors"
			>
				<Icon icon="mdi:cart-plus" />
			</DrawerTrigger>

			<DrawerContent class="flex flex-col gap-6 mb-20">
				<hgroup>
					<DrawerTitle class="text-headline-large">{nome}</DrawerTitle>
					<h2>R$ {preco} {tipo === ItemTipo.KILO ? 'Kg' : 'Uni'} / R$ {valorAPagar}</h2>
				</hgroup>

				<figure>
					<img
						style="height: 238px;"
						class="rounded-lg object-cover"
						loading="lazy"
						src={img || 'https://dummyimage.com/200x200/fff/111.gif&text=Imagem+indisponível'}
						alt={nome}
						width="238px"
						height="238px"
					/>
				</figure>

				<div class="p-4 pb-0">
					<div class="flex items-center justify-center space-x-2">
						<button
							on:click={decrement}
							on:touchstart={startDecrement}
							on:touchend={stopIncrement}
							disabled={quantidade <= 0}
							class="flex items-center text-on-surface-variant justify-center h-10 w-10 ring-1 hover:text-error hover:ring-2 transition ring-error rounded-full"
						>
							<Icon icon="mdi:minus" width="24px" />

							<span class="sr-only">Decrease</span>
						</button>

						<div class="flex-1 text-center">
							<div class="text-headline-large">
								{quantidade.toFixed(1)}
							</div>
							<div class="text-label-large uppercase">
								{#if tipo === ItemTipo.UNIDADE}
									{quantidade > 1 ? 'unidades' : 'unidade'}
								{:else}
									{quantidade > 1 ? 'quilos' : 'quilo'}
								{/if}
							</div>
						</div>
						<button
							on:click={increment}
							on:touchstart={startIncrement}
							on:touchend={stopIncrement}
							class="flex items-center justify-center h-10 w-10 ring-1 hover:ring-2 text-on-surface-variant hover:text-primary ring-primary rounded-full"
						>
							<Icon icon="mdi:plus" width="24px" />
							<span class="sr-only">Increase</span>
						</button>
					</div>
				</div>
				<button on:click={() => addAndDismiss()} class="bg-primary py-2 rounded-xl w-full">
					Adicionar no carrinho
				</button>
			</DrawerContent>
		</Drawer>
	</div>
</section>
