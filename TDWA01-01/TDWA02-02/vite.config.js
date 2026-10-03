import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Это заставит пути к JS и CSS начинаться с ./ вместо /
})