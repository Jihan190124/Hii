import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' makes every asset URL relative, so the build works on any GitHub Pages
// address (https://<user>.github.io/<repo>/ or a custom domain) without editing this file.
// Routing uses HashRouter, so page refreshes never hit a missing server path.
export default defineConfig({
  base: './',
  plugins: [react()],
});
