import { ItemTipo } from '$lib/utils.svelte';
export { ItemTipo };

export interface Endereco {
	logradouro: string;
	complemento: string;
	numero: string;
	bairro: string;
	localidade: string;
	uf: string;
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
	foto: Foto;
	categorias?: Mapa[];
}

export interface Carrinho extends Omit<Produto, 'foto'> {
	quantidade: number;
}

export interface Foto {
	src: Blob | string;
	alt: string;
}

export interface Mercado {
	id?: number;
	nome: string;
	local: Local;
	foto?: Foto;
	produtos?: Mapa[];
}

export interface Categoria {
	id?: number;
	nome: string;
	produtos?: Mapa[];
}
