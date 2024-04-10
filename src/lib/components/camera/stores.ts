import { writable } from 'svelte/store';

export const photo = writable<HTMLImageElement | null>(null);
export const video = writable<HTMLVideoElement | null>(null);
export const front = writable(false);