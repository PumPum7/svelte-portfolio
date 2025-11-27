// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import node from '@astrojs/node';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    adapter: vercel({
		webAnalytics: {
			enabled: true
		},
		imageService: true,
		edgeMiddleware: true,
	}),
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [svelte()],
    site: 'https://www.pum.works/',
    base: '/',
    trailingSlash: 'always'
});