# Bougan Villa — Boutique Holiday Rental Agency

A production-ready marketing website for Bougan Villa, a boutique vacation rental agency on the Portuguese coast (Lisbon / Setúbal / Silver Coast). Two properties live: Villa Emerald (Belverde, Aroeira) and Apartamento São Martinho (Silver Coast).

## Run & Operate

- `pnpm --filter @workspace/bouganvilla run dev` — run the frontend (port 5000)
- Frontend only — no backend yet (static data, all in `src/data/index.ts`)

## Stack

- pnpm workspaces, Node.js 20, TypeScript, React 19, Vite 7
- Styling: Tailwind CSS v4 (`@theme` block + custom CSS variables)
- Routing: Wouter (lightweight, no react-router)
- Icons: Lucide React
- Fonts: Cormorant Garamond (serif display) + Jost (geometric sans, weights 100–500)
- Package: `@workspace/bouganvilla` at `artifacts/bouganvilla/`

## Where things live

- `artifacts/bouganvilla/src/App.tsx` — route definitions + page transition wrapper
- `artifacts/bouganvilla/src/data/index.ts` — all property + testimonial data (source of truth)
- `artifacts/bouganvilla/src/pages/` — Home, Properties, PropertyDetail, Areas, Owners, About, Contact
- `artifacts/bouganvilla/src/components/Navbar.tsx` — sticky transparent→cream navbar
- `artifacts/bouganvilla/src/components/Footer.tsx` — deep-green footer
- `artifacts/bouganvilla/src/components/Logo.tsx` — inline SVG wordmark (transparent, two modes)
- `artifacts/bouganvilla/src/index.css` — CSS @property mesh gradient, brand theme, page transitions
- `artifacts/bouganvilla/public/photos/villa-bougainvillea/` — 12 real AVIF photos for Villa Emerald

## Pages

| Route | Page | Status |
|---|---|---|
| `/` | Home | ✅ Hero gradient, property preview, testimonials, about strip |
| `/properties` | Properties listing | ✅ Two cards, clickable image + Learn More |
| `/properties/:id` | Property detail | ✅ Gallery, lightbox, highlights, nearby distances |
| `/areas` | Destinations | ✅ Setúbal Coast + Silver Coast |
| `/owners` | For Owners | ✅ Management pitch |
| `/about` | About | ✅ Brand story |
| `/contact` | Contact | ✅ Form UI (mailto only — Supabase + email not yet wired) |

## Properties

| ID | Name | Type | Location | Beds | Guests | Channel |
|---|---|---|---|---|---|---|
| `villa-emerald` | Villa Emerald | Villa | Belverde, Aroeira, Setúbal | 3 | 6 | Airbnb live |
| `apartamento-sao-martinho` | Apartamento São Martinho | Apartment | São Martinho, Silver Coast | 2 | 4 | Direct only |

## Design System

```
--color-sand:        #F5EFE0   warm background sections
--color-terracotta:  #C96A3A   primary accent, CTAs
--color-deep-green:  #183448   footer, dark buttons (matches hero navy)
--color-cream:       #FAF7F2   page background
--color-charcoal:    #2B2B2B   primary text
--color-ocean:       #4A7FA5   secondary accent
```

- Mesh gradient hero: 4 CSS @property animated blobs (45s), Mediterranean coastal palette
- Logo: "BOUGAN · VILLA" in Jost 200 all-caps + wide tracking, terracotta separator dot
- Subtitle: "PROPERTY MANAGEMENT" in Jost 300, tracked
- Page transitions: `key={location}` on page wrapper → CSS `page-fade-up` (0.45s, fade + translateY)

## What is NOT yet built (needs Supabase)

- Database — all data is static in `src/data/index.ts`
- Admin panel (login, dashboard, calendar, bookings, revenue)
- iCal sync with Airbnb + Booking.com
- Availability calendar on PropertyDetail
- Contact form → database save + email notification
- Image upload via Supabase Storage

See full spec: `attached_assets/BOUGANVILLA_Architecture_and_Product_Spec.md`
See original build prompt: `attached_assets/Pasted--Bougan-Villa-Replit-AI-Build-Prompt-Full-Stack-Vacatio_1780312534697.txt`

## Environment variables needed (when Supabase is connected)

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (public, safe in frontend) |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS — contact form emails |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |

## User preferences

- Mediterranean minimal aesthetic — warm, editorial, organic. Sun-bleached, terracotta, deep greens.
- Logo: ultra-thin all-caps Jost wordmark, terracotta separator dot — Comporta/boutique coastal feel.
- Gradients: slow, alive, flowing — Mediterranean coastal palette.
- Fonts: Cormorant Garamond for all display headings, Jost for all UI and body.
- No heavy borders, no rounded corners on key elements — clean square/rectangular geometry.

## Gotchas

- Villa Emerald photos are at `/photos/villa-bougainvillea/*.avif` (folder named bougainvillea for historical reasons, property renamed to Emerald)
- Apartamento São Martinho still uses Unsplash placeholders — real photos needed
- CSS `@property` animations require Chrome 85+, Firefox 128+, Safari 16.4+ — graceful static fallback
- Wouter `<Switch>` does exact matching from top — catch-all 404 must be last
- Page transition: `key={location}` is on a `<div>` wrapping `<Switch>` in App.tsx — changing this breaks transitions
- Property `id` must match the route param: `villa-emerald` → `/properties/villa-emerald`
