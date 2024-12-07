import type { PageServerLoad } from './$types';
import { GITHUB_API } from '$env/static/private';
import type { ResponseData, Response } from '$lib/types';

export const prerender = true;

export const load = (async (): Promise<{ data: Response[] }> => {
	try {
		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${GITHUB_API}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `
          query {
            user(login: "PumPum7") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    createdAt
                    updatedAt
                    languages(first: 1) {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                    repositoryTopics(first: 10) {
                      nodes {
                        topic {
                          name
                        }
                      }
                    }
                    stargazerCount
                    openGraphImageUrl
                  }
                }
              }
            }
          }
        `
			})
		});

		const data = await response.json();

		if (data.isError) {
			throw new Error(data.statusMessage);
		}

		if (!data.data) {
			return { data: [] };
		}

		return {
			data: data.data.user.pinnedItems.nodes.map((node: ResponseData) => ({
				...node,
				repo: node.url,
				language: node.languages.edges[0].node ?? { name: 'Unknown' }
			}))
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}) satisfies PageServerLoad;
