import type { APIRoute } from 'astro';

export const prerender = true;

const siteUrl = 'https://www.pum.works';
const pages = ['/', '/contact'];

export const GET: APIRoute = async () => {
	const now = new Date().toISOString();
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${now}</lastmod>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
