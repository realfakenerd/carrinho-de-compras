/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { files, build, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];
const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('activate', (event) => {
	async function deleteOldCache() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCache());
});

sw.addEventListener('install', (event) => {
	async function addToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}
	event.waitUntil(addToCache());
});

sw.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;
	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		console.log('[service worker] fetching', url.pathname);

		if (ASSETS.includes(url.pathname)) {
			const res = await cache.match(url.pathname);
			
			if (res) {
				console.log('[service worker] found in cache', url.pathname);
				return res;
			}
		}

		try {
			const res = await fetch(event.request);
			
			if (!(res instanceof Response)) {
				throw new Error('invalid response from fetch');
			}

			if(res.status === 200) {
				console.log('[service worker] caching', url.pathname);
				cache.put(event.request, res.clone());
			}

			return res;
		} catch (error) {
			const res = await cache.match(event.request);

			if (res) {
				console.log('[service worker] found in cache (error occurred)', url.pathname);
				return res;
			}

			console.error('[service worker] failed to fetch', event.request.url, error);
			throw error;
		}
	}

	event.respondWith(respond());
});
