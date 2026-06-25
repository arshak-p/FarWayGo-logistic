# FarWayGo Logistics — Marketing Website

Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion + Lenis.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm start
```

## Structure

- `src/app/page.tsx` — composes all sections in order
- `src/components/sections/` — Hero, TrustGrid, WhyStandOut, About, Services, Process, Contact, FinalCta, Navbar
- `src/components/ui/` — AnimatedSection, Button, EyebrowBadge, CraneIllustration, ContainerHook (custom SVG, no stock assets)
- `src/app/fonts/` — self-hosted Oswald (display) + IBM Plex Sans (body) variable fonts
- `public/images/` — logo, logo-on-dark (white wordmark variant), 3 process photos (compressed JPG)

## Brand tokens (src/app/globals.css)

- `--color-navy: #023341` / `--color-navy-deep: #061d27` — primary dark
- `--color-orange: #fd5e02` — accent (from logo)
- `--color-mist: #f6f8f9` — page background
- `--color-cream: #fdf2e0` — service card background

## Notes

- Contact form is currently front-end only (logs to UI, no backend). Wire up an API route or form service (Formspree, Resend, etc.) at `src/components/sections/Contact.tsx`'s `handleSubmit`.
- Signature scroll moment: `WhyStandOut.tsx` — a custom SVG container descends from a crane hook as the user scrolls, built with Framer Motion's `useScroll`/`useTransform` (no canvas frame-sequence — this is a 2-element parallax, not pre-rendered frames).
- Crane in the hero and the hanging container are custom SVG components, not stock photography — keeps the page fast and avoids licensing issues.
