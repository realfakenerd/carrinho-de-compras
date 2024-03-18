import { ItemTipo } from './stores/mercado.store';

export interface Carrinho {
	nome: string;
	preco: string;
	quantidade: number;
	tipo: ItemTipo;
}

export interface Mercado {
	img: string;
	nome: string;
	preco: string;
	tipo: ItemTipo;
	readonly id?: string;
	readonly ref?: CollectionReference;
}
