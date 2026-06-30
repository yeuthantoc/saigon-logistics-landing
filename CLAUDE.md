# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
Communication by Vietnamese. Site content in Vietnamese.

## Role

Act as a senior Next.js frontend expert. Prioritize: performance (Core Web Vitals), clean component boundaries, type safety, and pixel-accurate UI. Know when to use Server vs Client Components, when to reach for `next/image`, `next/font`, `next/og`, and how App Router caching behaves.

## Working rules

- **Always run `npx tsc --noEmit` after every code change.** Fix all TypeScript errors before reporting the task as done.
- If a change touches UI, verify visually in the browser before closing the task.
- Do not report success until the build is clean.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build (TypeScript + Next.js)
npm run lint     # ESLint via next lint
npm run start    # serve production build
```

No test runner is configured — verify changes via `npm run build` (catches TypeScript errors) and manual browser testing.

## Architecture

**Single-page lead-magnet landing** for an international freight forwarding company. Built with Next.js 15 App Router + TypeScript + TailwindCSS v3. No external UI library.

### Page assembly

`app/page.tsx` composes the page as a linear sequence of section components:

```
Header → Hero → TrustStrip → RouteGrid → Audience → ProcessSteps → CtaBand → Footer
```

`RateEstimator` is a client component (`'use client'`) embedded as the right column inside `Hero` — it holds the country-selector + weight-slider state. It is not a top-level section.

`LeadButton` wraps `btn()` + `openLeadForm()`. `ContactLink` wraps `btn()` + `track('contact')` for phone/Zalo links. Use these instead of writing CTA markup directly in sections.

`LeadForm` sits outside this flow — it renders as a fixed modal, mounted once at page level. It is opened from any component by dispatching a custom DOM event (`saigon:open-lead`) via `openLeadForm()` from `lib/analytics.ts`. Never import `LeadForm` into section components; always use the event bus.

### lib/ — single source of truth for all data

All business logic and content lives in `lib/`; components are purely presentational:

| File | Purpose |
|---|---|
| `lib/site.ts` | Business info: name, hotline, Zalo, URL — override via `NEXT_PUBLIC_*` env vars |
| `lib/rates.ts` | Shipping rates per destination (base fee, per-kg, ETA) + `flagUrl(key, w)` helper + price calc helpers |
| `lib/content.ts` | Static copy: stats, service list, process steps, audience cards, nav links |
| `lib/analytics.ts` | `track()` (GA4 + Meta Pixel, no-op if not configured) + `openLeadForm()` event bus |
| `lib/validation.ts` | Vietnamese phone number validation + normalization |
| `lib/ui.ts` | Design token helpers: `btn(variant)`, `CARD`, `BADGE`, `CHIP`, `cx()` |

When adding content or changing copy, edit `lib/content.ts` or `lib/rates.ts`, not the component files.

### Lead capture flow

1. Any CTA calls `openLeadForm({ route?, weight?, source? })` — this dispatches `saigon:open-lead`.
2. `LeadForm` listens for the event, pre-fills fields, and opens as a modal.
3. On submit: client-side honeypot check → VN phone validation → `POST /api/lead`.
4. `app/api/lead/route.ts` applies honeypot + in-memory rate-limit (5 req / 10 min per IP) → validates phone → delivers to the first configured channel: **Webhook → Resend → Telegram → console log**.

### Design system — neo-brutalist / sticker style

Brand colors (defined in `tailwind.config.ts`): `coral` (#ef5226), `teal` (#0e7c6b), `ink` (#251a12), `cream` (#fff6ed).

Core constraints:
- Borders: `border-2 border-ink/60` on cards/inputs/buttons; `border-2 border-ink/60` on section dividers. Never use grey or drop below `/60` opacity. No border on decorative images (flags, icons).
- Shadows: hard drop shadows only — `shadow-hard`, `shadow-hard-sm`, `shadow-hard-lg`, `shadow-hard-xs` (defined in Tailwind config, all use ink color, no blur)
- Fonts: `font-display` (Bricolage Grotesque, headings/numbers) and `font-sans` (Be Vietnam Pro, body/UI)
- Buttons: always use `btn(variant)` from `lib/ui.ts` to stay consistent — do not write button classes by hand

### Country flags

Flag images use `flagUrl(key, width)` from `lib/rates.ts` — serves `flagcdn.com` PNGs. The `RateKey` values (`us`, `au`, `ca`, `eu`, `jp`, `sg`) map directly to ISO 3166-1 alpha-2 codes accepted by flagcdn.com. Always use `srcSet` with 2x for retina. No border on flag `<img>` elements.

### SEO / metadata

`app/layout.tsx` owns all metadata: title, description, Open Graph, JSON-LD (`Organization` + `Service`), GA4, Meta Pixel. `app/sitemap.ts` and `app/robots.ts` generate those files at build time.

`<body>` has `suppressHydrationWarning` to prevent hydration mismatch from browser extensions injecting attributes.

### Skills

`modern-web-guidance` (GoogleChrome) is installed at `.agents/skills/modern-web-guidance` and symlinked into Claude Code. Consult it for CSS, layout, animation, form, and accessibility patterns before proposing solutions.

## Environment variables

Copy `.env.example` → `.env.local`. All vars are optional — the app runs without them (leads log to console).

Configure exactly one lead delivery channel: `LEAD_WEBHOOK_URL` (Google Sheets webhook, recommended), `RESEND_API_KEY` + `LEAD_EMAIL_TO`, or `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`.

Set `NEXT_PUBLIC_SITE_URL` before deploying so metadata, sitemap, and OG images use the correct domain.
