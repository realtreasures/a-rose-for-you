# A Rose for You — A Digital Garden

A romantic, editorial-style rose showcase built with React, Vite, Framer Motion and CSS.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Notes
- Rose photography is loaded from Unsplash image CDN URLs, so an internet connection is required to display the photos.
- The layout is responsive for desktop, tablet and mobile.
- Includes reduced-motion support, lazy-loaded gallery images, scroll reveals, drifting petals and an interactive blooming rose.
- Replace the `src` values in `src/App.jsx` with your own licensed image assets if you plan to publish commercially.


## Deploy to GitHub Pages

This archive is preconfigured for a GitHub repository named `a-rose-for-you`.

1. Create a **public** repository named `a-rose-for-you`.
2. Upload all files and folders from this project to the repository root (including the hidden `.github` folder and `vite.config.js`).
3. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. Open **Actions** and wait for the `Deploy to GitHub Pages` workflow to finish successfully.
5. Visit `https://YOUR-GITHUB-USERNAME.github.io/a-rose-for-you/`.

If you choose a different repository name, change `base` in `vite.config.js` to `'/YOUR-REPOSITORY-NAME/'` before uploading.
