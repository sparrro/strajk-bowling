import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary", "clover"],
      reportsDirectory: "./coverage",
      all: true,
      exclude: ["./src/main.jsx", "vite.config.js"],
    }
  }
})
