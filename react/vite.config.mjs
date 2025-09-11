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
                manualChunks: {
                    mui: ['@mui/icons-material', '@mui/material'],
                    chart: ['react-apexcharts'],
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
            '@hooks': '/src/hooks',
            '@pages': '/src/pages',
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
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
});
