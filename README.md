# pum.works

Personal portfolio for Michael, built with Astro, Svelte, Tailwind CSS, and TypeScript.

## Structure

```text
src/
├── components/
│   ├── ui/                 # Static Astro UI and system diagrams
│   ├── ContactForm.svelte  # Interactive contact form
│   └── ProjectPreview.astro
├── content/work/           # MDX project case studies
├── layouts/                # Base and case-study layouts
├── pages/                  # Static pages and contact API
└── styles/                 # Design tokens and global styles
```

Astro renders the site structure and case studies. Svelte is limited to the contact form and captcha integration.

## Commands

```sh
bun install
bun run dev
bun run lint
bun run build
bun run generate:og
```

## Deployment

The canonical origin is `https://pum.works`. `vercel.json` redirects the `www` hostname to the apex domain. Deployment is handled by Vercel; local changes should be reviewed before any push or production deploy.
