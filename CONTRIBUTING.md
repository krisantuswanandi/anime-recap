# Contributing

Thanks for your interest in improving Anime Recap! This guide explains how to set up the project, follow code/content conventions, and open good pull requests.

## Quick start

- Prerequisite: Bun installed (https://bun.sh)
- Install deps: `bun install`
- Start dev server (http://localhost:3000): `bun run dev`
- Lint: `bunx eslint .` (auto-fix: `bunx eslint . --fix`)
- Build: `bun run build` • Preview: `bun run preview` • Static: `bun run generate`

Project stack and conventions live in `AGENTS.md` (Nuxt 4 + Vue 3 + TS strict, Nuxt Content v3, Tailwind v4, Nuxt UI, Bun).

## Code style and patterns

- Framework: Nuxt 4 with Vue 3 Composition API and TypeScript (strict).
- Directory structure: app code in `/app` (pages/components), content in `/content`.
- Imports: ESM only (package.json `type: module`).
- Linting: ESLint via `@nuxt/eslint`. Fix issues before submitting a PR.
- Tailwind v4: global styles in `app/assets/css/main.css` via `@import "tailwindcss"`.
- Dark mode: use Nuxt UI color mode. Follow these patterns:
	- Background: `bg-white dark:bg-gray-900` (main), `bg-white dark:bg-gray-800` (cards)
	- Text: `text-gray-900 dark:text-white` (headings), `text-gray-600 dark:text-gray-300` (body)
	- Borders: `border-gray-200 dark:border-gray-700`
	- Links: `text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300`
	- Form inputs: `dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`
- Components: auto-imported from `/app/components`. Use PascalCase for components, camelCase for vars.
- Data fetching: prefer composables + TanStack Query (see `app/plugins/vue-query.ts` and existing composables in `app/composables/*`).

## Content contributions (Recaps & metadata)

We use collection-based content defined in `content.config.ts`:

- `animes`: source `anime/**/index.md`
- `episodes`: source `anime/**/episode/*.md`

Folder layout for a new anime. Important:

- Anime folder name (ID) MUST be the MyAnimeList ID (numeric)
- Episode files MUST be zero-padded to 4 digits (e.g., `0001.md`, `0123.md`)

```
content/
	anime/
		60489/
			index.md           # collection: animes
			episode/
				0001.md          # collection: episodes (zero-padded to 4 digits)
				0002.md
```

Front matter schema (strictly validated):

- animes: `{ season?: string; status?: string; startDate: string; endDate?: string; myanimelistId?: string; anilistId?: string; cover?: string }`
- episodes: `{ airedDate: string; episode: number }`

Examples (copy and adapt):

`content/anime/60489/index.md`

```
---
season: "Spring 2025"
status: "Airing"
startDate: "2025-04-06"
anilistId: "60489"
cover: "/assets/anime/the-water-magician/cover.jpg"
---

# Series Title

Intro or synopsis here.
```

`content/anime/60489/episode/0001.md`

```
---
airedDate: "2025-04-06"
episode: 1
---

# Episode 1 — Subtitle

Recap content...
```

Assets: place images under `public/assets/anime/<slug>/...` and reference them with absolute paths like `/assets/anime/<slug>/file.jpg`.

### Metadata requirements

When adding content, ensure these fields are filled correctly:

- Anime (`content/anime/<malId>/index.md`)
	- Required: `startDate`
	- Optional: `season`, `status`, `endDate`, `myanimelistId`, `anilistId`, `cover`
	- Notes:
		- Folder name must equal the MyAnimeList ID (e.g., `60489`)
		- If available, set `myanimelistId` and `anilistId` as strings
		- `cover` should be an absolute path under `/assets/anime/<slug>/...`
- Episode (`content/anime/<malId>/episode/XXXX.md`)
	- Required: `airedDate`, `episode` (number)
	- File name: 4-digit zero-padded (e.g., `0007.md` for episode 7)

### How to add a new recap

1) Identify the MyAnimeList ID (MAL ID) for the anime.
2) Create folder `content/anime/<MAL_ID>/` if it doesn’t exist.
3) Add or update `index.md` with anime metadata (see examples above).
4) Create the episode file under `content/anime/<MAL_ID>/episode/` using a 4-digit name:
	 - Episode 1 -> `0001.md`
	 - Episode 12 -> `0012.md`
	 - Episode 123 -> `0123.md`
5) Fill front matter:
	 - `airedDate: "YYYY-MM-DD"`
	 - `episode: <number>`
6) Write the recap content and title (e.g., `# Episode 12 — Subtitle`).
7) If using images, place them in `public/assets/anime/<slug>/...` and reference via absolute paths.
8) Build locally to validate schemas: `bun run build` (or open the dev server to catch content errors).

### Content PR checklist

- [ ] Anime folder uses MAL ID (numeric) for its name
- [ ] Episode filenames are 4-digit zero-padded (e.g., `0001.md`)
- [ ] Anime `index.md` contains required metadata; optional IDs set when available
- [ ] Episode front matter includes `airedDate` and numeric `episode`
- [ ] Asset paths are under `/assets/anime/<slug>/...` and referenced absolutely
- [ ] Content builds locally (schema validation passes)

## Query usage (for code changes)

Use Nuxt Content v3 collection queries (see `AGENTS.md`):

```ts
// Recently aired episodes
await queryCollection('episodes').order('airedDate', 'DESC').limit(5).all()

// Anime details by id (folder name)
await queryCollection('animes').path(`/anime/60489`).first()
```

Use `.first()` instead of `.findOne()` and `.all()` instead of `.find()`.

## Development workflow (for code changes)

1) Create a branch from `main`: `feature/<short-title>` or `fix/<short-title>`
2) Make focused changes with TypeScript types and accessibility in mind
3) Run lint and verify build locally:
	 - `bunx eslint .`
	 - `bun run build`
4) Keep commits small and descriptive (imperative mood)
5) Open a Pull Request

### Pull Request checklist

- [ ] Changes scoped and documented (comments or README/content updates where relevant)
- [ ] Lints pass locally (`bunx eslint .`)
- [ ] Builds locally (`bun run build`)
- [ ] UI follows dark mode and Tailwind patterns above (if applicable)
- [ ] Content follows folder + front matter schema (if applicable)

## Issues and discussions

- Use Issues for bugs and small feature requests. Include reproduction steps and environment.
- Link PRs to Issues when possible.

## Notes

- See `AGENTS.md` for exact framework versions, commands, and established patterns.
- No test framework is configured yet. If you add tests, prefer Vitest and include minimal setup in the PR.

