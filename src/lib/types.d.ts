import { ItemTipo } from './stores/mercado.store';

export interface Carrinho {
	nome: string;
	preco: string;
	quantidade: number;
	tipo: ItemTipo;
}



export interface Mercado extends Omit<Carrinho, 'quantidade'> {
	img: string;
	readonly id?: string;
	readonly ref?: CollectionReference;
}
