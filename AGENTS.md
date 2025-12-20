# AGENTS.md - AI Coding Agent Instructions

> Universal instructions for AI coding agents (Copilot, Claude, Cursor, Codex, etc.)

See [README.md](README.md) for project overview, installation, and commands.
See [react/README.md](react/README.md) for frontend development commands.
See [server/README.md](server/README.md) for server scripts documentation.

## Critical Requirements

### Testing
- **100% code coverage is mandatory** - enforced by Jest
- Coverage exceptions: `index.jsx`, `serviceWorker.js`
- Mutation test threshold: 80%
- Co-locate unit tests with source files (`*.test.js` or `*.test.jsx`)
- Use `MemoryRouter` (not `BrowserRouter`) for component testing
- Use Testing Library (`@testing-library/react`, `user-event`)
- E2E tests use `data-testid` attributes for element selection

### Code Style
- **4-space indentation** (configured in ESLint and Prettier)
- **Single quotes** for strings
- **Max complexity: 5** per function (ESLint enforced)
- Prettier runs automatically on commit via Husky pre-commit hook
- All files include Apache 2.0 license header

### Import Aliases (Required)
Always use path aliases instead of relative imports:
```javascript
import Component from '@components/Component';
import { useHook } from '@hooks/common/UseHook';
import { service } from '@services/Service';
import { util } from '@utils/Util';
```

Available aliases: `@components`, `@hooks`, `@pages`, `@services`, `@utils`

## Tech Stack

### Frontend (react/)
- **Framework**: React 19, functional components only (no class components)
- **Build**: Vite 7 + Babel (NOT webpack)
- **UI Library**: Material UI (MUI) v7, ApexCharts 5
- **Styling**: Emotion CSS-in-JS
- **Routing**: React Router v7 with HashRouter
- **DateTime**: Luxon (NOT moment.js)
- **Testing**: Jest 30 (unit), Playwright (E2E), Stryker (mutation)
- **Code Quality**: ESLint 9 (flat config), Prettier

### Backend (server/)
- Shell scripts (sh/bash) for AsusWRT-Merlin routers

## Code Patterns

### Components
- Use PropTypes for runtime type checking
- Use `CellInfo` class for table column metadata

### State Management
- React hooks (`useState`, `useEffect`) - no Redux or Context
- Custom hooks abstract data fetching logic
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

## File Locations

```
react/src/
  components/     # UI components (main, navigation, table, graph, inputs, messages, loading)
  hooks/          # Custom hooks - prefix with "Use" (e.g., UseYearMonth.js)
  pages/          # Route pages (byuser, bymonth, byyear)
  services/       # Data layer (API.js, Usage.js, Data.js)
  utils/          # Utilities (ConversionUtils, SortUtils)
  menu/           # Menu routing configuration
react/e2e/        # Playwright E2E tests
server/           # Router shell scripts
```

## Build Notes

- Base path: `/bwmon/`
- Manual chunk splitting for MUI and ApexCharts (configured in Vite)
