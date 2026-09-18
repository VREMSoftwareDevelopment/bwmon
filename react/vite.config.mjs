// vite.config.mjs
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

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
            { find: /^@components$/, replacement: '/src/components/index' },
            { find: /^@hooks$/, replacement: '/src/hooks/index' },
            { find: /^@services$/, replacement: '/src/services/index' },
            { find: /^@utils$/, replacement: '/src/utils/index' },
            { find: /^@test-utils$/, replacement: '/src/test-utils' },
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
        !process.env.VITEST && visualizer({ open: false, filename: 'reports/visualizer/stats.html' }),
        !process.env.VITEST &&
            VitePWA({
                registerType: 'autoUpdate',
                manifestFilename: 'manifest.json',
                includeAssets: ['favicon.ico', 'robots.txt', 'pwa-192x192.png', 'pwa-512x512.png'],
                manifest: {
                    short_name: 'BWMon',
                    name: 'Bandwidth Monitor',
                    icons: [
                        {
                            src: 'favicon.ico',
                            sizes: '64x64 32x32 24x24 16x16',
                            type: 'image/x-icon',
                        },
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png',
                            purpose: 'any maskable',
                        },
                    ],
                    start_url: '/bwmon/',
                    scope: '/bwmon/',
                    display: 'standalone',
                    theme_color: '#000000',
                    background_color: '#ffffff',
                },
                workbox: {
                    globPatterns: ['**/*.{js,css,html,ico,svg,png,woff2}'],
                    globIgnores: ['**/usage.db'],
                    cleanupOutdatedCaches: true,
                    maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
                    runtimeCaching: [
                        {
                            urlPattern: ({ url }) => url.pathname.endsWith('/usage.db'),
                            handler: 'NetworkFirst',
                            options: {
                                cacheName: 'bwmon-usage-db',
                                networkTimeoutSeconds: 5,
                                expiration: { maxEntries: 1 },
                            },
                        },
                    ],
                },
            }),
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
        setupFiles: './vitest.setup.ts',
        include: ['src/**/*.test.{ts,tsx}'],
        server: {
            deps: {
                inline: [/@mui\//, /react-transition-group/],
            },
        },
        coverage: {
            provider: 'v8',
            reportsDirectory: 'reports/coverage',
            reporter: ['text', 'html', 'json'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/index.tsx', 'src/vite-env.d.ts', 'src/test-utils.ts', '**/index.ts', '**/e2e/**', '**/__mocks__/**'],
            thresholds: {
                branches: 100,
                functions: 100,
                lines: 100,
                statements: 100,
            },
        },
    },
});
