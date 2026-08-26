import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/estratijya-landing/',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/tmp/**', '**/docs/**', '**/*.zip'],
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 550,
  },
})
