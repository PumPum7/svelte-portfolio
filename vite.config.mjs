import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		paraglide({ project: './project.inlang', outdir: './src/lib/paraglide' }),
		enhancedImages(),
		sveltekit()
	],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
};
export default defineConfig(config);
