import { ItemTipo } from '$lib/utils';
import { writable } from 'svelte/store';
// @ts-expect-error boring error
import ItemCard from './ItemCard.svelte';
import { db } from '$lib/db';
import type { Carrinho } from '$lib/types';

/**
 * Generates a writable store for a shopping cart item count with 
 * functions to increment, decrement, start auto-increment, start 
 * auto-decrement, and stop auto-increment.
 */
function carrinhoContas() {
	const { subscribe, update } = writable(0.0);
	let timer: NodeJS.Timeout | undefined;

	function increment(tipo: ItemTipo) {
		update((val) => {
			if (tipo === ItemTipo.UNIDADE) {
				return (val += 1);
			}
			return (val += 0.1);
		});
	}

	function decrement(tipo: ItemTipo) {
		update((val) => {
			if (tipo === ItemTipo.UNIDADE) return (val -= 1);
			return (val -= 0.1);
		});
	}

	function startIncrement(tipo: ItemTipo) {
		timer = setInterval(() => {
			increment(tipo);
		}, 150);
	}

	function startDecrement(tipo: ItemTipo) {
		timer = setInterval(() => {
			decrement(tipo);
		}, 150);
	}

	function stopIncrement() {
		if (timer) {
			clearInterval(timer);
			timer = undefined;
		}
	}

	return {
		increment,
		decrement,
		startIncrement,
		startDecrement,
		stopIncrement,
		subscribe
	};
}

function addCarrinho({ nome, preco, tipo, quantidade = 1 }: Carrinho){
	db.carrinho.add({ nome, preco, tipo, quantidade });
}

function deleteCarrinho(id: string) {
	db.carrinho.delete(id);
}

export { ItemCard, carrinhoContas, addCarrinho, deleteCarrinho };
