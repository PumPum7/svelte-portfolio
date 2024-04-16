import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from '@zerodevx/svelte-img/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), imagetools()],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
};
export default defineConfig(config);
