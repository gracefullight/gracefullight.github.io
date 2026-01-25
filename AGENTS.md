# Repository Guidelines

## Project Structure & Module Organization

- `docusaurus.config.ts` and `sidebars.ts`: Site configuration and docs/blog sidebars.
- `src/`: App code.
  - `pages/`: Custom React pages (e.g., `src/pages/image-to-pdf.tsx`).
  - `components/`, `theme/`, `utils/`: Reusable UI and helpers (tests live next to code, e.g., `*.test.ts`).
- `blog/`: Markdown blog posts with date-based folders.
- `static/`: Public assets served at site root.
- `config/`: Tooling configs (Vitest, commitlint, lint-staged).
- `.docusaurus/`, `build/` or `dist/`: Generated output. Do not edit.

## Build, Test, and Development Commands

- `bun dev`: Start Docusaurus local dev server.
- `bun run build`: Production build.
- `bun run serve`: Preview a production build locally.
- `bun run test` / `bun run test:ui`: Run unit tests (Vitest) / open Vitest UI.
- `bun typecheck`: TypeScript project type checks.
- `bun format` / `bun format:check`: Auto-format / verify formatting (Biome).
- `bun lint`: Auto-fix lint issues via Biome rules.
- `bun deploy`: Deploy via Docusaurus (GitHub Pages).

## Coding Style & Naming Conventions

- Language: TypeScript + React 19.
- Formatting/Linting: Biome enforces 2-space indent, LF, 80 cols, double quotes, sorted imports, and common correctness/style rules. Run `bun format` and `bun lint`.
- Filenames: Prefer `kebab-case` (Biome rule). Framework overrides are allowed where needed (e.g., Docusaurus theme components, `index.tsx`).
- Patterns: Top-level hooks only; avoid unused vars/imports; prefer object spread and const assertions.

## Testing Guidelines

- Framework: Vitest + React Testing Library (`config/vitest.setup.ts`).
- Location & names: Co-locate tests with code using `*.test.ts[x]` (e.g., `src/utils/png.test.ts`).
- Run: `bun run test` (use `bun run test:ui` for interactive mode).
- Scope: Unit-test utilities and component behavior; prefer user-centric assertions via Testing Library.

## Commit & Pull Request Guidelines

- Commits: Conventional Commits enforced by commitlint; devmoji assists (`.husky/prepare-commit-msg`). Example: `feat: add image-to-pdf page`.
- Pre-commit: `lint-staged` runs Biome format/lint on changed files.
- PRs: Provide clear description, link issues, include screenshots for UI changes, and note any config changes.
- Before opening PR: `bun run typecheck && bun run test && bun run format:check`.

## Environment & Tooling

- Node `24`, bun `1`. Install deps with `bun i`.
- Do not commit generated folders (`.docusaurus`, `build`, `dist`). Avoid secrets in config or content.
