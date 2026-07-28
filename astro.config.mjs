// @ts-check
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
	compressHTML: true,
	output: 'static',
	site: 'https://pum.works',
	trailingSlash: 'never',
	adapter: vercel({
		webAnalytics: { enabled: true },
		imageService: true,
		edgeMiddleware: true
	}),
	vite: { plugins: [tailwindcss()] },
	integrations: [mdx(), svelte()],
	fonts: [
		{
			provider: fontProviders.bunny(),
			name: 'Instrument Sans',
			cssVariable: '--font-sans',
			weights: [400, 500, 600],
			styles: ['normal']
		},
		{
			provider: fontProviders.bunny(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-mono',
			weights: [400, 500, 600],
			styles: ['normal']
		}
	]
});
