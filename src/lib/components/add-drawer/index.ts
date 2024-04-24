import { writable } from 'svelte/store';

// @ts-expect-error boring error
export { default as AddDrawer } from './add-drawer.svelte';
// @ts-expect-error boring error
export { default as AddItemDrawer } from './add-item-drawer.svelte';
// @ts-expect-error boring error
export { default as AddCategoriaDrawer } from './add-categoria-drawer.svelte';
// @ts-expect-error boring error
export { default as AddMercadoDrawer } from './add-mercado-drawer.svelte'

export const produtoDrawerState = writable(false);
export const categoriaDrawerState = writable(false);
export const mercadoDrawerState = writable(false);