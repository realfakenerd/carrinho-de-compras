import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts,scss}'],
	mode: 'jit',
	theme: {
		extend: {
			fontSize: {
				'display-large': ['3.5rem', { lineHeight: '4rem' }],
				'display-medium': ['2.8rem', { lineHeight: '3.25rem' }],
				'display-small': ['2.25rem', { lineHeight: '2.75rem' }],

				'headline-large': ['2rem', { lineHeight: '2.5rem' }],
				'headline-medium': ['1.75rem', { lineHeight: '2.25rem' }],
				'headline-small': ['1.5rem', { lineHeight: '2rem' }],

				'title-large': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '500' }],
				'title-medium': [
					'1rem',
					{ lineHeight: '1.5rem', fontWeight: '500', letterSpacing: '0.15px' }
				],
				'title-small': [
					'0.875rem',
					{ lineHeight: '1.25rem', fontWeight: '500', letterSpacing: '0.1px' }
				],

				'body-large': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.15px' }],
				'body-medium': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.25px' }],
				'body-small': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.4px' }],

				'label-large': [
					'0.875rem',
					{ lineHeight: '1.25rem', fontWeight: '500', letterSpacing: '0.1px' }
				],
				'label-small': [
					'0.65rem',
					{ lineHeight: '1rem', fontWeight: '500', letterSpacing: '0.5px' }
				],
				'label-medium': [
					'0.75rem',
					{ lineHeight: '1rem', fontWeight: '500', letterSpacing: '0.5px' }
				]
			},
			colors: {
				primary: '#ffb778',
				'on-primary': '#4c2700',
				'primary-container': '#6c3a00',
				'on-primary-container': '#ffdcc1',
				secondary: '#e2c0a5',
				'on-secondary': '#412c19',
				'secondary-container': '#5a422d',
				'on-secondary-container': '#ffdcc1',
				background: '#201b17',
				'on-background': '#ece0da',
				'surface-1': '#25232A',
				'surface-2': '#2A2831',
				'surface-3': '#302D38',
				'surface-4': '#322E3A',
				'surface-5': '#35323E',
				'surface-variant': '#51443a',
				'on-surface-variant': '#d6c3b6',
				'outline-variant': '#9e8e82',
				error: '#ffb4ab',
				'on-error': '#690005',
				'error-container': '#93000a',
				'on-error-container': '#ffdad6'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')],
	darkMode: 'class'
} satisfies Config;
