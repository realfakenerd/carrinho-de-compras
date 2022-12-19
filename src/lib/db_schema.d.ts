import type { DocumentData } from "firebase/firestore";


export interface Mercado extends DocumentData{
	id: string;
	criado_em: string;
	nome: string;
	preco: number;
}