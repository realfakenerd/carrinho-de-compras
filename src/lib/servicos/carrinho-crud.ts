import carrinho from '$lib/stores/carrinho.store';
import type { Carrinho } from '$lib/types';

function porNoCarrinho({ nome, preco, tipo, quantidade = 1 }: Carrinho) {
	carrinho.update((val) => {
		const idx = val.findIndex(({ nome: n }) => n === nome);
		if (idx !== -1) {
			val[idx].quantidade += quantidade;
		} else {
			val = [...val, { nome, preco, quantidade, tipo }];
		}
		return val;
	});

	return null;
}

function tirarDoCarrinho(nome: string) {
	carrinho.update((val) => {
		for (let i = 0; i < val.length; i++) {
			if (val[i].nome == nome) {
				val.splice(i, 1);
			}
		}
		return val;
	});
	return null;
}

function porNoCarrinhoInput({ nome, preco, tipo, quantidade = 1 }: Carrinho) {
	carrinho.update((val) => {
		let i = 0;
		for (i; i < val.length; i++) {
			if (val[i].nome === nome) {
				val[i].quantidade = quantidade === null ? 0 : quantidade;
				return val;
			}
		}

		val = [...val, { nome, preco, quantidade, tipo }];
		return val;
	});

	return null;
}

export { porNoCarrinho, porNoCarrinhoInput, tirarDoCarrinho };
