import { ItemTipo } from '$lib/stores/mercado.store';
import { writable } from 'svelte/store';
import ItemCard from './ItemCard.svelte';

function carrinhoCard() {
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

export { ItemCard, carrinhoCard };
