/** Compact public projects shown after the featured case studies. */
export const experiments = [
	{
		name: 'statusbar-govee',
		description: 'A macOS menu bar controller for Govee lights and sensors.',
		technology: 'Tauri · SvelteKit · Rust',
		href: 'https://github.com/PumPum7/statusbar-govee'
	},
	{
		name: 'Pomate',
		description: 'A native macOS Pomodoro timer with tasks, session controls, and statistics.',
		technology: 'Swift · macOS',
		href: 'https://github.com/PumPum7/Pomate'
	},
	{
		name: 'Minesweeper',
		description: 'A Rust and WebAssembly take on the classic puzzle, packaged as a PWA.',
		technology: 'Rust · WebAssembly · PWA',
		href: 'https://github.com/PumPum7/minesweeper'
	},
	{
		name: 'Modmail',
		description: 'A Discord moderation workflow paired with a management web interface.',
		technology: 'TypeScript · Rust · Docker',
		href: 'https://github.com/PumPum7/modmail'
	}
] as const;

/** Engineering capabilities used to frame the portfolio. */
export const capabilities = [
	{
		title: 'Product Engineering',
		description:
			'Mobile and web products, UX-sensitive implementation, and iteration across the full product surface.',
		technologies: 'TypeScript · React Native · Astro · Svelte'
	},
	{
		title: 'Backend Systems',
		description:
			'Domain modelling, event-driven workflows, APIs, relational data, integrations, and operational reliability.',
		technologies: 'TypeScript · PostgreSQL · Supabase · Python'
	},
	{
		title: 'Infrastructure',
		description:
			'Cloud deployment, CI/CD, observability, automation, and production-oriented development workflows.',
		technologies: 'Cloudflare · Docker · GitHub Actions · Vercel'
	},
	{
		title: 'Systems Exploration',
		description:
			'Rust, networking, storage engines, protocols, and lower-level engineering experiments.',
		technologies: 'Rust · TCP · MVCC · WASM'
	}
] as const;

/** Current engineering topics kept short so the section stays easy to update. */
export const currentFocus = [
	'Building event-driven product workflows',
	'Refining mobile product interfaces',
	'Exploring privacy-preserving distributed systems',
	'Writing more Rust'
] as const;
