import { build, files, version } from '$service-worker';
import { cacheNames, clientsClaim, setCacheNameDetails } from 'workbox-core';
import {
	imageCache,
	pageCache,
	staticResourceCache,
	warmStrategyCache,
} from 'workbox-recipes';
import { CacheFirst } from 'workbox-strategies';

const urls = [...files, ...build];

setCacheNameDetails({
	prefix: 'carrinho',
	suffix: `v${version}`,
	precache: 'precache',
	runtime: 'runtime',
	googleAnalytics: 'ga'
});

clientsClaim();

const strategy = new CacheFirst({
	cacheName: `${cacheNames.prefix}-precache-${cacheNames.suffix}`,
});

warmStrategyCache({ urls, strategy });

pageCache({
	cacheName: `${cacheNames.prefix}-page-${cacheNames.suffix}`
});

staticResourceCache({
	cacheName: `${cacheNames.prefix}-static-${cacheNames.suffix}`
});

imageCache({
	cacheName: `${cacheNames.prefix}-image-${cacheNames.suffix}`
});
