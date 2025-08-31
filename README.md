# Anime Recap

A Nuxt 4 static site for anime summaries and episode recaps powered by Nuxt Content v3, Nuxt UI, and Bun.

## Features

- Nuxt 4 + Vue 3 + TypeScript (strict)
- Content v3 collections: `animes` and `episodes`
- Nuxt UI + Tailwind CSS v4 with dark mode via `useColorMode()`
- Image optimization with `@nuxt/image`
- Data fetching helpers with TanStack Query (Anilist/Jikan composables)
- Bun as the package manager

## Quick start

Prerequisites: Bun installed (https://bun.sh)

Install deps:

```bash
bun install
```

Dev server (http://localhost:3000):

```bash
bun run dev
```

Build / preview:

```bash
bun run build
bun run preview
```

Static generate:

```bash
bun run generate
```

Lint:

```bash
bunx eslint .
# or to auto-fix
bunx eslint . --fix
```

## Query examples (Nuxt Content v3)

```ts
// Recently aired episodes
const episodes = await queryCollection('episodes')
	.order('airedDate', 'DESC')
	.limit(5)
	.all()

// Anime details by id (folder name)
const anime = await queryCollection('animes')
	.path(`/anime/60489`)
	.first()
```

## Project layout

- App code in `/app` (Nuxt 4 directory): pages, components, layouts
- Content in `/content` (Nuxt Content v3)
- Global styles: `app/assets/css/main.css` (Tailwind v4 via `@import "tailwindcss"`)
- Theme toggle: `app/components/ThemeToggle.vue`
- Useful composables: `app/composables/*` (Anilist/Jikan helpers)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, content conventions, and PR guidelines.
