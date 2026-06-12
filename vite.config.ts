import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Deployed to GitHub Pages with the custom root domain https://zenanshang.co.za/.
export default defineConfig({
  plugins: [react()],
  base: '/',
});
