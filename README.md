# Portfolio Website

A modern portfolio website built with Astro and Svelte, featuring a vintage-inspired design with smooth animations and a focus on performance.

## 🚀 Tech Stack

- **[Astro](https://astro.build)** - Static site generator with SSR support
- **[Svelte](https://svelte.dev)** - Component framework
- **[TailwindCSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org)** - Type safety
- **Node.js** - Server-side rendering adapter

## 📁 Project Structure

```
/
├── public/              # Static assets (favicons, images)
├── src/
│   ├── components/     # Svelte components
│   │   ├── Sections/   # Page sections (AboutMe, Projects, ContactOptions)
│   │   ├── Card.svelte
│   │   ├── ContactForm.svelte
│   │   ├── Navbar.svelte
│   │   ├── Portfolio.svelte
│   │   ├── VintageBackground.svelte
│   │   └── VintageMountains.svelte
│   ├── layouts/        # Astro layouts
│   ├── pages/          # Astro pages (routes)
│   │   ├── index.astro
│   │   ├── contact.astro
│   │   └── api/
│   └── styles/         # Global styles
└── static/             # Static files (icons, etc.)
```

## 🧞 Commands

All commands are run from the root of the project:

| Command             | Action                                           |
| :------------------ | :----------------------------------------------- |
| `npm install`       | Installs dependencies                            |
| `npm run dev`       | Starts local dev server at `localhost:4321`      |
| `npm run build`     | Build your production site to `./dist/`          |
| `npm run preview`   | Preview your build locally, before deploying     |
| `npm run lint`      | Run ESLint and Prettier checks                   |
| `npm run format`    | Format code with Prettier                        |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 🎨 Features

- **Vintage Design** - Classic, parchment-inspired aesthetic with mountain illustrations
- **Smooth Animations** - Parallax effects and scroll-based animations
- **Responsive Layout** - Mobile-first design that works on all devices
- **Server-Side Rendering** - Fast initial page loads with Astro SSR
- **Contact Form** - Functional contact form with API endpoint
- **Project Showcase** - Dynamic project cards with tags and links

## 🛠️ Development

The project uses Astro's SSR mode with the Node.js adapter. Components are built with Svelte 5 and styled with TailwindCSS.

### Key Components

- `Portfolio.svelte` - Main portfolio page component
- `Navbar.svelte` - Navigation bar with scroll detection
- `VintageBackground.svelte` - Parchment-style background texture
- `VintageMountains.svelte` - Parallax mountain illustrations
- `AboutMe.svelte` - About section with skills and interests
- `Projects.svelte` - Project showcase grid
- `ContactOptions.svelte` - Contact links and social media

## 📝 License

See [LICENSE.txt](LICENSE.txt) for details.
