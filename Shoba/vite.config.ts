import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.io'],
    watch: {
      ignored: [
        '**/frames-VV/**',
        '**/frames-lifescape/**',
        '**/frames-VV',
        '**/frames-lifescape',
        '**/hero1-frames/**',
        '**/hero2-frames/**',
        '**/hero3-frames/**',
        '**/ezgif-*/**',
        'public/ezgif-*',
      ],
    },
  },
})
