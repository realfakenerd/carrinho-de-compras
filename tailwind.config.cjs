module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts,scss}',
		//"./node_modules/flowbite/**/*.js",
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	mode: 'jit',
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#eefbff',
					100: '#d8f5ff',
					200: '#baedff',
					300: '#8be5ff',
					400: '#55d2ff',
					500: '#2db8ff',
					600: '#169cfa',
					700: '#0e78d4',
					800: '#1368ba',
					900: '#165892'
				},
				secondary: {
					50: '#eefff6',
					100: '#d6ffed',
					200: '#b0ffdd',
					300: '#74ffc3',
					400: '#30f8a1',
					500: '#05e282',
					600: '#00bc69',
					700: '#02884f',
					800: '#087346',
					900: '#095e3c'
				}
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
