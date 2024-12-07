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
    repositories(
      first: 100
      privacy: PUBLIC
      orderBy: { field: UPDATED_AT, direction: DESC }
    ) {
      nodes {
        name
        description
        url
        createdAt
        updatedAt
        languages(first: 10) {
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
			data: data.data.user.repositories.nodes.map((node: ResponseData) => ({
				...node,
				repo: node.url,
				language: node.languages.edges[0]?.node ?? { name: 'Unknown' },
				technologies: node.languages.edges
					.map(edge => edge.node.name)
					.filter(name => [
						'Rust', 'JavaScript', 'Kotlin', 'Python', 
						'Dockerfile', 'Shell', 'Jupyter Notebook', 'C', 
						'HTML', 'TypeScript', 'Go', 'CSS'
					].includes(name))
			}))
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
}) satisfies PageServerLoad;
