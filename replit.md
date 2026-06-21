# Bougan Villa — Boutique Holiday Rental Agency

A full-stack vacation rental management platform for Bougan Villa, a boutique agency on the Portuguese coast (Lisbon / Setúbal / Silver Coast). Two live properties: Villa Emerald (Belverde, Aroeira) and Apartamento São Martinho (Silver Coast).

## Run & Operate

- `pnpm --filter @workspace/bouganvilla run dev` — frontend dev server (port 5000)
- `pnpm --filter @workspace/api-server run dev` — API server (port 8080, build + start)
- Vite proxies `/api/*` → `localhost:8080` in dev, so frontend calls `/api/…` with no VITE_API_URL set

## Stack

- pnpm workspaces, Node.js 20, TypeScript
- **Frontend**: React 19, Vite 7, Tailwind CSS v4, Wouter, Lucide React
- **Backend**: Express 5, node-cron, pino logger, Replit PostgreSQL (`DATABASE_URL`)
- **Email**: Resend (RESEND_API_KEY + OWNERS_EMAIL secrets)
- Fonts: Cormorant Garamond (serif display) + Jost (geometric sans, weights 100–500)
- Packages: `@workspace/bouganvilla` at `artifacts/bouganvilla/`, `@workspace/api-server` at `artifacts/api-server/`

## Where things live

### Frontend
- `artifacts/bouganvilla/src/App.tsx` — route definitions; admin routes skip Navbar/Footer/LanguageProvider
- `artifacts/bouganvilla/src/data/index.ts` — static property + testimonial data (still source of truth for UI; DB used for bookings/enquiries)
- `artifacts/bouganvilla/src/pages/` — Home, Properties, PropertyDetail, Areas, Owners, About, Contact
- `artifacts/bouganvilla/src/pages/admin/` — Login, Dashboard, Enquiries, Bookings, Calendar, Revenue, OwnerStatement
- `artifacts/bouganvilla/src/components/AvailabilityCalendar.tsx` — live calendar fetching from `/api/availability/:id`
- `artifacts/bouganvilla/src/lib/i18n/` — 8-language i18n system (localStorage persistence)
- `artifacts/bouganvilla/public/photos/villa-bougainvillea/` — 12 real AVIF photos for Villa Emerald

### Backend (API Server)
- `artifacts/api-server/src/app.ts` — Express app (CORS, helmet, cookie-parser, pino)
- `artifacts/api-server/src/index.ts` — server entry; starts node-cron for iCal sync every 15 min
- `artifacts/api-server/src/routes/` — contact, properties, availability, ical, admin
- `artifacts/api-server/src/lib/auth.ts` — cookie session auth (ADMIN_EMAIL + ADMIN_PASSWORD secrets)
- `artifacts/api-server/src/lib/db.ts` — PostgreSQL pool via DATABASE_URL

## Pages & Routes

### Public
| Route | Page |
|---|---|
| `/` | Home — hero gradient, property preview, testimonials |
| `/properties` | Properties listing |
| `/properties/:id` | Detail — gallery, lightbox, highlights, availability calendar |
| `/areas` | Destinations — Setúbal + Silver Coast |
| `/areas/:id` | Destination detail |
| `/owners` | For Owners — management pitch |
| `/about` | Brand story |
| `/contact` | Contact form → POST /api/contact → PostgreSQL + Resend email |

### Admin (protected, no Navbar/Footer)
| Route | Page |
|---|---|
| `/admin/login` | Login form (ADMIN_EMAIL + ADMIN_PASSWORD) |
| `/admin` | Dashboard — KPIs, upcoming bookings, enquiries |
| `/admin/enquiries` | Enquiry management |
| `/admin/bookings` | Booking CRUD |
| `/admin/calendar` | Month calendar + iCal feed management + manual sync |
| `/admin/revenue` | Revenue charts, cost entry, owner statement generator |

### API Endpoints
| Method | Route | Purpose |
|---|---|---|
| POST | `/api/contact` | Save enquiry + send Resend email |
| POST | `/api/owner-estimate` | Rental income estimate + email |
| GET | `/api/properties` | List properties from DB |
| GET | `/api/properties/:id` | Single property |
| GET | `/api/availability/:id` | Confirmed bookings for calendar widget |
| GET | `/api/ical/:id.ics` | iCal feed generated from bookings |
| POST | `/api/sync-ical` | Pull all registered iCal feeds and upsert bookings |
| GET | `/api/admin/*` | Protected admin endpoints (session cookie) |

## Database Tables
`properties`, `bookings`, `enquiries`, `costs`, `ical_feeds`, `admin_sessions`

## Properties

| ID | Name | Type | Location | Beds | Guests |
|---|---|---|---|---|---|
| `villa-emerald` | Villa Emerald | Villa | Belverde, Aroeira, Setúbal | 3 | 6 |
| `apartamento-sao-martinho` | Apartamento São Martinho | Apartment | São Martinho, Silver Coast | 2 | 4 |

## Design System

```
--color-sand:        #F5EFE0   warm background sections
--color-terracotta:  #C96A3A   primary accent, CTAs
--color-deep-green:  #203E4E   footer, dark buttons, hero base
--color-cream:       #FAF7F2   page background
--color-charcoal:    #2B2B2B   primary text
--color-ocean:       #4A7FA5   secondary accent
```

## Secrets Required

| Secret | Purpose | Set? |
|---|---|---|
| `ADMIN_EMAIL` | Admin login email | ⏳ Pending |
| `ADMIN_PASSWORD` | Admin login password | ⏳ Pending |
| `RESEND_API_KEY` | Transactional email | ⏳ Pending |
| `OWNERS_EMAIL` | Manager notification address | ⏳ Pending |

## User preferences

- Mediterranean minimal aesthetic — warm, editorial, organic. Sun-bleached, terracotta, deep greens.
- Logo: ultra-thin all-caps Jost wordmark, terracotta separator dot — Comporta/boutique coastal feel.
- Gradients: slow, alive, flowing — Mediterranean coastal palette.
- Fonts: Cormorant Garamond for all display headings, Jost for all UI and body.
- No heavy borders, no rounded corners on key elements — clean square/rectangular geometry.

## Gotchas

- Villa Emerald photos are at `/photos/villa-bougainvillea/*.avif` (folder named bougainvillea for historical reasons)
- Apartamento São Martinho still uses Unsplash placeholders — real photos needed
- API mounts at `/api` in app.ts — sub-routes must NOT include `/api` prefix in router files
- Admin auth: `ADMIN_EMAIL` + `ADMIN_PASSWORD` checked via `checkPassword()` in `lib/auth.ts`. No hashing needed — Replit secrets are encrypted at rest
- iCal auto-sync runs every 15 min via `node-cron` in `index.ts`; also callable manually from admin Calendar → "Sync iCal"
- Cookie `sameSite: strict` + `secure: true` in production — admin login requires same-origin requests
- Vite proxy: `/api` → `http://localhost:8080` (configured in `vite.config.ts`)
- Page transition: `key={location}` is on a `<div>` wrapping `<Switch>` in App.tsx — changing this breaks transitions
- Property `id` must match route param: `villa-emerald` → `/properties/villa-emerald`
- CSS `@property` animations require Chrome 85+, Firefox 128+, Safari 16.4+
