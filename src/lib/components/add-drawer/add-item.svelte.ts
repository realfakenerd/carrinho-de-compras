import { addItemToMercado } from '$lib/db';
import type { Foto as Imagem } from '$lib/types';
import { ItemTipo } from '$lib/utils.svelte';
import { toast } from 'svelte-sonner';
import { produtoDrawerState } from './index';

type StringTofoto = [string: 'src', string: 'alt'];

function getString(foto: string | Blob | null) {
	if (typeof foto === 'string') {
		return foto?.split('|') as StringTofoto | null;
	}

	return foto;
}

function getFoto(foto: StringTofoto | Blob | null) {
	if (typeof foto === 'string') {
		return {
			src: foto?.[0],
			alt: foto?.[1]
		} as Imagem;
	}

	return {
		src: foto,
		alt: 'Foto da camera'
	} as Imagem;
}

export function addItem({
	nome,
	preco,
	tipo,
	foto
}: {
	nome: string;
	preco: string;
	tipo: ItemTipo;
	foto: string | Blob;
}) {
	try {
		if (nome && preco) {
			
			const string = getString(foto);
			const imagem = getFoto(string);

			addItemToMercado({
				nome,
				preco,
				foto: imagem,
				tipo,
				categorias: [[0, '']],
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
