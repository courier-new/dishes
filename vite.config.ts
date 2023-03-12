import { defineConfig } from 'vite';
import solid from 'solid-start/vite';
import netlify from 'solid-start-netlify';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import replace, { RollupReplaceOptions } from '@rollup/plugin-replace';
import type { VitePWAOptions } from 'vite-plugin-pwa';

const replaceOptions: Partial<RollupReplaceOptions> = {
    __DATE__: new Date().toISOString(),
    preventAssignment: true,
};

const pwaOptions: Partial<VitePWAOptions> = {
    base: '/',
    includeAssets: ['favicon.ico', 'robots.txt'],
    manifest: {
        name: 'bat',
        short_name: 'bat',
        description: 'Opinionated, batteries included, PWA using Solid and Vite',
        theme_color: '#202A37',
        icons: [
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
    },
};

export default defineConfig({
    plugins: [
        solid({ adapter: netlify({}) }),
        tsconfigPaths(),
        VitePWA(pwaOptions),
        replace(replaceOptions),
    ],
    build: {
        target: ['esnext'],
    },
    ssr: {
        noExternal: ['@motionone/solid', 'motion', 'solid-toast'],
    },
    resolve: {
        conditions: ['development', 'browser'],
    },
});
