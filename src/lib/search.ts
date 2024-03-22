import Flexsearch from 'flexsearch';
import type { Mercado } from './types';

let mercadoIndex: Flexsearch.Index;
let mercado: Mercado[];

export function createMercadoIndex(data: Mercado[]) {
	mercadoIndex = new Flexsearch.Index({ tokenize: 'forward' });
	data.forEach((mercado, i) => {
		const item = `${mercado.nome} ${mercado.tipo}`;
		mercadoIndex.add(i, item);
	});

	mercado = data;
	
}

function replaceTextWithMarker(text: string, match: string) {
	const regex = new RegExp(match, 'gi');
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>}`);
}

export function searchMercadoIndex(searchTerm: string) {	
	const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const result = mercadoIndex.search(match);
	return result
		.map((index) => mercado[index as number])
		.map(({ nome, preco, img, tipo }) => {
			return {
				nome,
				preco,
				img,
				tipo
			};
		});
}
