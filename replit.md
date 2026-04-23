# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## PrintSoftDriver Website

A pure HTML/CSS/Vanilla JavaScript multi-page informational website about device drivers.

### Files location: `artifacts/printsoftdriver/`

- `index.html` — Home page (2500+ words, 8 sections)
- `blog.html` — Blog / Knowledge Hub (6 articles)
- `contact.html` — Contact page with JS form validation
- `privacy.html` — Legal pages (4 tabs: Privacy, Disclaimer, Terms, Cookies)
- `public/style.css` — Shared stylesheet
- `public/script.js` — Shared vanilla JS
- `public/favicon.svg` — SVG chip/circuit icon
- `vite.config.ts` — Multi-page Vite config (no React)

### Key Features

- Pure HTML/CSS/Vanilla JS (no React, no frameworks)
- CCPA compliant (Do Not Sell link, CCPA section)
- Microsoft UET tag placeholder on all pages
- Cookie consent banner (localStorage)
- 12 driver types with alternating layout
- FAQ accordion (pure JS)
- JS tab navigation on privacy page
- JS form validation on contact page
- SEO: title tags, meta descriptions, Open Graph, canonical URLs, JSON-LD, favicon
- Responsive design (mobile hamburger menu)
- Unique IDs on all pages (no duplicates)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
