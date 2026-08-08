## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Package manager is **npm** (not yarn/pnpm) — use `npm run dev`, `npm run build`, `npm run preview`, `npm run lint`, `npm run format`.

`typescript` is pinned to `6.0.3` in devDependencies: `typescript-eslint`/`@typescript-eslint/parser` don't yet support TypeScript 7's native compiler. Don't bump `typescript` past 6.x without confirming typescript-eslint support first, or `npm run lint` will crash.

## Content Collections

- Blog posts live in `src/content/blog/*.md`, defined by the `blog` collection in `src/content.config.ts` using the Content Layer API (`glob()` loader + Zod `schema`).
- Import `z` from `astro/zod`, not `astro:content` — that re-export is deprecated as of Astro 6.
- Schema fields: `title`, `description`, `pubDate` (coerced date), optional `updatedDate`, optional `draft`. Draft posts must stay filtered out of `getCollection('blog', ...)` calls in `src/pages/blog/index.astro` and `src/pages/blog/[...slug].astro`.
- Code fence language identifiers must be valid Shiki grammar names (e.g. `apache`, not `apacheconf`), and must not use `lang:filename` annotations — Shiki doesn't support that syntax and silently falls back to plaintext.

## Design

`BaseLayout`, `BlogPostLayout`, `Nav`, and `Footer` (in `src/layouts/` and `src/components/`) are intentionally minimal placeholders pending a real visual design — don't over-invest in their styling without checking first.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
