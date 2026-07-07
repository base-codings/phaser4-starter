import { defineConfig } from 'vite';

export default defineConfig({
    base: './',
    logLevel: 'warning',
    build: {
        // Keep Phaser in its own chunk so game code changes don't bust its cache.
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
        minify: 'terser',
        terserOptions: {
            compress: { passes: 2 },
            mangle: true,
            format: { comments: false }
        }
    }
});
