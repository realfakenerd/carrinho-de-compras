import { ItemTipo } from './stores/mercado.store';

export interface Carrinho {
	id?: string;
	nome: string;
	preco: string;
	tipo: ItemTipo;
	quantidade: number;
}

export interface IMG {
	src: string;
	alt: string;
	color: string;
	blur_hash: string;
}

export interface Mercado extends Omit<Carrinho, 'quantidade'> {
	img: IMG;
}
