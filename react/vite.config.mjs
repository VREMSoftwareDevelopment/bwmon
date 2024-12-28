// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    base: '/bwmon/',
    build: {
        outDir: 'build',
        manifest: true,
    },
    server: {
        port: 3000,
        open: true,
        watch: {
            ignored: ['**/reports/**', '**/stryker*/**'],
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
