# AGENTS.md

## Framework Versions

- **Nuxt**: Version 4.0.2 (latest)
- **Nuxt Content**: Version 3.6.3 (latest v3)
- **Vue**: Version 3.5.18
- **TypeScript**: Version 5.6.3

## Build/Lint/Test Commands

- `bun run build` - Build the Nuxt application for production
- `bun run dev` - Start development server
- `bun run generate` - Generate static site
- `bun run preview` - Preview built application
- `npx eslint .` - Lint all files
- `npx eslint . --fix` - Lint and auto-fix issues
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
- **Modules**: @nuxt/content, @nuxt/ui, @nuxt/image, @nuxt/scripts enabled

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

## Nuxt Content v3 Guidelines

- **Configuration**: Requires `content.config.ts` with collection definitions
- **Queries**: Use `queryCollection('collectionName')` instead of `queryContent()`
- **Methods**: Use `.all()` instead of `.find()`, `.first()` instead of `.findOne()`
- **Collections**: Define collections in `content.config.ts` with sources and schemas
- **Example Query**: `await queryCollection('anime').where({ episode: { $exists: true } }).sort({ airedDate: -1 }).all()`

## Important Guidelines

- **AGENTS.md Maintenance**: ALWAYS update this file when making changes to project structure, adding new features, changing conventions, or establishing new patterns. This ensures all future assistance follows the latest project standards.
- **Development Server**: NEVER kill the "nuxt dev" process - the user keeps it running continuously. Only start it if testing is needed and it's not already running.

## Notes

- No test framework configured - add vitest or similar if testing is needed
- Build succeeds with some warnings about sharp binaries and sourcemaps
- No existing Cursor or Copilot rules found
- Content v3 requires collection-based approach, not direct file queries
