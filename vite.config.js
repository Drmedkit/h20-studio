import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      includePublic: true,
      jpg: { quality: 75 },
      jpeg: { quality: 75 },
      png: { quality: 75 },
    })
  ],
  server: {
    port: 8081,
    host: true
  }
})
