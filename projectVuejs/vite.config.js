import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),],
  server:{
    proxy:{
      '^/api':{
        target: 'http://localhost:8080', 
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' },
      },
    }
  },   
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
