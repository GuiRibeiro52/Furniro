/// <reference types="vitest" />
 
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Furniro",
  plugins: [react()],
  test: {
    globals:true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/setupTests.js',
    coverage:{
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx']
    },
  },
  build: {chunkSizeWarningLimit:1600},
})

