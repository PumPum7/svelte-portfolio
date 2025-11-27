// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	output: 'static',
	adapter: vercel({
		webAnalytics: {
			enabled: true
		},
		imageService: true,
		edgeMiddleware: true
	}),
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [svelte()],
	site: 'https://www.pum.works/',
	trailingSlash: 'never',
	experimental: {
		fonts: [
			{
				provider: fontProviders.bunny(),
				name: 'Playfair Display',
				cssVariable: '--font-heading',
				weights: [400, 700]
			},
			{
				provider: fontProviders.bunny(),
				name: 'Lora',
				cssVariable: '--font-body',
				weights: [400, 500, 700]
			},
			{
				provider: fontProviders.bunny(),
				name: 'Anonymous Pro',
				cssVariable: '--font-mono'
			}
		]
	}
});
