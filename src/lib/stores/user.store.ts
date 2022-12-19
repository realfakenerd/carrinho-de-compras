import type { OAuthCredential, User } from "firebase/auth";
import { writable } from "svelte/store";

export const user = writable<User | null>(null);
export const credential = writable<OAuthCredential | null>(null);