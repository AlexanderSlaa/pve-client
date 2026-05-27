import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: [
            'tests/unit/**/*.test.ts',
            'tests/helpers/**/*.test.ts',
        ],
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
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
