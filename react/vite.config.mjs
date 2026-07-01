// vite.config.mjs
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    base: '/bwmon/',
    build: {
        outDir: 'build',
        manifest: true,
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules/@mui/icons-material') || id.includes('node_modules/@mui/material')) {
                        return 'mui';
                    }
                    if (id.includes('node_modules/react-apexcharts') || id.includes('node_modules/apexcharts')) {
                        return 'chart';
                    }
                },
            },
        },
    },
    server: {
        port: 3000,
        open: true,
        watch: {
            ignored: ['**/reports/**', '**/stryker*/**'],
        },
    },
    resolve: {
        alias: [
            // Exact-match entries must precede the prefix entries below.
            { find: /^@components$/, replacement: '/src/components/index.js' },
            { find: /^@hooks$/, replacement: '/src/hooks/index.js' },
            { find: /^@services$/, replacement: '/src/services/index.js' },
            { find: /^@utils$/, replacement: '/src/utils/index.js' },
            { find: '@components', replacement: '/src/components' },
            { find: '@features', replacement: '/src/features' },
            { find: '@hooks', replacement: '/src/hooks' },
            { find: '@services', replacement: '/src/services' },
            { find: '@utils', replacement: '/src/utils' },
        ],
    },
    plugins: [
        process.env.VITEST
            ? react({ jsxImportSource: '@emotion/react', babel: false })
            : react({ jsxImportSource: '@emotion/react', babel: { plugins: ['@emotion/babel-plugin'] } }),
        !process.env.VITEST && svgr({ icon: true, include: ['src/**/*.svg'] }),
        !process.env.VITEST && visualizer({ open: false, filename: 'reports/visualizer/stats.html' }),
    ],
    optimizeDeps: {
        include: [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
            'react-transition-group',
            'react-dom',
            'react',
        ],
    },
    test: {
        environment: 'happy-dom',
        globals: true,
        cache: true,
        setupFiles: './vitest.setup.js',
        include: ['src/**/*.test.{js,jsx}'],
        // MUI's ESM does directory imports (react-transition-group) that Node's native resolver
        // rejects; inlining routes them through Vite's resolver. Removing this breaks component tests.
        server: {
            deps: {
                inline: [/@mui\//, /react-transition-group/],
            },
        },
        // Mirror the alias index resolution that Jest's moduleNameMapper provided for bare
        // package-name aliases (e.g. `@services` -> src/services/index.js).
        coverage: {
            provider: 'v8',
            reportsDirectory: 'reports/coverage',
            reporter: ['text', 'html', 'json'],
            include: ['src/**/*.{js,jsx}'],
            exclude: ['src/index.jsx', 'src/serviceWorker.js', '**/index.js', '**/e2e/**', '**/__mocks__/**'],
            thresholds: {
                branches: 100,
                functions: 100,
                lines: 100,
                statements: 100,
            },
        },
    },
});
