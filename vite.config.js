import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // To wyłącza blokadę i pozwala Netlify na wyświetlanie podglądu
    allowedHosts: true 
  }
})
