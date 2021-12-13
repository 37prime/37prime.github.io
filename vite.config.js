import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  root: "src",
  publicDir: "../dist",
  plugins: [svelte()],
  server: {
    port: 8080
  },
  build: {
    outDir: '../dist',
  }
})
