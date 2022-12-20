import {writable} from 'svelte-local-storage-store';

interface Carrinho {
    nome: string;
    preco: string;
}

const carrinho = writable<Carrinho[]>('carrinho', [], {
    storage: 'local'
})

export default carrinho;