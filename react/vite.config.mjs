// vite.config.mjs
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
        alias: {
            '@components': '/src/components',
            '@features': '/src/features',
            '@hooks': '/src/hooks',
            '@services': '/src/services',
            '@utils': '/src/utils',
        },
    },
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
        svgr({ icon: true, include: ['src/**/*.svg'] }),
        visualizer({
            open: false,
            filename: 'reports/visualizer/stats.html',
        }),
    ],
    optimizeDeps: {
        force: true,
    },
});
