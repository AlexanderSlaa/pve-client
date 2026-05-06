import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            'src/**/*.test.ts',
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
        globals: true,
        environment: 'node',
        setupFiles: ['./vitest.setup.ts'],
    },
});
