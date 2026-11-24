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
