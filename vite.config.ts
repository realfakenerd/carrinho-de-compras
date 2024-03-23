import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import removeConsole from 'vite-plugin-remove-console';

const config = {
	define: {
		'process.env': {}
	},
	ssr: {
		external: ['rxfire/firestore', 'firebase']
	},
	build: {
		reportCompressedSize: false,
		target: 'esnext',
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				arrows: true,
				dead_code: true,
				drop_debugger: true,
				ie8: false
			},
			ecma: 2020,
			ie8: false,
			mangle: true,
			safari10: false
		}
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
