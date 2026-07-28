import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

const siteUrl = 'https://pum.works';

/** Return a static sitemap containing the homepage, contact page, and project case studies. */
export const GET: APIRoute = async () => {
	const projects = await getCollection('work');
	const paths = ['/', '/contact', ...projects.map((project) => `/work/${project.id}`)];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
};
