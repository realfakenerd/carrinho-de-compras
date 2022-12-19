module.exports = {
	plugins: [
		require('tailwindcss'),
		require('autoprefixer'),
		require('css-declaration-sorter')({
			order: 'concentric-css'
		}),
		require('cssnano')({
			preset: 'default'
		})
	]
};
