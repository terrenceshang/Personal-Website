import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed to GitHub Pages at https://terrenceshang.github.io/Personal-Website/
// If the repo is ever renamed (e.g. to terrenceshang.github.io), change `base` to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/Personal-Website/',
});
