# Vigilance Consulting Website — Handoff

## Goal

Marketing website for **Vigilance Consulting S.P.C.** — a Bahraini strategy, performance & leadership consulting firm (established 2014 by founder **Kamal Yousif Al-Shihaby**, partner of **The KPI Institute**, Australia). All services and certification training are delivered in **English and Arabic**.

Practices offered:
- **Strategy & Performance** — Business Planning, Balanced Scorecard, KPIs, OKRs, Benchmarking
- **Management & Development** — Employee Performance Management, Innovation, Structured OJT
- **Data & ROI** — Data Analysis, Phillips ROI Methodology, ROI Certification Training
- **Leadership** — The Leadership Challenge® / LPI®, Executive Coaching

**Primary goal:** lead generation via a 3-step qualifying contact form.

**Audience:** B2B corporate/enterprise, individual professionals; regional (Bahrain/GCC) focus.

---

## Design direction (READ THIS — it changed since the last handoff)

The original direction was **cinematic, video-led**. That has been **retired entirely.** Two intermediate experiments were tried and rejected; the final accepted look is different from both.

**What the user landed on (accepted):** a **clean, premium, WHITE, founder-centric** site. Personal-brand feel, NOT a dark dashboard and NOT video-led. Depth and motion come from **Framer Motion only — no WebGL**. Each section sits on white (`bg-paper`) with soft `brand-soft` radial blobs + a faint dot-grid as the only ambient texture.

**Hard-won preferences (do not re-litigate):**
- **No ambient moving-object background / scroll-parallax centerpiece.** The user tried a "ribbon / Möbius loop" object that travelled on scroll and removed it, saying it "isn't good and doesn't fit." Do **not** re-propose a full-screen ambient background object.
- **…but content-tied scroll motion IS wanted.** The "no ambient object" rule does *not* mean "no scroll motion." The user actively likes scroll-driven depth **anchored to real content** (the founder portrait, cards). Propose those, not background objects.
- **No WebGL** in v1. Reuse Framer Motion + Lenis; lead with the cost-effective option (build cost, bundle, bandwidth all matter to this user).
- **Keep all motion behind `prefers-reduced-motion`.**
- **Real/company copy stays literal.** When the user supplies factual corporate copy (the About page), keep it close to verbatim — don't "elevate" it into editorial lines. The premium editorial voice is only for *invented* connective copy (hero teaser, section labels).
- **Typography is tune-only.** Site uses **Inter** (body) + **Spectral** (serif headings). User chose to refine rather than swap families. Don't reflexively pitch a font swap — though a family swap stays the bigger lever if they ever revisit the "feels default" concern.

**Brand tokens** (`tailwind.config.ts`):
- `paper` `#FFFFFF`, `ink` `#0A0A0A`, `muted` `#FAFAFA`, `line` `#EAEAEA`, `subtle` `#6B6B6B`
- `brand` `#F1512A` (hover `#D8431F`, soft `#FFF1EB`)
- Serif: Spectral. Sans: Inter. Both via `next/font/google`.

Full original plan: `/Users/adam/.claude/plans/i-want-to-create-refactored-leaf.md` (note: its video/cinematic shot list is now historical — superseded by the above).

---

## Current State

> **Note:** all pages now live under `src/app/[locale]/` (see the Internationalization section). Paths below are written without the `[locale]` prefix for readability.

### Home page (`src/app/[locale]/page.tsx`)
Renders five sections, in order: **Hero → ServicePillars → Testimonial → Certifications → CTASection**.

### Hero — white, founder-led ✅
- `Hero.tsx` — white, **centered** stack: eyebrow / serif headline (`"Until the numbers move, the work isn’t done."`) / subhead / dual CTA. Copy lives in the `hero` namespace of `messages/{en,ar}.json`.
- `FounderPortrait.tsx` — the centerpiece. Transparent PNG `public/founder.png` framed in a **soft arch** (`rounded-t-full`, `from-brand-soft` gradient, bottom fade-to-white). Entrance: 3D depth-zoom + tilt + blur via Framer Motion, then `animate-float` + `TiltCard` mouse tilt. Also **scroll-coupled**: the arch rises / scales down / tilts back / fades over the first ~520px of scroll.
- `HeroBackdrop.tsx` — `brand-soft` radial blob + dot-grid, on a slow **counter-parallax** (drifts down as the portrait rises) for depth.
- Layout: the centered text block uses a negative top margin (`-mt-36` / `md:-mt-44`) so it overlaps the arch's faded lower third — the founder's face shows above the headline.
- **Scroll gotcha:** Framer Motion `useScroll({ target: ref })` throws *"Target ref is defined but not hydrated"* under Next 16 / React 19 streaming hydration. Both hero scroll components use **global `useScroll()`** + a pixel-range `useTransform` instead. (See orphaned `SectionStage.tsx` warning below.)

### Header / nav (`Header.tsx`) ✅
- **Glassmorphic pill** (`bg-paper/55 backdrop-blur-2xl border-white/50 shadow-lift`), **transparent only at the very top of the home page** (`transparent = pathname === "/" && !scrolled`); becomes the frosted pill on scroll and on every inner route.
- Bar is **`h-[72px]`** to fully contain the **centered stacked logo** (mark over "VIGILANCE CONSULTING").
- Desktop link groups **hug the centered logo** (Services·Training left, About·Insights·Contact right via `flex-1 justify-end / justify-start`); the **`LocaleSwitcher` (EN/AR toggle) + primary CTA** are pinned to the inline-end (`absolute end-3`). Animated active-link highlight (`layoutId` spring). Mobile: hamburger → animated dropdown panel (with the toggle + CTA inside). Nav labels come from the `nav` namespace.

### Section components ✅
- `ServicePillars.tsx` — sticky-left intro + right column of 4 practice cards (`TiltCard` + `Reveal`), giant ghost numbers, per-practice SVG icons, hover/focus-expand offerings list (animated `grid-rows` 0fr→1fr). `brand-soft` blob + dot-grid backdrop.
- `Certifications.tsx` — two opposite-direction **marquee rows** of accredited-program pills (pause on hover); `prefers-reduced-motion` → static wrapped grid. Program names in the `certifications` namespace of `messages/*` (11 programs).
- `SocialProof.tsx` — exports `Testimonial` (single quote) + `ClientLogos`; copy in the `socialProof` namespace (placeholder quote/clients pending real ones).
- `CTASection.tsx` — simple white band, headline + CTA. No video, no scrim.
- `PageHero.tsx` — shared page header, **light** (white w/ brand accent). Presentational — receives translated props. Used by services/training/about/insights/contact.

### Subpages ✅
- `/services` — overview grid + a detail section per practice (`#id` anchors). Marketing copy in the `services` namespace; `src/content/services.ts` now holds only `{id, number}` structure.
- `/training` — "why train with us" highlights + the certification catalog + a course-calendar CTA (external KPI Institute portal). Copy in the `training` namespace.
- `/about` — **real company copy** (verbatim corporate tone): founder origin story, KPI Institute partnership, three areas of expertise (Strategy & BSC, HR, Process Optimization). Reuses the founder arch + `TiltCard`. Copy in the `about` namespace (the old `about.ts` was removed).
- `/insights` — intentional "coming soon" empty state (acceptable at launch).
- `/contact` — hosts `LeadForm` + a "what to expect" / email-phone sidebar.

### Lead form & API ✅ (email provider still TODO)
- `LeadForm.tsx` — 3-step qualifying form (interest → company size + role → name/email/phone/message), per-step validation, submitted/error states. Step/field labels + options live in the `leadForm` namespace; `src/content/leadForm.ts` holds the structural step keys + option **ids** (the select submits ids like `1-10` / `csuite`, not localized labels).
- `src/app/api/lead/route.ts` — full server-side payload validation, then **`console.log` only**. Not localized (its validation error strings stay English). **Wiring to a real email provider (Resend recommended) is still a TODO.**

### SEO ✅
- `sitemap.ts` (emits both locales w/ hreflang), `robots.ts`, localized `generateMetadata` in `[locale]/layout.tsx` (title template + OpenGraph/Twitter) + per-page `generateMetadata` on every subpage, each with `alternates.languages` hreflang.
- **OG/Twitter images** are generated dynamically via `ImageResponse` (`src/app/[locale]/opengraph-image.tsx` + `twitter-image.tsx`) — currently **English-only** (they render `site.tagline`); localizing them is an optional later polish.

### Motion primitives (shared)
- `Reveal.tsx` — `whileInView` fade-up wrapper (reduced-motion → plain div).
- `TiltCard.tsx` — pointer-driven 3D tilt with spring (reduced-motion / touch → no tilt).

### Internationalization (EN/AR + RTL) ✅
The site is **fully bilingual** — English (default) and Arabic (RTL) — via **`next-intl` v4**.
- **Routing:** `localePrefix: "as-needed"` → English stays unprefixed (`/services`), Arabic is prefixed (`/ar/services`). All routes moved under `src/app/[locale]/`; `src/proxy.ts` (Next 16's renamed `middleware`) runs `createMiddleware`. Config lives in `src/i18n/{routing,request,navigation}.ts`. **Always import `Link` / `usePathname` from `@/i18n/navigation`** (not `next/link`) so locale prefixing works.
- **Copy:** every user-facing string lives in `messages/en.json` + `messages/ar.json` (identical key shape, ICU). Components read via `useTranslations` (client) / `getTranslations` (server). `src/content/*.ts` now holds **structure only** (ids, hrefs, form-option ids, nav keys); the old text-only content files (`about/stats/certifications/testimonials.ts`) were deleted. **Apostrophes in messages use the curly `’`** to avoid ICU's quote-escaping.
- **Lead form:** company-size/role `<select>` submit **stable ids** (e.g. `1-10`, `csuite`), not the localized label — so lead data is language-independent. `/api/lead` is unchanged and not localized (its validation error strings stay English).
- **RTL:** `<html lang dir>` set per-locale in `[locale]/layout.tsx`; physical CSS converted to logical utilities (`ms-/me-/ps-/pe-/start-/end-`); forward arrows flip via `rtl:-scale-x-100`. `globals.css` re-points `--font-sans`/`--font-serif` to Arabic faces under `[dir="rtl"]`.
- **Fonts:** Latin = Inter + Spectral; Arabic = **IBM Plex Sans Arabic** (body) + **Noto Kufi Arabic** (headings), all via `next/font/google`. Arabic faces only download on RTL pages.
- **Language toggle:** `LocaleSwitcher.tsx`, top-right in the header (and in the mobile menu); swaps locale while staying on the same path.
- **SEO:** per-page localized `generateMetadata` + `alternates.languages` hreflang; `sitemap.ts` emits both locales. The brand name **"Vigilance Consulting" stays Latin** in both languages (logo, titles, copyright).
- ⚠️ **The Arabic copy is an AI-drafted first pass.** It builds and reads correctly, but the verbatim corporate copy (About page, service details) and the certification program names **should get a native human review before going client-facing.** Edit `messages/ar.json` to refine — no code changes needed. A couple of judgment calls to confirm: "The KPI Institute" rendered as «معهد مؤشرات الأداء (The KPI Institute)», and brand kept in Latin inside Arabic sentences.

### Tech stack
Next.js `^16.2.6` (App Router, TS), React 19, Tailwind 3.4, Framer Motion `^12.40`, Lenis `^1.3` (smooth scroll, mounted via `SmoothScroll.tsx` in the locale layout; `globals.css` deliberately omits `scroll-behavior` so it doesn't fight Lenis). **`next-intl` ^4.13** for i18n. Inter + Spectral (Latin) + IBM Plex Sans Arabic + Noto Kufi Arabic (Arabic) via `next/font`. **No WebGL.** Asset tooling is now **Nano Banana (stills) + Kling (video)** — though no video currently ships.

`public/` holds `founder.png`, `logo.svg`, `logo-mark.svg`, the section backdrops (`bg-accent.webp`, `bg-cta.webp`, `bg-testimonial.webp`), and the hero ambient clip set (`bg-hero.webm` / `bg-hero.mp4` / `bg-hero-poster.jpg`, plus the untracked `bg-hero-source.mp4` original). The old `public/video/` set (~73 MB) was deleted during the video pivot.

---

## Removed / orphaned (cleanup notes)

**Deleted in the pivot away from video** (these predate `git init`, so they're unrecoverable):
- Components: `CinematicVideo`, `CinematicBackground`, `HeroScorecard`, `AuroraBackground`, `RibbonField`, `StatStrip`, `SectionStage`, `CountUp`.
- Content: `shots.ts`, and the text-only `about.ts` / `stats.ts` / `certifications.ts` / `testimonials.ts` (folded into `messages/*` during the i18n pass).
- Assets: the entire `public/video/` set (~73 MB), `public/posters/*.svg`, `public/ribbon/*.webp`.
- Tailwind aurora keyframes.

**Still present but needs attention:**
- `public/logo.svg` — **not referenced anywhere** (`Logo.tsx` renders `logo-mark.svg` + a text wordmark). Decide whether the full lockup should be used, else delete.

**Missing asset (active bug):**
- `site.partner.logoSrc` points to `/kpi-institute.svg`, but **the file is not in `public/`** → `PartnerLogo` (about) and `PartnerBadge` (hero) silently fall back to a text wordmark / seal icon. Add the real KPI Institute logo (or accept the fallback intentionally).

---

## Open Items From User (finals pending)

- **KPI Institute logo** — missing asset `/kpi-institute.svg` (see above).
- **Logo** — `logo.svg` + `logo-mark.svg` were delivered; nav/footer use only the mark + a text wordmark. Decide whether to use the full `logo.svg` lockup.
- **Arabic copy review** — `messages/ar.json` is an AI-drafted first pass; needs a native human review (esp. the About verbatim copy + certification names) before client-facing. See the Internationalization section.
- **Contact details** — `src/content/site.ts` now carries real-looking values (`info@vigilanceconsulting.com`, `+973 17226000`, `P. O. Box 16116, Adliya, Bahrain`). Confirm these are final.
- **Production domain** — `site.url` currently the live Vercel URL (`https://vigilance-consulting-website.vercel.app`); swap for the custom domain once connected (drives `metadataBase`, sitemap, hreflang).
- **Services copy** — currently strong invented marketing copy; confirm it matches reality or swap for client-supplied copy.
- **Client/testimonial quotes** — placeholder quote + client names in the `socialProof` namespace; swap for real ones when approved.
- **Email provider choice** — Resend / SendGrid / SMTP (recommend Resend).
- **Custom domain** — connect in Vercel when ready.

---

## Next Steps

### Pre-launch (Phase C)
1. **Wire `/api/lead` to a real email provider** (Resend). Currently validates + `console.log`s only.
2. **Add the missing KPI Institute logo** (or confirm text fallback is intended).
3. **Native Arabic review** of `messages/ar.json` before launch.
4. **Confirm finals:** contact details, custom domain (`site.url`), any client-supplied copy, real testimonial/clients, decide on the logo lockup.
5. **Localize the OG/Twitter images** (optional) — they're generated but English-only.
6. **A11y / contrast pass** on the light surfaces, the text-over-arch overlap in the hero, and the Arabic RTL layout.
7. **Deploy to Vercel**, connect domain.

### Optional later
- **Phase D — one WebGL signature moment** (e.g. an interactive 3D Balanced Scorecard on `/services#strategy`) as an isolated React Three Fiber route. Only if the user explicitly asks.
- ~~**Phase E — Arabic / RTL.**~~ ✅ **Done** — see the "Internationalization (EN/AR + RTL)" section above.

---

## Quick Resume Script

```bash
cd "/Users/adam/Documents/PROJECTS/Vigilance Consulting Website"
npm run dev          # dev server is not tracked here — start fresh
open http://localhost:3000        # English (default, unprefixed)
open http://localhost:3000/ar     # Arabic (RTL)
```

> This project **is now a git repo** (branch `main`, `.gitignore` present), so the restructure is reversible. Note: assets/components deleted *before* `git init` (the ~73 MB video set, the pre-i18n content files) are not in history.
