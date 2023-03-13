module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts,scss}',
		//"./node_modules/flowbite/**/*.js",
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	mode: 'jit',
	theme: {
		extend: {
			screens: {
				'sm': '375px',
			},
			colors: {
				primary: '#D0BCFF',
				'on-primary':'#381E72',
				'primary-container': '#4F378B',
				'on-primary-container': '#EADDFF',
				secondary: '#CCC2DC',
				'on-secondary':'#332D41',
				'secondary-container': '#4A4458',
				'on-secondary-container': '#E8DEF8',
				background: '#1C1B1F',
				'on-background': '#E6E1E5',
				'surface-1': '#25232A',
				'surface-2' : '#2A2831',
				'surface-3' : '#302D38',
				'surface-4' : '#322E3A',
				'surface-5' : '#35323E',
				'surface-variant' : '#49454F',
				'on-surface-variant' : '#CAC4D0',
				'outline-variant': '#49454F'
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class',
	daisyui: {
		themes: ['dark']
	}
};
