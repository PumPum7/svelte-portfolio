import type { PageLoad } from './$types';

export const prerender = true;

export interface ResponseData {
	isError: boolean;
	statusMessage: string;
	statusCode: number;
	response: Response[];
}

export interface Response {
	name: string;
	repo: string;
	description: string;
	demo?: string;
	language: Language;
	stars: number;
	forks: number;
}

export interface Language {
	name: string;
	color: string;
}

export const load = (async ({ fetch }): Promise<{ data: Response[] }> => {
	try {
		const response = await fetch(
			`https://gh-pinned-repos-api.ysnirix.xyz/api/get?username=pumpum7`
		);
		const data: ResponseData = await response.json();

		if (data.isError) {
			throw new Error(data.statusMessage);
		}
		return {
			data: data.response
		};
	} catch (_) {
		return {
			data: []
		};
	}
}) satisfies PageLoad;
