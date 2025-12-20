# Bandwidth Monitor React UI

This directory contains the React-based user interface for the **bwmon** project. All instructions below apply only to the UI/frontend part. For backend or server-side setup, see the main project README.

This project was bootstrapped with [VITE](https://vite.dev/).

- [Getting Started](https://vite.dev/guide)
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh

## Prerequisites

- [Node.js](https://nodejs.org/) (version 22+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

Install dependencies before running or building the UI:

```bash
npm install
```

## Usage

### Development

Start the Vite development server:

```bash
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

Build the optimized production bundle:

```bash
npm run build
```

The output will be in the `build` folder. To preview the build locally, you can use a static server such as [serve](https://www.npmjs.com/package/serve):

```bash
npm install -g serve
serve build
```

## Testing & Quality

### Run all tests interactively (UI/unit tests)

```bash
npm test
```

### Run all tests once

```bash
npm run test:once
```

### Run all tests with coverage

```bash
npm run test:coverage
```

- Coverage report: [reports/coverage/lcov-report/index.html](reports/coverage/lcov-report/index.html)

### Run Playwright end-to-end tests (UI E2E)

```bash
npm run test:e2e
```

- Playwright report: [reports/playwright/html/index.html](reports/playwright/html/index.html)

### Run mutation tests

```bash
npm run test:mutation
```

- Mutation report: [reports/mutation/mutation.html](reports/mutation/mutation.html)

### Format code

```bash
npm run pretty
```

### Audit for vulnerabilities

```bash
npm run audit
```

### Lint code

```bash
npm run lint
```

## Versioning

Update the UI package version and create a git tag:

```bash
npm version <version number>
```

---

For questions or contributions, please refer to the main project repository or contact the maintainers.
