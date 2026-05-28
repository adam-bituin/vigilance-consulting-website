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

### Home page (`src/app/page.tsx`)
Renders four sections, in order: **Hero → ServicePillars → Certifications → CTASection**. (The old `StatStrip` metrics band was removed from the home page.)

### Hero — white, founder-led ✅
- `Hero.tsx` — white, **centered** stack: eyebrow / serif headline (`"Until the numbers move, the work isn't done."`) / subhead / dual CTA. Copy lives in `src/content/stats.ts` (`hero` export).
- `FounderPortrait.tsx` — the centerpiece. Transparent PNG `public/founder.png` framed in a **soft arch** (`rounded-t-full`, `from-brand-soft` gradient, bottom fade-to-white). Entrance: 3D depth-zoom + tilt + blur via Framer Motion, then `animate-float` + `TiltCard` mouse tilt. Also **scroll-coupled**: the arch rises / scales down / tilts back / fades over the first ~520px of scroll.
- `HeroBackdrop.tsx` — `brand-soft` radial blob + dot-grid, on a slow **counter-parallax** (drifts down as the portrait rises) for depth.
- Layout: the centered text block uses a negative top margin (`-mt-36` / `md:-mt-44`) so it overlaps the arch's faded lower third — the founder's face shows above the headline.
- **Scroll gotcha:** Framer Motion `useScroll({ target: ref })` throws *"Target ref is defined but not hydrated"* under Next 16 / React 19 streaming hydration. Both hero scroll components use **global `useScroll()`** + a pixel-range `useTransform` instead. (See orphaned `SectionStage.tsx` warning below.)

### Header / nav (`Header.tsx`) ✅
- **Glassmorphic pill** (`bg-paper/55 backdrop-blur-2xl border-white/50 shadow-lift`), **transparent only at the very top of the home page** (`transparent = pathname === "/" && !scrolled`); becomes the frosted pill on scroll and on every inner route.
- Bar is **`h-[72px]`** to fully contain the **centered stacked logo** (mark over "VIGILANCE CONSULTING").
- Desktop link groups **hug the centered logo** (Services·About left, Insights·Contact right via `flex-1 justify-end / justify-start`); primary CTA pinned far-right (`absolute right-3`). Animated active-link highlight (`layoutId` spring). Mobile: hamburger → animated dropdown panel.

### Section components ✅
- `ServicePillars.tsx` — sticky-left intro + right column of 4 practice cards (`TiltCard` + `Reveal`), giant ghost numbers, per-practice SVG icons, hover/focus-expand offerings list (animated `grid-rows` 0fr→1fr). `brand-soft` blob + dot-grid backdrop.
- `Certifications.tsx` — two opposite-direction **marquee rows** of accredited-program pills (pause on hover); `prefers-reduced-motion` → static wrapped grid. Content in `src/content/certifications.ts` (11 real program names).
- `CTASection.tsx` — simple white band, headline + CTA. No video, no scrim.
- `PageHero.tsx` — shared page header, now **light** (white w/ brand accent — flipped from the old dark version). Used by services/about/insights/contact.

### Subpages ✅
- `/services` — overview grid + a detail section per practice (`#id` anchors). Substantive marketing copy in `src/content/services.ts`.
- `/about` — **real company copy** (verbatim corporate tone): founder origin story, KPI Institute partnership, three areas of expertise (Strategy & BSC, HR, Process Optimization). Reuses the founder arch + `TiltCard`. Copy in `src/content/about.ts`.
- `/insights` — intentional "coming soon" empty state (acceptable at launch).
- `/contact` — hosts `LeadForm` + a "what to expect" / email-phone sidebar.

### Lead form & API ✅ (email provider still TODO)
- `LeadForm.tsx` — 3-step qualifying form (interest → company size + role → name/email/phone/message), per-step validation, submitted/error states. Options in `src/content/leadForm.ts`.
- `src/app/api/lead/route.ts` — full server-side payload validation, then **`console.log` only**. **Wiring to a real email provider (Resend recommended) is still a TODO.**

### SEO ✅ (OG image still missing)
- `sitemap.ts`, `robots.ts`, root `layout.tsx` metadata (title template + OpenGraph/Twitter), and per-page `metadata` exports on all four subpages.
- **No OG image asset** — `summary_large_image` is declared but there's no image to serve.

### Motion primitives (shared)
- `Reveal.tsx` — `whileInView` fade-up wrapper (reduced-motion → plain div).
- `TiltCard.tsx` — pointer-driven 3D tilt with spring (reduced-motion / touch → no tilt).
- `CountUp.tsx` — `useInView` animated number counter. **Only consumed by the now-unused `StatStrip` — effectively orphaned** (see below).

### Tech stack
Next.js `^16.2.6` (App Router, TS), React 19, Tailwind 3.4, Framer Motion `^12.40`, Lenis `^1.3` (smooth scroll, mounted via `SmoothScroll.tsx` in root layout; `globals.css` deliberately omits `scroll-behavior` so it doesn't fight Lenis). Inter + Spectral via `next/font`. **No WebGL.** Asset tooling is now **Nano Banana (stills) + Kling (video)** — though no video currently ships.

`public/` is now **~348 KB total** (down from ~73 MB) — only `founder.png`, `logo.svg`, `logo-mark.svg`.

---

## Removed / orphaned (cleanup notes)

**Deleted in the pivot away from video** (no git history — this is *not* a git repo, so these are unrecoverable):
- Components: `CinematicVideo`, `CinematicBackground`, `HeroScorecard`, `AuroraBackground`, `RibbonField`.
- Content: `shots.ts` (the 12-slot video registry).
- Assets: the entire `public/video/` set (~73 MB), `public/posters/*.svg`, `public/ribbon/*.webp`.
- Tailwind aurora keyframes.

**Still present but orphaned / needs attention:**
- `src/components/StatStrip.tsx` — removed from the home page; file remains, unused. Pulls in `CountUp`, so `CountUp` is only reachable through it.
- `src/components/SectionStage.tsx` — unused, **and ships the broken `useScroll({ target: ref })` pattern** that throws under Next 16 / React 19 hydration. Do **not** reuse as-is; rewrite to global `useScroll()` first.
- `public/logo.svg` — **not referenced anywhere** (`Logo.tsx` renders `logo-mark.svg` + a text wordmark). Decide whether the full lockup should be used, else delete.
- `src/content/stats.ts` `stats[]` — the 4 placeholder metrics are no longer rendered anywhere (only the `hero` export is used). Decide if a stats band returns before wiring real numbers.

**Missing asset (active bug):**
- `about.ts` references `/kpi-institute.svg` for the partnership section, but **the file is not in `public/`** → `PartnerLogo` silently falls back to a text wordmark. Add the real KPI Institute logo (or accept the text fallback intentionally).

---

## Open Items From User (finals pending)

- **KPI Institute logo** — missing asset `/kpi-institute.svg` (see above).
- **Logo** — `logo.svg` + `logo-mark.svg` were delivered; nav/footer use only the mark + a text wordmark. Decide whether to use the full `logo.svg` lockup.
- **Contact email/phone** — still placeholders in `src/content/site.ts` (`hello@vigilance.consulting`, `+1 (555) 010-0100`). Note: this is a **Bahrain** firm — phone should likely be `+973…`.
- **Production domain** — `site.url` is a placeholder (`https://vigilance.consulting`); also drives `metadataBase` + sitemap.
- **Real stat numbers** — if a metrics section returns (4 placeholders in `stats.ts`, flagged `placeholder: true`).
- **Services copy** — currently strong invented marketing copy; confirm it matches reality or swap for client-supplied copy.
- **Client/testimonial quotes** — none on the site currently.
- **Email provider choice** — Resend / SendGrid / SMTP (recommend Resend).
- **Hosting + domain** — deferred until ready to ship (Vercel recommended).

---

## Next Steps

### Pre-launch (Phase C)
1. **Wire `/api/lead` to a real email provider** (Resend). Currently validates + `console.log`s only.
2. **Add the missing KPI Institute logo** (or confirm text fallback is intended).
3. **Swap placeholders for finals:** contact email/phone (Bahrain number), production domain (`site.url`), any client-supplied copy, decide on the logo lockup + whether a stats band returns.
4. **Add an OG image** (Twitter/OG metadata declares `summary_large_image` but no image exists).
5. **Cleanup:** delete orphaned `StatStrip` + `CountUp` (if no stats band returns), `SectionStage`, unused `public/logo.svg`; add a `.gitignore` and `git init` (project is not yet under version control — risky given assets were already lost once).
6. **A11y / contrast pass** on the new light surfaces and the text-over-arch overlap in the hero.
7. **Deploy to Vercel**, connect domain.

### Optional later
- **Phase D — one WebGL signature moment** (e.g. an interactive 3D Balanced Scorecard on `/services#strategy`) as an isolated React Three Fiber route. Only if the user explicitly asks.
- **Phase E — Arabic / RTL.** The firm delivers bilingually; a focused i18n pass (`next-intl` or built-in routing) once translations are ready.

---

## Quick Resume Script

```bash
cd "/Users/adam/Documents/PROJECTS/Vigilance Consulting Website"
npm run dev          # dev server is not tracked here — start fresh
open http://localhost:3000
```

> This project is **not a git repo.** There is no history to fall back on — a ~73 MB video set was already deleted unrecoverably during the pivot. Consider `git init` before further large changes.
