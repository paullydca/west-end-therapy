import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── astro.config.mjs ───────────────────────────────────────────────────────
const configContent = `import { defineConfig } from 'astro/config';

export default defineConfig({
  // Your GitHub Pages URL — update YOUR-USERNAME below
  // Or replace entirely with a custom domain: 'https://westendtherapy.ca'
  site: 'https://paullydca.github.io/west-end-therapy',

  // Required when deploying to a subdirectory on github.io
  // Remove (or set to '/') if you point a custom domain at this repo
  base: '/west-end-therapy',
});
`;

fs.writeFileSync(path.join(__dirname, 'astro.config.mjs'), configContent, 'utf8');
console.log('✓ wrote astro.config.mjs');

// ─── .github/workflows/deploy.yml ───────────────────────────────────────────
const workflowDir = path.join(__dirname, '.github', 'workflows');
fs.mkdirSync(workflowDir, { recursive: true });

const workflowContent = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Install, build, and upload site
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

fs.writeFileSync(path.join(workflowDir, 'deploy.yml'), workflowContent, 'utf8');
console.log('✓ wrote .github/workflows/deploy.yml');

console.log('\n✅ Done.');
console.log('\nNext steps:');
console.log('  1. If using github.io URL, edit astro.config.mjs and replace paullydca with your GitHub username');
console.log('  2. Commit and push to GitHub:');
console.log('     git add .');
console.log('     git commit -m "Add GitHub Pages deployment workflow"');
console.log('     git push');
console.log('  3. In your GitHub repo → Settings → Pages → Source: set to "GitHub Actions"');
