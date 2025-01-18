import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                login: resolve(__dirname, 'src/pages/login/index.html'),
                register: resolve(__dirname, 'src/pages/register/index.html'),
                profile: resolve(__dirname, 'src/pages/profile/index.html'),
                listings: resolve(__dirname, 'src/pages/listings/index.html'),
                specificListing: resolve(__dirname, 'src/pages/specific-listing/index.html'),
                settings: resolve(__dirname, 'src/pages/settings/index.html'),
            },
        },
    },
});
