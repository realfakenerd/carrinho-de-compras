import { writable } from 'svelte/store';

export { default as AddDrawer } from '../drawer.svelte';
export { default as AddItemDrawer } from './add-item-drawer.svelte';
export { default as AddCategoriaDrawer } from './add-categoria-drawer.svelte';
export { default as AddMercadoDrawer } from './add-mercado-drawer.svelte'

export const produtoDrawerState = writable(false);
export const categoriaDrawerState = writable(false);
export const mercadoDrawerState = writable(false);