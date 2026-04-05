# West End Therapy — Astro Website

An Astro clone of [westendtherapy.ca](https://westendtherapy.ca), built with pure Astro (no frameworks), component-scoped styles, and vanilla JS.

## Quick Start

```bash
cd west-end-therapy
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # preview production build
```

## Project Structure

```
west-end-therapy/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro       # Sticky nav with mobile hamburger
│   │   └── Footer.astro       # Multi-column footer with insurance badges
│   ├── layouts/
│   │   └── Layout.astro       # Base HTML shell (meta, fonts, Header, Footer)
│   ├── pages/
│   │   ├── index.astro        # Home — hero, services, testimonials, CTA
│   │   ├── about.astro        # About — mission, values, team cards
│   │   ├── services.astro     # Services — detailed descriptions + modalities
│   │   ├── faq.astro          # FAQ — accordion with sidebar nav
│   │   ├── contact.astro      # Contact — form + info sidebar + map
│   │   └── 404.astro          # 404 page
│   └── styles/
│       └── global.css         # Design tokens, typography, utilities
├── astro.config.mjs
└── package.json
```

## Pages

| Route        | Description                              |
|--------------|------------------------------------------|
| `/`          | Home with hero, services grid, testimonials, insurance logos |
| `/about`     | Mission statement, values, therapist team |
| `/services`  | All 6 services with descriptions + therapeutic modalities |
| `/faq`       | Accordion FAQ with category sidebar |
| `/contact`   | Contact form, office hours, crisis resources |

## Design System

All design tokens live in `src/styles/global.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--color-sage` | `#7a9e87` | Primary brand green |
| `--color-cream` | `#f7f3ee` | Section backgrounds |
| `--color-charcoal` | `#2e2e2e` | Body text |
| `--color-accent` | `#c8a87a` | CTA accent buttons |
| `--font-serif` | Playfair Display | Headings |
| `--font-sans` | Lato | Body copy |

## Customisation

- **Replace placeholder images** — search for `img-placeholder` divs in each page and swap with real `<img>` tags.
- **Update team info** — edit the `team` array in `src/pages/about.astro`.
- **Connect the contact form** — the form uses `netlify` attribute for Netlify Forms; swap for your preferred form backend.
- **Add analytics** — paste your script tag into `src/layouts/Layout.astro`.

## Deployment

Works on any static host: **Netlify**, **Vercel**, **Cloudflare Pages**, **GitHub Pages**.

```bash
npm run build   # outputs to dist/
```
