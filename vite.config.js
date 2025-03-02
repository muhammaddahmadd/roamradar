import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint'; // ✅ Correct ESLint plugin
// eslint()
export default defineConfig({
  plugins: [react()], // ✅ Now ESLint works properly with Vite
});
