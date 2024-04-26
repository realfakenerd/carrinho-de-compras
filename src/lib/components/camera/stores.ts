import { writable } from 'svelte/store';
export const image = writable<Blob | null>(null);