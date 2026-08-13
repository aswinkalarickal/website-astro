# aswink.in

Source for [aswink.in](https://aswink.in) — a personal site and blog built with [Astro](https://astro.build), [Tailwind CSS](https://tailwindcss.com), and Astro Content Collections.

## Project Structure

```text
/
├── public/                  # static assets (favicons, robots.txt, ...)
├── src/
│   ├── components/          # Nav, Footer, ThemeToggle, BackToTop, ...
│   ├── content/
│   │   └── blog/            # blog posts (*.md)
│   ├── content.config.ts    # `blog` collection schema
│   ├── layouts/              # BaseLayout, BlogPostLayout
│   ├── lib/                  # e.g. grains.ts (phyllotaxis dot-scatter)
│   ├── pages/                # routes: /, /about, /blog, /blog/[...slug]
│   └── styles/                # global.css (Tailwind theme tokens)
└── astro.config.mjs
```

Blog posts are Markdown files in `src/content/blog/`, validated against the Zod schema in `src/content.config.ts` (`title`, `description`, `pubDate`, optional `updatedDate`/`draft`).

## Commands

Package manager is **npm**. All commands run from the project root:

| Command             | Action                                          |
| :------------------- | :----------------------------------------------- |
| `npm install`         | Install dependencies                             |
| `npm run dev`          | Start local dev server at `localhost:4321`       |
| `npm run build`        | Build the production site to `./dist/`           |
| `npm run preview`      | Preview the production build locally             |
| `npm run lint`         | Lint with ESLint                                 |
| `npm run format`       | Format with Prettier                             |
| `npm run astro ...`    | Run Astro CLI commands (e.g. `astro check`)      |

During development, prefer running the dev server in background mode so it doesn't block the terminal:

```sh
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Stack

- **Astro** — static site generation, Content Layer API for the blog collection
- **Tailwind CSS v4** — theme tokens defined in `src/styles/global.css`, manual light/dark toggle (not just `prefers-color-scheme`)
- **Self-hosted fonts** — Space Grotesk (display), Inter (body), JetBrains Mono (code) via `@fontsource-variable/*`
- **@astrojs/sitemap** — sitemap generation at build time
- Hosted on **Vercel**, auto-deployed from `main`

## Learn more

- [Astro documentation](https://docs.astro.build)
