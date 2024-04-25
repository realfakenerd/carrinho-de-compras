import { ItemTipo } from '$lib/utils.svelte';
export { ItemTipo };

interface Endereco {
	rua: string;
	numero: string;
	bairro: string;
	cidade: string;
	estado: string;
	pais: string;
	cep: string;
}

interface Coordenadas {
	lat: number;
	lng: number;
}

type Local = { type: 'coord'; coord: Coordenadas } | { type: 'endereco'; endereco: Endereco };
type Mapa = [id: number, nome: string];

export interface Produto {
	id?: number;
	nome: string;
	preco: string;
	tipo: ItemTipo;
	foto: Foto | string;
	categorias?: Mapa[];
}

export interface Carrinho extends Produto{
	quantidade: number;
}

export interface Foto {
	src?: string;
	alt?: string;
}

export interface Mercado {
	id?: number;
	nome: string;
	local: Local;
	foto?: Foto | string; 
	produtos?: Mapa[];
}

export interface Categoria {
	id?: number;
	nome: string;
	produtos?: Mapa[];
}
