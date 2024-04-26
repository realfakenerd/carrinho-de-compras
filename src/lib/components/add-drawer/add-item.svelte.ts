import { addProdutoToMercado } from '$lib/db';
import type { Produto } from '$lib/types';
import { ItemTipo } from '$lib/utils.svelte';
import { toast } from 'svelte-sonner';
import { produtoDrawerState } from './index';


export function addItem({ nome, preco, tipo, foto }: Produto) {
	try {
		if (nome && preco) {

			addProdutoToMercado({
				nome,
				preco,
				foto,
				tipo,
				categorias: [[0, '']]
			});

			toast.success('Adicionado com sucesso!', {
				description: `${nome}: R$ ${preco}`
			});

			produtoDrawerState.set(false);
			nome = preco = '';
			tipo = ItemTipo.UNIDADE;
		}
	} catch (error) {
		const err = error as Error;
		toast.error(err.name, {
			description: err.message
		});
	}
}
