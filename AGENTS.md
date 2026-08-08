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

## Design System

- Theme tokens (`--color-canvas`, `--color-ink`, `--color-muted`, `--color-line`) are defined in `src/styles/global.css`'s `@theme` block (light values) and re-defined inside a `.dark { … }` block (dark values) — every utility built from them (`bg-canvas`, `text-ink`, `text-muted`, `border-line`) flips automatically. `border-line` is deliberately low-opacity (~0.14) for the barely-visible dotted section borders.
- Dark mode is a **manual toggle**, not just `prefers-color-scheme`: `@custom-variant dark (&:where(.dark, .dark *));` in `global.css` makes Tailwind's `dark:` variant class-based. `BaseLayout.astro` has a no-flash `is:inline` script in `<head>` that sets the `dark` class from `localStorage.theme`, falling back to system preference. `ThemeToggle.astro` flips the class and persists the choice.
- Fonts are self-hosted via `@fontsource-variable/*` (imported at the top of `global.css`, family names are `"<Name> Variable"`): `font-display` = Space Grotesk (headings, nav/footer labels), `font-sans` = Inter (body text), `font-mono` = JetBrains Mono (code, timestamps).
- `BaseLayout`'s `<main>` is intentionally generic/full-bleed (`flex flex-1 flex-col`) — pages opt into a constrained width themselves rather than `BaseLayout` imposing one. `BlogPostLayout.astro` has a full-bleed title section (dotted bottom border) followed by a full-bleed `px-6 py-12 md:py-16` wrapper whose _inner_ `<article>` carries `mx-auto w-full max-w-2xl`, for a readable line length. The home page and blog index are both full-bleed edge-to-edge throughout, matching the header/footer.
- Width-constrained-section gotcha: padding must be applied to the full-width outer element _before_ an inner `mx-auto max-w-2xl` box centers itself — never put the horizontal padding on the already-centered box itself. Padding-then-center and center-then-padding compute different left offsets on wide viewports (the difference is exactly the padding value), which once caused the blog post's title box and article body to visibly misalign. Every width-constrained section on this site (title boxes, `BlogPostLayout`'s article wrapper) follows the "pad the outer element, center a bare `max-w-2xl` box with no padding of its own inside it" pattern — match it exactly for any new section.
- Tailwind's preflight sets `cursor: default` on `<button>` — add `cursor-pointer` explicitly on any clickable button (see `ThemeToggle.astro`).
- Stacking gotcha: an `absolute`-positioned element always paints above `static` in-flow siblings regardless of DOM order. To put decorative absolutely-positioned content (e.g. a title box's dot field) _behind_ real content, the real content needs its own `relative` (or other positioned) wrapper — see the `relative z-10` wrapper in `src/pages/index.astro` or `BlogPostLayout.astro`.
- `src/lib/grains.ts` exports `phyllotaxis()`, a golden-angle point scatterer used for the site's decorative dot fields. The home hero uses it for two depth layers driven by a `pointermove` parallax script (`.parallax-layer` + `data-depth`, see `src/pages/index.astro`); other title boxes (blog index, blog post) use a single static layer with no script at all. Default to the static version unless a page specifically calls for the parallax motion.
- **Every full-bleed "title box"** (dotted-bordered section that opens a page — home hero, blog index, blog post) gets the `phyllotaxis()` dot-scatter accent. This was missed once when `BlogPostLayout.astro` was redesigned and had to be added back after the fact — when adding a new title box, add the grains along with it rather than as an afterthought.
- Recurring pattern for a "grid of boxes" (nav, blog post cards): give every cell `border-b border-dotted border-line`, and add the internal column divider with Tailwind's `odd:`/`even:` nth-child variants (e.g. `odd:sm:border-r` for a 2-column grid) rather than a wrapping border — this avoids doubled-up lines between adjacent boxes. See the blog post grid in `src/pages/blog/index.astro`.
- Long-form content (rendered Markdown via `<Content />`/`<slot />`) must be wrapped in `class="prose"` — Tailwind's preflight zeroes out margin/padding on every element, so without `@tailwindcss/typography` (`@plugin "@tailwindcss/typography";` in `global.css`) prose content renders with no paragraph spacing, no list markers, nothing. The plugin's `--tw-prose-*` color variables are remapped to the site's theme tokens directly in `global.css` (not via a JS config), so `prose` content follows light/dark automatically without `prose-invert`. Use the `prose-headings:font-display prose-code:font-mono` modifiers to keep it on-brand; the `<article>` itself carries `mx-auto w-full max-w-2xl` (not `max-w-none`) per the width-constrained-section pattern above. See `BlogPostLayout.astro`.
- Two title-box variants, pick by page role: **top-level pages** (Blog index, About) use the centered treatment — `text-center`, uppercase `h1`, symmetric `py-16 sm:py-20 md:py-24` (see `src/pages/blog/index.astro`, `src/pages/about.astro`, which are near-identical). **Detail pages** (an individual blog post) use the left-aligned treatment with a `← Blog` back-link above the title (see `BlogPostLayout.astro`). Both variants still get the `phyllotaxis()` grains per the rule above.
- The nav's middle box holds top-level page links (`About`, `Blog`) as siblings with `gap-6` between them, all styled identically (`font-display tracking-[2px] text-muted uppercase hover:text-ink`) — add new top-level pages here, in the same box, not a new one.
- Don't publish personal contact info (email, phone, etc.) on the site unless the user explicitly gives that exact value for that purpose — e.g. the About page's `mailto:` link uses `mail@aswink.in` because the user gave it directly, not the personal Gmail address known from this environment's context.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
