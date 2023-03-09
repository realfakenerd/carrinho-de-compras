module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts,scss}',
		//"./node_modules/flowbite/**/*.js",
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	mode: 'jit',
	theme: {
		daisyui: ['dark']
	},
	plugins: [require('flowbite/plugin'), require('daisyui')],
	darkMode: 'class'
};
