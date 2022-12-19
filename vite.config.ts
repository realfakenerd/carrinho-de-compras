import { sveltekit } from '@sveltejs/kit/vite';
import removeConsole from 'vite-plugin-remove-console';
import viteCompression from 'vite-plugin-compression';
import type { UserConfig } from 'vite';

const config = {
	define: {
		'process.env': {}
	},
	build: {
		reportCompressedSize: false,
		target: 'esnext',
		minify: 'esbuild'
	},
	plugins: [
		sveltekit(),
		removeConsole(),
		viteCompression({
			algorithm: 'brotliCompress',
			verbose: false,
			threshold: 512,
			compressionOptions: {
				level: 3
			}
		})
	]
} satisfies UserConfig;

export default config;


