import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false, 
    },
  },
  resolve: {
    alias: {
      'react-router-dom': 'react-router-dom/dist/index.js',
    },
  },
})