import { writable } from 'svelte-local-storage-store';

export interface Carrinho {
	nome: string;
	preco: string;
	quantidade: number;
}

const carrinho = writable<Carrinho[]>('carrinho', [], {
	storage: 'local'
});

export function porNoCarrinho({ nome, preco, quantidade = 1 }: Carrinho) {
	carrinho.update((val) => {
		let i = 0;
		for (i; i < val.length; i++) {
			if (val[i].nome === nome) {
				val[i].quantidade = quantidade === null ? 0 : quantidade;
				return val;
			}
		}

		val = [...val, { nome, preco, quantidade }];
		return val;
	});

	return null;
}

export default carrinho;
