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

## Multi-Page Expansion (Apr 2026)
- Added 8 new pages: about.html, troubleshooting.html, and 6 driver guides (printer, graphics, audio, network, usb, system).
- Nav order: Home / Blog / About / Troubleshooting / Contact (consistent across all 12 pages).
- Home page expanded with "Helpful Topics We Cover" section (6 colored topic cards with Read More links), About preview split-row, and Troubleshooting CTA banner.
- Blog redesigned with photo hero, featured post, 9 articles using real stock photos (no copyright issues).
- Footer now includes Driver Guides column + standalone disclaimer block above the bottom links.
- Animations: IntersectionObserver-based scroll reveal on `.reveal` elements, staggered via `.stagger`, plus float/pulse on hero illustration. All respect `prefers-reduced-motion`.
- All pages share the same header/footer structure and registered in vite.config.ts inputs.

## UI Polish Round 2 (Apr 2026)
- Removed person-laptop.jpg (bedroom photo) site-wide; replaced with AI-generated professional-workspace.png.
- Removed brand-visible printer.jpg site-wide; replaced with AI-generated printer-clean.png (no logos, no text).
- Replaced tech-support.jpg with AI-generated support-pro.png (cleaner editorial framing).
- Added hero-bg-tech.png — premium teal circuit-board background used by new home hero.
- Removed "Free Educational Resource" badge; replaced with "Independent Driver Education" tag with pulsing dot.
- Built a brand-new premium home hero: 16:9 aspect-ratio, layered glass-morphism, animated gradient orbs, grid mask, shimmering text accent, fade-up entrance, gradient primary CTA, ghost CTA, stats panel with dividers, scroll cue.
- Inner-page heroes (.hero-page, .hero-page-tall) now also enforce 16:9 aspect-ratio with min/max constraints; degrade gracefully on mobile.
- All animations respect prefers-reduced-motion.
