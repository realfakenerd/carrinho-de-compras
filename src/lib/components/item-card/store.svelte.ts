import { ItemTipo } from '$lib/utils.svelte';

/**
 * Generates a writable store for a shopping cart item count with
 * functions to increment, decrement, start auto-increment, start
 * auto-decrement, and stop auto-increment.
 */
function carrinhoContas() {
	let value = $state(0.0);
	let timer: NodeJS.Timeout | undefined = $state(undefined);

	function increment(tipo: ItemTipo) {
		if (tipo === ItemTipo.UNIDADE) {
			return (value += 1);
		}
		return (value += 0.1);
	}

	function decrement(tipo: ItemTipo) {
		if (tipo === ItemTipo.UNIDADE) {
			return (value -= 1);
		}
		return (value -= 0.1);
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
		get value() {
			return value;
		}
	};
}
export default carrinhoContas;
