# Copilot Instructions for AI Coding Agents

## Project Overview

-   **bwmon** is a bandwidth monitoring solution for AsusWRT-Merlin routers, combining shell scripts for data collection and a React-based web UI for visualization.
-   The project is split into two main parts:
    -   `server/`: Shell scripts and install logic for router-side data collection.
    -   `react/`: Vite-powered React app for frontend visualization and reporting.

## Key Workflows

### Frontend (React)

-   **Install dependencies:**
    ```bash
    cd react
    npm install
    ```
-   **Development server:**
    ```bash
    npm start
    # Opens http://localhost:3000
    ```
-   **Production build:**
    ```bash
    npm run build
    # Output in react/build/
    ```
-   **Testing:**
    -   Unit/UI: `npm test` (interactive), `npm run test:once` (single run)
    -   Coverage: `npm run test:coverage` → see `reports/coverage/lcov-report/index.html`
    -   E2E: `npm run test:e2e` → see `reports/playwright/html/index.html`
    -   Mutation: `npm run test:mutation` → see `reports/mutation/mutation.html`
-   **Lint/Format/Audit:**
    -   Lint: `npm run lint`
    -   Format: `npm run pretty`
    -   Audit: `npm run audit`

### Backend (Server Scripts)

-   **Install on router:**
    -   SSH to router, mount storage, then:
        ```bash
        cd /mnt/<mounted_name>/
        mkdir bwmon
        cd bwmon
        wget https://github.com/VREMSoftwareDevelopment/bwmon/releases/download/v3.1.5/bwmon.tar.gz
        tar -xzvf bwmon.tar.gz
        chmod +x server/install.sh
        ./server/install.sh
        ```
    -   Access UI at `http://<router_ip>:<lighttpd_port>/bwmon/index.html`

## Project Structure & Patterns

-   **Frontend code:**
    -   Located in `react/src/` (components, hooks, pages, services, utils)
    -   Uses Vite, Babel, ESLint, Playwright, Stryker, and Jest (see config files in `react/`)
    -   Reports and coverage output to `react/reports/`
-   **Backend scripts:**
    -   Located in `server/` (install/uninstall scripts, service files)
    -   Designed for AsusWRT-Merlin environment
-   **Release scripts:**
    -   Located in `scripts/` (e.g., `release.sh`)

## Conventions & Integration

-   **React UI follows functional component and custom hook patterns.**
-   **Testing:**
    -   E2E tests in `react/e2e/`
    -   Unit tests colocated with source (e.g., `src/components/.../*.test.js`)
-   **Reports:**
    -   All test and analysis reports are in `react/reports/` and published online.
-   **Versioning:**
    -   Use `npm version <version>` and git tags for releases.
-   **External dependencies:**
    -   Node.js, Vite, Playwright, Stryker, ESLint, Babel, React, ApexCharts, MUI, etc.

## Examples

-   To add a new UI feature, create a component in `react/src/components/` and a corresponding test in the same folder.
-   To add a new server-side feature, update scripts in `server/` and document changes in the main `README.md`.

## References

-   Main documentation: [`README.md`](../../README.md)
-   React UI documentation: [`react/README.md`](../react/README.md)
-   Example reports: [`react/reports/coverage/lcov-report/index.html`](../react/reports/coverage/lcov-report/index.html)

---

**For questions or unclear conventions, review the README files or open an issue.**
