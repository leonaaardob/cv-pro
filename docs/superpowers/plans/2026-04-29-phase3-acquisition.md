# Phase 3 — Acquisition Plan

**Goal:** Set up the blog structure (SEO bible), replace PostHog with Plausible, add conversion tracking, and update the sitemap.

**Architecture:** Articles live as static TypeScript objects in `content/blog/` — no extra dependencies. Blog pages use Next.js generateStaticParams for full SSG. Plausible is injected via `next/script` in the root layout, replacing PostHog. Custom events track key CTAs.

---

## File Map

| File | Action |
|------|--------|
| `content/blog/index.ts` | Create — article registry |
| `content/blog/comment-optimiser-son-cv-pour-les-ats.tsx` | Create — sample article |
| `app/blog/page.tsx` | Create — blog listing |
| `app/blog/[slug]/page.tsx` | Create — article template |
| `app/layout.tsx` | Modify — replace PostHog with Plausible |
| `components/PlausibleProvider.tsx` | Create — event tracking util |
| `app/sitemap.ts` | Modify — add /blog, /agent-ia-emploi, /blog/[slug] |
| `.env.local` | Modify — add NEXT_PUBLIC_PLAUSIBLE_DOMAIN |

---

Implementation notes for executing agent:

1. Replace PostHogProvider in layout with Plausible script tag (via next/script).
2. Keep CookieBanner component but remove PostHog initialization from it.
3. Add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=cvpro.lbframe.com` to .env.local.
4. Blog article format: export const article = { slug, title, date, description, readTime } + default export React component.
5. Blog listing: grid of article cards with title, date, description, "Lire →" link.
6. Article template: full-width reading layout, dark/light compatible.
7. Sitemap: add /blog (weekly, 0.8), /agent-ia-emploi (weekly, 0.9), dynamically add blog articles.
