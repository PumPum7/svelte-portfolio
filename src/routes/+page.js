/** @type {import("./$types").PageLoad} */
export const load = (async () => {
  const response = await fetch(`https://gh-pinned-repos.egoist.dev/?username=PumPum7`);
  const data = await response.json();

  return {
    data
  };
})