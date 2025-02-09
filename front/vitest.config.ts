/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/lib/test-utils/test-setup.tsx'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
}) 