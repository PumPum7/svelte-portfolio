export interface ResponseData {
	name: string;
	description: string;
	url: string;
	createdAt: string;
	updatedAt: string;
	languages: {
		edges: {
			node: {
				name: string;
			};
		}[];
	};
}

export interface Response {
	name: string;
	repo: string;
	description: string;
	demo?: string;
	language: Language;
	stars: number;
	forks: number;
	technologies?: string[];
	featured?: boolean;
	previewImage?: string;
}

export interface Language {
	name: string;
	color: string;
}
