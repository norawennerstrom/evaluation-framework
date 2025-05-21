import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/~nowe2200/kandidatarbete/prioritized/dist/",
  plugins: [react()],
  server: {
    //allowedHosts: []
  }
})
