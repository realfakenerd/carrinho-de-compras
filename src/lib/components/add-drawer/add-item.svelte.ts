import { addItemToMercado } from '$lib/db';
import { toast } from 'svelte-sonner';
import { value } from '../unsplash/Unsplash.svelte';
import { produtoDrawerState } from './index';
import { ItemTipo } from '$lib/utils.svelte';
import type { Foto } from '$lib/types';

type StringTofoto = [string: 'src', string: 'alt'];

let _value: string | null = $state(null);

value.subscribe((value) => {
	_value = value;
});

function getString(string: string | null) {
	if (string?.startsWith('data:image')) {
		return string;
	}

	return string?.split('|') as StringTofoto | null;
}

function getFoto(string: string | StringTofoto | null) {
	if (typeof string === 'string') {
		return string;
	}

	return {
		src: string?.[0],
		alt: string?.[1]
	} as Foto;
}

export function addItem({ nome, preco, tipo }: { nome: string; preco: string; tipo: ItemTipo }) {
	try {
		if (nome && preco) {
			const string = getString(_value);
			const foto = getFoto(string);

			addItemToMercado({
				nome,
				preco,
				foto,
				tipo,
				categorias: [[0, '']],
				quantidade: 0
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
