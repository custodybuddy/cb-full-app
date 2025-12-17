# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the React + TypeScript app (entry: `src/index.tsx`, shell: `src/App.tsx`).
- UI is split into shared pieces in `src/components/` and feature-owned code in `src/features/` (pages live in `src/features/*/pages`).
- Legal references live in `src/domain/legalRefs/` (`data.ts` for mappings, `utils.ts` for parsing helpers).
- Static assets go in `public/`. Build output lands in `dist/`. Tests live in `tests/`.
- Domain data tables remain in `src/data/` (e.g., jurisdictions, calculator baselines).

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server.
- `npm run build`: produce a production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm test`: run Vitest once in CI mode.
- `npm run lint`: lint `src/` and `tests/` with ESLint.

## Coding Style & Naming Conventions
- TypeScript + React (ES modules). Use 4-space indentation and single quotes; keep semicolons consistent with existing files.
- Components use PascalCase filenames (`src/components/Header.tsx`), hooks use `useX` naming, and feature folders use kebab-case (`src/features/case-analysis/`).
- Use the `@/` alias for `src/` imports when convenient.

## Testing Guidelines
- Test runner: Vitest; UI tests use Testing Library where applicable.
- Place specs in `tests/` and name them `*.test.ts` or `*.test.tsx`.
- No explicit coverage thresholds are defined; keep tests focused on behaviors and critical regressions.

## Commit & Pull Request Guidelines
- Commit history uses short, lowercase, imperative messages (e.g., “cleanup”, “updates”). Follow that style unless otherwise requested.
- PRs should include a brief summary, testing notes, and screenshots for UI changes. Link relevant issues when available.

## Configuration Notes
- Vite env vars must be prefixed with `VITE_`. Do not commit secrets; use local `.env` files.
