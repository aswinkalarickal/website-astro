---
title: "Setting Up This Site With Astro"
description: "A placeholder post about the tooling behind this site: Astro, Tailwind, and Content Collections."
pubDate: 2026-02-02
updatedDate: 2026-02-10
---

This site is built with [Astro](https://astro.build), styled with Tailwind CSS,
and its blog posts are authored in Markdown using Astro's Content Layer API.

Each post lives in `src/content/blog/` as a `.md` file with frontmatter for
`title`, `description`, and `pubDate`. The schema in `src/content.config.ts`
validates that frontmatter at build time, so a typo in a date or a missing
title fails fast instead of breaking silently in production.
