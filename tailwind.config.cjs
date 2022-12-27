module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts,scss}',
		//"./node_modules/flowbite/**/*.js",
		"./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"
	],
	mode: 'jit',
	theme: {
		colors: {
			primary: "#661AE6",
			"primary-content": "#ffffff",
			secondary: "#D926AA",
			"secondary-content": "#ffffff",
			accent: "#1FB2A5",
			"accent-content": "#ffffff",
			neutral: "#191D24",
			"neutral-focus": "#111318",
			"neutral-content": "#A6ADBB",
			"base-100": "#2A303C",
			"base-200": "#242933",
			"base-300": "#20252E",
			"base-content": "#A6ADBB",
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class',
};
