import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
      },
      '/API': {
        target: 'https://localhost:4001',
        rewrite: path => path.replace(/^\/API/, '/api'),
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
