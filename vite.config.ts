import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/~nowe2200/kandidatarbete/dist/",
  plugins: [react()],
  server: {
    allowedHosts: ['3edf-194-68-59-3.ngrok-free.app']
  }
})
