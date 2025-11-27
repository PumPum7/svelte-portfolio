const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				parchment: '#f4e4bc',
				'sepia-dark': '#4a3b2a',
				'sepia-light': '#6b5b4a',
				'forest-green': '#2c5f2d',
				'deep-red': '#a63d40',
				gold: '#c0a060',
				'card-bg': '#fdf6e3',
				background: '#fdf6e3',
				'deep-red-background': '#a63d4010',
				'box-shadow': '#6b5b4a40'
			},
			fontFamily: {
				heading: ['Playfair Display', ...fontFamily.serif],
				body: ['Lora', ...fontFamily.serif],
				mono: ['Courier New', ...fontFamily.mono]
			}
		}
	},
	plugins: []
};
