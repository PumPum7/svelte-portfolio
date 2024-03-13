import type { PageLoad } from './$types';


export const load = (async () => {
  try {
    const response = await fetch(`https://gh-pinned-repos-api.ysnirix.xyz/api/get?username=pumpum7`);
    const data = await response.json();

    return {
      data: data.response
    };
  } catch (_) {
    return {
      data: {}
    }
  }
}) satisfies PageLoad;