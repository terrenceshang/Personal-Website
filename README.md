# Personal Website

Single-page developer portfolio for Zenan Shang, built with React + TypeScript + Vite and deployed as a static site to GitHub Pages.

## Editing content

All copy (hero text, about, skills, projects, experience, contact details) lives in [`src/content.ts`](src/content.ts). Edit that file to change what the site says — the components in `src/components/` only handle layout.

Common edits:

- **Add a CV**: drop the PDF into `public/` (e.g. `public/cv.pdf`) and set `cvUrl: '/Personal-Website/cv.pdf'` in `src/content.ts`. The Contact section switches from the "Coming soon" placeholder to a download link automatically.
- **Add a project link**: give the project a `link: { label, url }` in `src/content.ts`.
- **Retheme**: colors, spacing, and shadows are CSS variables at the top of [`src/index.css`](src/index.css).

## Development

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # TypeScript checks
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages at <https://terrenceshang.github.io/Personal-Website/>.

One-time setup: in the repo settings on GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.

The Vite `base` option in `vite.config.ts` is set to `/Personal-Website/` to match the repo name. If the repo is renamed (e.g. to `terrenceshang.github.io`), change `base` to `'/'`.
