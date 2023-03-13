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
				primary: '#ffb778',
				'on-primary':'#4c2700',
				'primary-container': '#6c3a00',
				'on-primary-container': '#ffdcc1',
				secondary: '#e2c0a5',
				'on-secondary':'#412c19',
				'secondary-container': '#5a422d',
				'on-secondary-container': '#ffdcc1',
				background: '#201b17',
				'on-background': '#ece0da',
				'surface-1': '#25232A',
				'surface-2' : '#2A2831',
				'surface-3' : '#302D38',
				'surface-4' : '#322E3A',
				'surface-5' : '#35323E',
				'surface-variant' : '#51443a',
				'on-surface-variant' : '#d6c3b6',
				'outline-variant': '#9e8e82',
				error: '#ffb4ab',
				'on-error': '#690005',
				'error-container': '#93000a',
				'on-error-container': '#ffdad6',
			}
		}
	},
	plugins: [],
	darkMode: 'class',
	daisyui: {
		themes: ['dark']
	}
};
