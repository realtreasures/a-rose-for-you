import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project site URL: username.github.io/a-rose-for-you/
  base: '/a-rose-for-you/',
});
