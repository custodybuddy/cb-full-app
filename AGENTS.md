# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the React + TypeScript app (entry: `src/index.tsx`, shell: `src/App.tsx`).
- Shared UI lives in `src/components/`; feature pages/tools (incident report, email buddy, case analysis, support calculator) live in `src/features/*` with their own hooks and `pages/`.
- Legal references remain in `src/domain/legalRefs/` (`data.ts` for mappings, `utils.ts` for parsing helpers) and memoized data/constants sit alongside their feature modules.
- Static assets go in `public/`. Build output lands in `dist/`. Tests live in `tests/`.
- Domain data tables remain in `src/data/` (e.g., jurisdictions, calculator baselines).

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server.
- `npm run build`: produce a production build in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run test`: run Vitest once in CI mode.
- `RUN_LIVE_AI_TESTS=1 npm run test -- services/llmService.test.ts`: run live LLM integration tests (requires API keys and network access).
- `npm run lint`: lint `src/` and `tests/` with ESLint.
- Run lint or tests before UI work when possible; prioritize fixing regressions in landing page interactions (Hero, Navbar, Footer) before adding new features.

## Coding Style & Naming Conventions
- TypeScript + React (ES modules). Use 4-space indentation and single quotes; keep semicolons consistent with existing files.
- Components use PascalCase filenames (`src/components/Header.tsx`), hooks use `useX` naming (e.g., `useIncidentAnalysis`, `useEmailBuddy`, `useCaseAnalysis`), and feature folders use kebab-case (`src/features/case-analysis/`).
- Use the `@/` alias for `src/` imports when convenient, and memoize shared strings/options in module-level constants rather than inline literals.

## Testing Guidelines
- Test runner: Vitest; UI tests use Testing Library where applicable.
- Place specs in `tests/` and name them `*.test.ts` or `*.test.tsx`.
- No explicit coverage thresholds are defined; keep tests focused on behaviors and critical regressions.

## Commit & Pull Request Guidelines
- Commit history uses short, lowercase, imperative messages (e.g., “cleanup”, “updates”). Follow that style unless otherwise requested.
- PRs should include a brief summary, testing notes, and screenshots for UI changes. Link relevant issues when available.

## Configuration Notes
- Vite env vars must be prefixed with `VITE_`. Do not commit secrets; use local `.env` files.
- LLM-powered features (`analyzeIncident`, `analyzeEmailBuddy`, `analyzeCaseDocuments`) run client-side for dev/testing; rotate keys and proxy through a server for production.
- Hero is a multi-layered composition (Three.js background, scroll-triggered staggered animations, parallax icons). Keep the “Z-axis” depth intact and maintain readability against the dark noise/gradient overlays when modifying.
- Navbar mobile menu uses a sliding panel with a fading overlay—preserve smooth transitions if altering navigation.
- Footer now includes legal terminology lookup; avoid reintroducing removed “Find legal aid in your province” section.
