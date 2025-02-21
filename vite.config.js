import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ESLint } from 'eslint'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ESLint()],
})
