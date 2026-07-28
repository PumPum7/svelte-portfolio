import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		role: z.array(z.string()),
		status: z.enum(['active', 'shipped', 'experiment', 'archived']),
		year: z.string().optional(),
		technologies: z.array(z.string()),
		liveUrl: z.string().url().optional(),
		sourceUrl: z.string().url().optional(),
		featured: z.boolean(),
		order: z.number().int().positive(),
		coverImage: z.string(),
		coverAlt: z.string(),
		ogImage: z.string()
	})
});

/** Astro page content collections. */
export const collections = { work };
