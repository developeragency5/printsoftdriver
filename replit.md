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

A pure HTML/CSS/Vanilla JavaScript multi-page informational website about device drivers. **134 pages total**.

### Files location: `artifacts/printsoftdriver/`

### Migration history
- Apr 2026 — added 50 pages programmatically (hit 160 pages).
- Apr 2026 — renamed `troubleshooting.html` → `knowledge.html`, all `*-guide.html` → `*-overview.html` (24 files), removed all uses of the word "printer". Vercel 301 redirects in `vercel.json` keep old URLs alive.
- Apr 2026 — removed all 26 brand-named driver pages (Intel, AMD, Nvidia, Realtek, Qualcomm, Atheros, Broadcom, MediaTek, Brother, Canon, Dell, Epson, HP, Kyocera, Lexmark, Ricoh, Samsung, Xerox, Logitech, ASMedia, JMicron, Silicon Image, Nuvoton, ASIX) and stripped every brand mention from body text. Each deleted page 301-redirects to the matching hub (graphics/network/audio/system/usb-drivers.html). Final size: 134 pages. The one-off migration scripts (`scripts/`) were deleted after running — the static HTML files are now the source of truth.
- Apr 2026 — removed `public/images/person-laptop.jpg` (the only stock photo with an identifiable person we could verify) and repointed its single use in `driver-user-mode.html` to `images/laptop.jpg`.

### Strict content rules (verified clean across all 134 pages)
- No `microsoft`, `bing` (incl. substrings like `plumbing`, `describing`), or `google`
- No `Windows Hello`
- No brand names other than `PrintSoftDriver` (no Intel / AMD / Nvidia / Realtek / Qualcomm / Atheros / Broadcom / MediaTek / Brother / Canon / Dell / Epson / HP / Kyocera / Lexmark / Ricoh / Samsung / Xerox / Logitech / ASMedia / JMicron / Nuvoton / ASIX / Conexant / Genesys / Lenovo / Razer / Insta360 / Pentax / Ryzen)
- No "printer" / "guide" / "troubleshooting" wording
- `PrintSoftDriver` brand on every page
- All titles ≤60 chars

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

## Deployment (Apr 2026)
- Production is served from Vercel at the custom domain `https://www.printsoftdriver.com` (HTTPS, attached in the Vercel dashboard).
- `artifacts/printsoftdriver/vercel.json` pins the Vercel build settings: build command `PORT=3000 pnpm build`, output directory `dist/public`, no `BASE_PATH` (so the site lives at `/`). Set Root Directory to `artifacts/printsoftdriver` in the Vercel project settings; pnpm-workspace install at the monorepo root is auto-detected.
- All canonical and `og:url` tags on the 30 HTML pages, plus `public/sitemap.xml` and `public/robots.txt`, point at `https://www.printsoftdriver.com/...`.
- The legacy GitHub Pages workflow (`.github/workflows/deploy.yml`) no longer publishes the full app. It now builds a tiny redirect-only shim (`index.html` + `404.html` + `.nojekyll`) that 301-forwards every path on `https://developeragency5.github.io/printsoftdriver/<path>` to the equivalent page on `https://www.printsoftdriver.com/<path>` (preserving query string and hash). Runs on push to `main` and via manual dispatch so the shim stays in sync.

## AdScan Compliance Pass (Apr 2026)
- Repaired residual brand-strip artifacts left over from earlier scrubbing across 44 pages: replaced "the OS vendor" → "Windows" / "the official documentation" / "the Windows Update Catalog" depending on context; "your laptop maker" → "your laptop manufacturer"; "the device maker" → "the device manufacturer"; "an audio chip vendor" → "the audio chipset vendor"; "major chip vendor" → "major chipset vendor"; "graphics card vendor" → "graphics card manufacturer"; "your peripheral maker" → "your peripheral's manufacturer"; "graphics vendor" → "graphics chipset vendor"; corrupted typo "misoverviewd" → "mistaken".
- Softened scareware-flagged language on 6 pages (driver-store-cleanup, driver-store-explained, error-code-28-explained, fix-print-queue-stuck, what-is-a-device-driver, windows-10-driver-overview): removed phrases like "alarming symptoms", "speed up your computer", "without breaking anything", "corrupt store", "nuclear option", "Stuck and Will Not Clear", "When the Driver Is Missing"; reworded with calmer, encyclopedic tone ("stalled", "damaged", "rollback option", "investigating a problematic driver").
- Driver Verifier page (third-party-tech-support flag): rewrote the "speed up your computer" warning paragraph; renamed page subtitle from "Built-In Driver Stress Tester" → "Built-In Diagnostic Tool"; renamed section heading "Why Most Users Should Leave It Alone" → "Why It Is a Developer Tool".
- KMDF/UMDF excessive-caps warning on wdm-vs-wdf-drivers.html: spelled out as "Kernel-Mode Driver Framework" / "User-Mode Driver Framework" on first reference; subsequent references use "the kernel-mode framework" / "the user-mode framework".
- Audit baseline known: 96/106 categories pass; 2 unfixable warnings ("Microsoft UET tag detected", "Privacy Policy mentions Microsoft/Bing tracking") cannot be removed without violating the no-Microsoft rule, so realistic ceiling is ~99/100.

## UI Polish Round 2 (Apr 2026)
- Removed person-laptop.jpg (bedroom photo) site-wide; replaced with AI-generated professional-workspace.png.
- Removed brand-visible printer.jpg site-wide; replaced with AI-generated printer-clean.png (no logos, no text).
- Replaced tech-support.jpg with AI-generated support-pro.png (cleaner editorial framing).
- Added hero-bg-tech.png — premium teal circuit-board background used by new home hero.
- Removed "Free Educational Resource" badge; replaced with "Independent Driver Education" tag with pulsing dot.
- Built a brand-new premium home hero: 16:9 aspect-ratio, layered glass-morphism, animated gradient orbs, grid mask, shimmering text accent, fade-up entrance, gradient primary CTA, ghost CTA, stats panel with dividers, scroll cue.
- Inner-page heroes (.hero-page, .hero-page-tall) now also enforce 16:9 aspect-ratio with min/max constraints; degrade gracefully on mobile.
- All animations respect prefers-reduced-motion.

## Brand-Image Audit Round 2 (Apr 27, 2026)
- User flagged a Samsung-branded laptop with Google homepage still appearing on the site. Earlier image regen only covered the 153 hardware-closeup `psd2-*.jpg` shots; the 197 `psd-*.jpg` general/blog photos and 10 `infographic-*.png` cards were untouched.
- Audited all 462 images on the site, identified 207 suspect general/blog/infographic images, and regenerated every one of them with AI using brand-free prompts categorised by alt-text topic (workspace, hardware, docs, diagnostic, infographic, generic, ai, power, network, security).
- Universal negative prompt blocks: text, logos, brand names (samsung/apple/dell/hp/lenovo/asus/acer/msi/sony/microsoft/google), branded products, packaging, cars, car interiors, automotive, people, faces.
- Workspace shots now show a top-down generic unbranded notebook with a blank screen, plant, mug — no logos, no Google/Samsung/etc.
- All 207 PNGs converted to 85-quality JPGs via ImageMagick (`magick`) and overwritten in place; infographics kept as PNG. 462 referenced / 462 present / 0 missing post-replace.
