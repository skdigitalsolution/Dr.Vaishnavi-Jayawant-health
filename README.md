# Dr. Vaishnavi Webinar

Phase 01 foundation for a premium, single-page PCOS & PCOD webinar landing page built with React, Vite, and Tailwind CSS.

## Tech stack

- React 19
- Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion
- Lucide React
- Oxlint

## Project structure

```text
src/
  assets/
    icons/
    images/
    videos/
  components/
    layout/
    ui/
  config/
    webinarConfig.js
  App.jsx
  index.css
  main.jsx
public/
  images/
  videos/
```

## Foundation included

- Global dark-theme tokens and Inter typography
- Reusable UI primitives (`Button`, `Container`)
- Centralized webinar configuration with registration price set to ₹199
- Placeholder payment configuration for future Razorpay integration (not implemented)
- Basic application shell only (no full landing page sections)

## Scripts

- `npm run dev` — start the development server
- `npm run lint` — run Oxlint
- `npm run build` — create a production build
- `npm run preview` — preview the production build
- `npm run verify:pages` — validate the compiled Pages entry and its assets

## GitHub Pages

Set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The **Deploy to GitHub Pages** workflow builds the site and deploys only `dist` on pushes to `main`. It can also be run from the Actions tab.

The project URL is [skdigitalsolution.github.io/Dr.Vaishnavi-Jayawant-health/](https://skdigitalsolution.github.io/Dr.Vaishnavi-Jayawant-health/). The source `index.html` is Vite's build input. Publish the compiled artifact to serve the JavaScript and CSS under the project URL.

When adding local images, videos, posters, or captions from `public`, prefix their paths in React or JavaScript configuration with `import.meta.env.BASE_URL`. For example, use `${import.meta.env.BASE_URL}videos/example.mp4` for `public/videos/example.mp4`.
