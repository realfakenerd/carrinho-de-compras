import { clientsClaim, cacheNames, setCacheNameDetails } from 'workbox-core';
import { pageCache, googleFontsCache, staticResourceCache } from 'workbox-recipes';
import { build } from '$service-worker';

self.__WB_DISABLE_DEV_LOGS = true;
setCacheNameDetails({
	prefix: 'popkorn-',
	suffix: `-v1`,
	googleFontsCache: 'ga'
});

clientsClaim();

pageCache({
	cacheName: cacheNames.prefix + 'pages' + cacheNames.suffix
});

pageCache({
	cacheName: cacheNames.prefix + 'pages' + cacheNames.suffix
});

googleFontsCache({
	cachePrefix: cacheNames.googleAnalytics
});

staticResourceCache({
	cacheName: cacheNames.prefix + 'assets' + cacheNames.suffix,
	warmCache: build
});
