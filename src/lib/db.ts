import { collection, getFirestore } from 'firebase/firestore';
import firebase from './firebase';

export interface Mercado {
	id: string;
	criado_em: string;
	nome: string;
	preco: number;
}

const db = getFirestore(firebase);
export const mercadoRef = collection(db, 'mercado');
export default db;
