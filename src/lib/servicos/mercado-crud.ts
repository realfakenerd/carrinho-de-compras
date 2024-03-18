import { mercRef, type Mercado } from '$lib/stores/mercado.store';
import { addDoc, updateDoc } from 'firebase/firestore';

async function createItem<T extends Partial<Mercado>>({ nome, preco, img, tipo }: T) {
	addDoc(mercRef, { nome, preco, img, tipo });
}

async function updateItem<T extends Partial<Mercado>>({ nome, preco, img, ref }: T) {
	updateDoc(ref! as any, { nome, preco, img });
}

export { createItem, updateItem };
