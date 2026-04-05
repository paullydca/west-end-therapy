import { defineConfig } from 'astro/config';

export default defineConfig({
  // Your GitHub Pages URL — update YOUR-USERNAME below
  // Or replace entirely with a custom domain: 'https://westendtherapy.ca'
  site: 'https://paullydca.github.io/west-end-therapy',

  // Required when deploying to a subdirectory on github.io
  // Remove (or set to '/') if you point a custom domain at this repo
  base: '/west-end-therapy',
});
