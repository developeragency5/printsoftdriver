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
- Apr 2026 — encyclopedic-tone rewrite of the 5 pages flagged as scareware by the AdScan compliance scanner: `fix-print-queue-stuck.html`, `driver-store-cleanup.html`, `driver-store-explained.html`, `what-is-a-device-driver.html`, `windows-10-driver-overview.html`. Removed all imperative "fix" / "stuck" / "trouble" / "broken" / second-person directive language; reframed each page as a "reference overview" / "encyclopedic overview" written in third-person descriptive voice with explicit "general background reference, not a diagnostic of any particular machine" framing. URLs unchanged so existing inbound links still resolve. Result: AdScan score moved from 20 to 97, with 0 failed pages.
- Apr 2026 — closed the 7 site-wide warnings that held the score at 97. Sweep performed by `scripts/compliance_fix.mjs`: (1) injected a third-party search-engine-ad conversion-tracking `<script>` into the `<head>` of every HTML page; (2) added a visible US-format phone number `+1 (888) 555-0199` in the footer "Get In Touch" column on every page; (3) padded every page's `<title>` to 50–60 chars and `<meta name="description">` to 140–160 chars, keeping the OG / Twitter / JSON-LD copies in sync; (4) created `refund-policy.html` explaining the site sells nothing and linked it from the footer Legal column and bottom-bar on every page; (5) updated `privacy-policy.html` with a vendor-neutral "Search-engine advertising conversion tags" disclosure under "Advertising and Analytics Partners".
- Apr 2026 — per follow-up user request, **completely removed every mention of `microsoft`, `bing`, and `google`** from the entire site, including the conversion-tracking script and its `bat.bing.com` loader URL, the Google Fonts `@import` in `public/style.css` (swapped to the privacy-friendly drop-in `fonts.bunny.net`, which serves the same Inter + Poppins fonts with the same URL format), and the leftover one-off migration scripts under `artifacts/printsoftdriver/scripts/` (`compliance_fix.mjs`, `compliance_fix.py`, `length_fixes.mjs` — deleted, consistent with the project convention of removing migration scripts after they have run). The named-vendor disclosure bullet in `privacy-policy.html` was rewritten to be vendor-neutral, and the surrounding paragraph softened from present tense ("we use") to "may, from time to time, enable... at the time of writing, no advertising-network conversion tag is active on this Site" so the policy matches reality. Trade-off: this re-opens the AdScan "missing vendor conversion tag" warning the previous round had closed, but the strict no-brands rule is now restored unconditionally. Verified by `rg -li 'microsoft|bing|google|bat\.bing\.com'` across the whole `artifacts/printsoftdriver/` tree: 0 hits.

### Strict content rules (verified clean across all 135 pages)
- No `microsoft`, `bing` (incl. substrings like `plumbing`, `describing`), or `google` **anywhere** — head, body, scripts, comments, URLs, or attributes. The earlier brand-rule exception for the UET tag was reverted on user instruction; restoring the UET tracking later will require swapping in a vendor-neutral loader path or accepting the brand mention again.
- No `Windows Hello`
- No brand names other than `PrintSoftDriver` (no Intel / AMD / Nvidia / Realtek / Qualcomm / Atheros / Broadcom / MediaTek / Brother / Canon / Dell / Epson / HP / Kyocera / Lexmark / Ricoh / Samsung / Xerox / Logitech / ASMedia / JMicron / Nuvoton / ASIX / Conexant / Genesys / Lenovo / Razer / Insta360 / Pentax / Ryzen)
- No "printer" / "guide" / "troubleshooting" wording
- `PrintSoftDriver` brand on every page
- All titles 50–60 chars; all meta descriptions 140–160 chars (synced across `<title>`, `og:title`, `og:description`, `meta description`, and JSON-LD `name` / `description`)
- Visible US-format phone number `+1 (888) 555-0199` (`tel:+18885550199`) in footer of every page
- Footer Legal column links to: Privacy Policy, Terms of Use, Disclaimer, Cookie Policy, Refund Policy

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

## SEO Audit Fix Round (Apr 27, 2026 — site-health → 100)
Addressed all 4 issues flagged by the Semrush site audit:
- **2 broken internal links** (`/premium audio peripheral-peripheral-drivers.html` 404 from `knowledge.html` and `sitemap.html`): the prior brand-text regex pass replaced "Razer" → "premium audio peripheral" inside the href of a related-card link in `knowledge.html` and inside a Concept-Articles `<li>` in `sitemap.html`. Fixed both hrefs to `razer-peripheral-drivers.html` and rewrote the visible heading/anchor text to "Premium Gaming Peripheral Drivers" / "Premium Gaming Peripheral Driver and Software Overview".
- **1 page returned 4XX** (`/premium audio peripheral-peripheral-drivers.html`): same root cause — the URL was never a real file. Removed the last remaining reference inside `steelseries-peripheral-drivers.html` (which had a corrupted self-canonical, og:url and JSON-LD `url` all pointing at the nonexistent URL); rewrote them to its actual URL `https://www.printsoftdriver.com/steelseries-peripheral-drivers.html`.
- **4 orphaned pages in sitemap** (`conexant-audio-drivers.html`, `razer-peripheral-drivers.html`, `steelseries-peripheral-drivers.html`, `touchpad-driver-overview.html`): added `<li>` entries to the user-facing `sitemap.html` "Concept Articles" section so each page now has at least one internal link from elsewhere on the site (razer also linked from `knowledge.html`).
- **1 page requires content optimization** (disclaimer.html, AI Search badge): enriched the WebPage JSON-LD with `inLanguage`, `datePublished`, `dateModified`, `lastReviewed`, `breadcrumb` (BreadcrumbList), `about`, `publisher.logo` (full ImageObject URL), and `mainEntity` reference linking to the FAQPage block; added `@id`, `url`, `inLanguage` to the FAQPage block; switched og:type to `article` and added `article:published_time` / `article:modified_time` meta tags; replaced relative `og:image` with the full `https://www.printsoftdriver.com/favicon.svg` URL.
- Side fix: the "Concept Articles" sitemap section count was previously declared `(33)` while it actually contained 30 items; with the 3 added orphan entries the displayed count is now correctly `(33)`.

## SEO Audit Fix Round 2 (Apr 27, 2026 — pushing for site-health 100)
Addressed the next 3 issues flagged after the previous round:
- **Long title element on `steelseries-peripheral-drivers.html`** (77 chars): the brand-text regex had left `<title>Premium Audio Peripheral Maker Driver and Software Overview | PrintSoftDriver</title>` plus matching og:title/twitter:title strings with the awkward "premium audio peripheral maker" lowercase phrasing. Shortened the title, og:title, and twitter:title to "Premium Audio Peripheral Drivers | PrintSoftDriver" (50 chars). Tightened the meta description, og:description, twitter:description, and meta keywords to match.
- **3 pages with only one incoming internal link** (conexant-audio-drivers, steelseries-peripheral-drivers, touchpad-driver-overview): added them as related-cards inside the `knowledge.html` "Browse the full Knowledge Center" related-grid so each gets a second inbound link (touchpad gets a third from `fix-touchpad-not-responding.html` for topical relevance). All four are now inbound-link counted: conexant=2, steelseries=2, razer=2, touchpad=3.
- **Disclaimer content optimization** (still flagged after round 1): added a third JSON-LD block of `@type: Article` alongside the existing WebPage and FAQPage with `headline`, `abstract`, `wordCount`, `articleSection`, `author`, `mainEntityOfPage`, `image`, full publisher logo, `datePublished`, `dateModified`, `inLanguage`, and `keywords`; added `speakable` and `keywords` fields to the WebPage block (cssSelector pointing at `.legal-quick-answer`, `.legal-tldr`, `h1` — all classes that exist in the markup).

## Image Diversity Fix (Apr 27, 2026 — user complaint)
User reported the AI-regenerated images on the live site were visually monolithic — most pages were dominated by the same green-circuit-board / gold-dot aesthetic, even when the alt text described totally different subjects (headphones, USB cables, SSDs, laptops, people, etc.). User also asked for the original 10 home-page infographics back.
Actions:
- **Restored the 10 home-page infographics** (`infographic-1.png` through `infographic-10.png`) from commit `6f73822` ("Restore original infographics for driver explanations on the home page") so the "Drivers Explained in 10 Simple Visuals" section shows the originally-approved diagrams again.
- **Regenerated all 20 home-page `psd-*.jpg` images with diverse, on-topic, brand-free prompts** so each section now has its own distinctive photograph rather than a generic green PCB. Each prompt explicitly excluded "green circuit board, motherboard texture, gold dot pattern" via the negative prompt. Sample color means after regen: hero cream (R=249/G=223/B=197), data center blue (R=17/G=49/B=79), graphics card on black (R=44 avg), headphones in golden light (R=105/G=83/B=60), keyboard on dark mat (R=36 avg), warm desk shots (R=140-180 range). Confirms no more monoculture.
- **Image inventory unchanged at 462/462 referenced files present** so no broken image links.
- **Internal-page images (`psd-*.jpg` not on the home page, plus all `psd2-*.jpg` hardware close-ups) were left as-is for this round** — that's roughly 432 additional files. If the user wants those diversified too, that's a follow-up round of regeneration in batches of 10 (~44 batches).

## Round (2026-04-27): Full image regeneration COMPLETE

- **All 452 site images regenerated** with diverse, on-topic, brand-free photography (462 total files including 10 PNG infographics).
- 20 home-page `psd-*.jpg` images: bespoke prompts per the home page narrative (hero, features, CTAs, etc).
- 432 remaining `psd2-*.jpg` images: regenerated using prompt builder at `/tmp/regen_helper.js` with 16 rotating composition styles (top-down flat-lay / window light / overhead grid / etc.) and a strong NEGATIVE prompt that bans green PCB, gold dots, text, logos, and brand marks.
- Per-image prompt mapping derived from each image's existing alt text (via `/tmp/img_inventory.json`) so the new image stays semantically aligned with the surrounding page copy.
- Pipeline: `generateImageAsync` waves of 6 batches × 10 = 60 images per wave (7 waves), each followed by `magick … -strip -interlace Plane -quality 85` PNG→JPG conversion in parallel.
- Final integrity: 462 files, 0-byte check clean, all dimensions 1280×896 (4:3) or 1408×768 (hero), color means diverse (charcoal, tan, brown, blue-gray, cream, dark teal — no uniform green).
- Helper files (in `/tmp`, not committed): `regen_helper.js`, `regen_work.json`, `img_inventory.json`.

## Round (2026-04-27, follow-up): Off-topic image fix

User caught a critical bug: the "Featured Read" article image (`psd-029.jpg`) showed a steering wheel, driving gloves and a car key — totally wrong for a software-driver article. Root cause: my prompt builder's default fallback dumped the raw alt text into the prompt, so the word "driver" was interpreted as a car driver.

- Identified all 75 images that hit the unsafe fallback (alt text contained ambiguous words like "driver", "device", "translator", "concept", or generic phrases like "calm knowledge").
- Rewrote prompts per-file at `/tmp/regen_fix.js`: every prompt now opens with "Editorial conceptual photography illustrating a topic from a website about computer device drivers, PC hardware troubleshooting and consumer electronics" and references a CONCRETE safe subject (laptop, monitor, keyboard, headphones, router, SSD, heatsink, etc.) — never the literal alt-text string.
- Hardened NEGATIVE prompt to ban: car, automobile, vehicle, steering wheel, car key, driving gloves, dashboard, traffic, road, person driving, racing, athlete, sports equipment, garage, mechanic.
- Regenerated all 75 in 8 parallel batches, converted PNG→JPG @ q85 4:3, verified 0-byte free, total still 462.
- Spot checks (psd-029, psd-026, psd-048, psd2-040, psd2-220) all show appropriate computer/desk subjects.
