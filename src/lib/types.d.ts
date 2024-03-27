import { ItemTipo } from './stores/mercado.store';

export interface Carrinho {
	nome: string;
	preco: string;
	quantidade: number;
	tipo: ItemTipo;
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
