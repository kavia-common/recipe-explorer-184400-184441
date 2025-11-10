# Recipe Explorer Frontend

A Next.js app for browsing, searching, and viewing recipes. Uses a modern Ocean Professional theme (blue primary, amber accents) with accessible, responsive UI.

## Quick Start

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Features

- Home recipe grid with client-side search and category filter
- Recipe detail page: ingredients and instructions
- Ocean Professional theme with subtle gradients, rounded corners, and shadows
- Accessible components (semantic headings, alt text, focus ring)
- Loading skeletons and error states
- Responsive layout with top navbar and sidebar filters on large screens
- Local mock API routes under `/api/recipes` with pagination and categories

## Configuration

This app can call an external backend if available; otherwise it falls back to local mock API routes.

Supported environment variables (set in `.env.local`):

- `NEXT_PUBLIC_API_BASE` – Base URL of your backend, e.g. `https://api.example.com`
- `NEXT_PUBLIC_BACKEND_URL` – Alternative base URL (used if `NEXT_PUBLIC_API_BASE` is not set)
- Other optional project variables:
  - `NEXT_PUBLIC_FRONTEND_URL`, `NEXT_PUBLIC_WS_URL`,
  - `NEXT_PUBLIC_NODE_ENV`, `NEXT_PUBLIC_NEXT_TELEMETRY_DISABLED`,
  - `NEXT_PUBLIC_ENABLE_SOURCE_MAPS`, `NEXT_PUBLIC_PORT`,
  - `NEXT_PUBLIC_TRUST_PROXY`, `NEXT_PUBLIC_LOG_LEVEL`,
  - `NEXT_PUBLIC_HEALTHCHECK_PATH`, `NEXT_PUBLIC_FEATURE_FLAGS`,
  - `NEXT_PUBLIC_EXPERIMENTS_ENABLED`

If neither `NEXT_PUBLIC_API_BASE` nor `NEXT_PUBLIC_BACKEND_URL` is set, the app uses local routes:

- `GET /api/recipes?q=&category=&page=&pageSize=`
- `GET /api/recipes/:id`

## Extending to a Real Backend

The data layer lives in `src/lib/data.ts`. It composes URLs using `NEXT_PUBLIC_API_BASE` or `NEXT_PUBLIC_BACKEND_URL`. To connect a backend:

1. Set `NEXT_PUBLIC_API_BASE=https://your-backend.example.com` in `.env.local`.
2. Ensure your backend exposes these endpoints:
   - `GET /recipes?q=&category=&page=&pageSize=`
   - `GET /recipes/:id`
3. Shape responses to match:
   - List: `{ items: Recipe[], total: number, page: number, pageSize: number, categories: string[] }`
   - Detail: `Recipe`
4. If your API differs, update the fetchers in `src/lib/data.ts`.

## Project Structure

- `src/app/page.tsx` – Home listing with search and filters
- `src/app/recipe/[id]/page.tsx` – Recipe details
- `src/app/api/recipes/*` – Local mock API routes
- `src/lib/types.ts` – Shared types
- `src/lib/data.ts` – Data access layer (env-aware)
- `src/lib/mockData.ts` – Mock dataset and helpers
- `src/lib/theme.ts` – Theme constants and utilities
- `src/app/globals.css` – Global styles and theme variables
- `src/app/layout.tsx` – Shell layout with navbar and sidebar

## Accessibility

- Semantic headings and landmarks
- Alt text on images
- Visible focus styles and skip-link
- Buttons have `aria-pressed` where applicable

## Notes

- The app uses Next.js App Router and Tailwind CSS v4.
- Static export is enabled (`next.config.ts` sets `output: "export"`). When using local API routes in production, switch to server runtime or remove export for SSR. For CI preview, dev mode is fine.
- If your recipe images come from external domains, configure `images.remotePatterns` in `next.config.ts` accordingly.
