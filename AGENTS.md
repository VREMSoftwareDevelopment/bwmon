# AGENTS.md - AI Coding Agent Instructions

> Universal instructions for AI coding agents (Copilot, Claude, Cursor, Codex, etc.)

See [README.md](README.md) for project overview, installation, and commands.
See [react/README.md](react/README.md) for frontend development commands.
See [server/README.md](server/README.md) for server scripts documentation.

## Critical Requirements

### Testing
- **100% code coverage is mandatory** - enforced by Vitest (V8 engine coverage)
- Coverage exceptions: `index.tsx`, `vite-env.d.ts`, all `index.ts` barrel files, `__mocks__/`, `e2e/`
- Mutation test threshold: 80%
- Co-locate unit tests with source files (`*.test.ts` or `*.test.tsx`)
- Use `MemoryRouter` (not `BrowserRouter`) for component testing
- Use Testing Library (`@testing-library/react`, `user-event`)
- E2E tests use `data-testid` attributes for element selection

### Code Style
- **4-space indentation** (configured in ESLint and Prettier)
- **Single quotes** for strings
- **Max complexity: 5** per function (ESLint warning)
- **TypeScript only**: no `.js`/`.jsx` under `src/` or `e2e/` (enforced by `npm run scan` in CI)
- **TypeScript strict mode** with `noUncheckedIndexedAccess`; no `any`, no `@ts-ignore`, no non-null `!` in production code
- Props are typed with TypeScript interfaces; no PropTypes
- Run `npm run pretty` to format before committing (no git hook runs it)
- All source files include the Apache 2.0 license header, except `index.tsx` and the `index.ts` barrel files

### Import Aliases (Required)
Always use path aliases instead of relative imports:
```typescript
import Component from '@components/Component';
import { useHook } from '@hooks/UseHook';
import { service } from '@services/Service';
import { util } from '@utils/Util';
```

Available aliases: `@components`, `@hooks`, `@features`, `@services`, `@utils`

## Tech Stack

### Frontend (react/)
- **Language**: TypeScript 6 (strict)
- **Framework**: React, functional components only (no class components)
- **Build**: Vite (NOT webpack)
- **UI Library**: Material UI (MUI), ApexCharts
- **Styling**: Emotion CSS-in-JS
- **Routing**: React Router with HashRouter
- **PWA**: vite-plugin-pwa (Workbox); precache for app shell, NetworkFirst for usage.db
- **DateTime**: Luxon (NOT moment.js)
- **Testing**: Vitest (unit), Playwright (E2E), Stryker (mutation)
- **Code Quality**: ESLint (flat config), `npm run typecheck`, Prettier, jscpd (`npm run duplication`), better-npm-audit (`npm run audit`), `npm run scan` (scan-suspicious.js; also fails on any `.js`/`.jsx` under `src/` or `e2e/`)

### Backend (server/)
- Shell scripts (sh/bash) for AsusWRT-Merlin routers

## Code Patterns

### Components
- Use `CellInfo<T>` generic class for table column metadata

### State Management
- React hooks (`useState`, `useEffect`) - no Redux or Context
- Custom hooks abstract data fetching logic and declare explicit return types
- Simple props drilling pattern

### Services & Data
- Class-based service pattern (singleton instances)
- 10-minute caching in `API.Store`
- Fetch API with async/await
- IP addresses stored as 32-bit integers (use `toIPv4`/`fromIPv4` for conversion)
- Data format: CSV-like with fields: year, month, IP, MAC, user, download, upload, total, firstSeen, lastSeen

### Error Handling
- `react-error-boundary` for global error catching
- `ErrorDisplay` component shows error details
- Catch blocks narrow with `instanceof Error`

## File Locations

```
react/src/
  components/     # Reusable UI components (main, navigation, table, graph, inputs, messages, loading)
    navigation/   # Navigation, BWMonRoutes, MenuItem.ts (shared menu item interface)
  features/       # Feature modules with colocated components and hooks
    byuser/       # User usage feature (UsageByUser, UsageByUserGraph, UseUsageByUser, UseUsageByUserGraph)
    bymonth/      # Monthly usage feature
    byyear/       # Yearly usage feature
  hooks/          # Shared custom hooks - prefix with "Use" (e.g., UseYearMonth.ts)
  services/       # Data layer (API.ts, Usage.ts, Data.ts, types.ts)
  utils/          # Utilities (ConversionUtils.ts, SortUtils.ts)
  menu/           # Menu routing configuration (Menu.tsx)
  vite-env.d.ts   # Vite client types and import.meta.env declarations
react/e2e/        # Playwright E2E tests
server/           # Router shell scripts
scripts/          # release.sh - builds the router install package
codecov.yml       # Codecov report layout
```

## Build Notes

- Run `npm run typecheck` (`tsc --noEmit`); CI runs it after lint
- Base path: `/bwmon/`
- Manual chunk splitting for MUI and ApexCharts (configured in Vite)
- Reports (coverage, mutation, duplication, bundle visualizer) are written to `react/reports/`
