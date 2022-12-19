module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts,scss}'],
	mode: 'jit',
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['light', 'dark']
	}
	
};
