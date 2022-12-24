type GithubProjectData = {
  repo: string;
  link: string;
  description: string;
  image: string;
  language: string;
}


export type PageServerLoad = Kit.ServerLoad<{ data: [GithubProjectData] }>;