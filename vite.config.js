import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint'; // ✅ Correct ESLint plugin

export default defineConfig({
  plugins: [react(), eslint()], // ✅ Now ESLint works properly with Vite
});
