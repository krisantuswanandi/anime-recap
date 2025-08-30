# AGENTS.md

## Framework Versions

- **Nuxt**: ^4.0.1 (compatibilityDate: 2025-07-15)
- **Nuxt Content**: 3.6.3 (latest v3)
- **Vue**: ^3.5.18
- **TypeScript**: ^5.6.3
- **Nuxt UI**: 3.3.0

## Build/Lint/Test Commands

- `bun run build` - Build the Nuxt application for production
- `bun run dev` - Start development server
- `bun run generate` - Generate static site
- `bun run preview` - Preview built application
- `bunx eslint .` - Lint all files
- `bunx eslint . --fix` - Lint and auto-fix issues
- No specific test commands found (no test framework configured)

## Code Style Guidelines

- **Framework**: Nuxt 4 with Vue 3, TypeScript, and Tailwind CSS
- **Package Manager**: Bun (use `bun` instead of `npm`)
- **Imports**: ES modules only (`type: "module"` in package.json)
- **TypeScript**: Strict mode enabled, use proper types
- **Vue**: Single File Components (.vue), Composition API preferred
- **Naming**: camelCase for variables/functions, PascalCase for components
- **ESLint**: @nuxt/eslint module configured for linting
- **Config**: Use `nuxt.config.ts` for Nuxt configuration
- **Modules**: @nuxt/content, @nuxt/ui, @nuxt/image, @nuxt/scripts, @vueuse/nuxt, @nuxt/eslint enabled
- **Tailwind**: Tailwind CSS v4 syntax is used via `@import "tailwindcss"` in `app/assets/css/main.css`

## Dark Mode Implementation

- **Theme System**: Uses Nuxt UI's built-in `useColorMode()` composable
- **Theme Toggle**: Located in `ThemeToggle.vue` component with sun/moon icons
- **CSS Classes**: All components use `dark:` Tailwind variants for proper theming
- **Required Patterns**:
  - Background: `bg-white dark:bg-gray-900` (main), `bg-white dark:bg-gray-800` (cards)
  - Text: `text-gray-900 dark:text-white` (headings), `text-gray-600 dark:text-gray-300` (body)
  - Borders: `border-gray-200 dark:border-gray-700`
  - Links: `text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300`
  - Form inputs: Include `dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400`
- **Persistence**: Theme preference automatically saved via Nuxt UI

## Nuxt 4 Specific Guidelines

- **Directory Structure**: Use `/app` directory for pages, components, layouts
- **Content**: Keep `/content` directory at root level (not in `/app`)
- **Components**: Auto-imported from `/app/components`
- **Pages**: Located in `/app/pages` with file-based routing
- **Home Page Sections**: `RecentlyAired.vue` and `AllAnime.vue` components encapsulate the homepage sections. Prefer extracting sizable page sections into dedicated components.

## Nuxt Content v3 Guidelines

- **Configuration**: Requires `content.config.ts` with collection definitions
- **Queries**: Use `queryCollection('collectionName')` instead of `queryContent()`
- **Collections**: Defined in `content.config.ts`:
  - `episodes`: `anime/**/episode/*.md` with schema `{ airedDate: string; episode: number }`
  - `animes`: `anime/**/index.md` with schema `{ season?: string; status?: string; startDate: string; endDate?: string; myanimelistId?: string; anilistId?: string; cover?: string }`
- **Methods used in project**:
  - `.order(field, direction)` e.g. `order('airedDate', 'DESC')`
  - `.limit(n)` for pagination
  - `.path(path)` to target a specific document
  - `.first()` instead of `.findOne()` and `.all()` instead of `.find()`
- **Example Queries**:
  - Recently aired episodes: `await queryCollection('episodes').order('airedDate', 'DESC').limit(5).all()`
  - Anime details by id: `await queryCollection('animes').path(`/anime/${id}`).first()`

## Important Guidelines

- **AGENTS.md Maintenance**: ALWAYS update this file when making changes to project structure, adding new features, changing conventions, or establishing new patterns. This ensures all future assistance follows the latest project standards.
- **Development Server**: NEVER kill the "nuxt dev" process - the user keeps it running continuously. Only start it if testing is needed and it's not already running.
- **Compatibility**: Nuxt `compatibilityDate` is set to `2025-07-15` in `nuxt.config.ts`

## Notes

- No test framework configured - add vitest or similar if testing is needed
- Build succeeds with some warnings about sharp binaries and sourcemaps
- No existing Cursor or Copilot rules found
- Content v3 requires collection-based approach, not direct file queries
- Data fetching utilities: TanStack Query is available via `app/plugins/vue-query.ts` for external APIs
