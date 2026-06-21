# Bougan Villa — Architecture & Implementation Plan
> Version 2.0 · June 2026 · Clean baseline after MIAW removal

---

## What Exists Today

### Live Website (`artifacts/bouganvilla`) — ✅ Done
| Route | Page | Status |
|---|---|---|
| `/` | Home — hero gradient, property strip, testimonials | ✅ |
| `/properties` | Listing — two property cards | ✅ |
| `/properties/:id` | Detail — gallery, lightbox, highlights, nearby | ✅ |
| `/areas` | Destinations — Setúbal + Silver Coast | ✅ |
| `/areas/:id` | Destination detail | ✅ |
| `/owners` | For Owners — pitch + Owner Estimate wizard | ✅ |
| `/about` | Brand story | ✅ |
| `/contact` | Contact form (mailto only, not wired) | ⚠️ |

### API Server (`artifacts/api-server`) — ✅ Lean
| Route | Purpose | Status |
|---|---|---|
| `GET /api/healthz` | Health check | ✅ |
| `POST /api/owner-estimate` | Rental income calculator + Resend email | ✅ |

### Properties
| ID | Name | Type | Location | Beds | Guests | Channel |
|---|---|---|---|---|---|---|
| `villa-emerald` | Villa Emerald | Villa | Belverde, Aroeira, Setúbal | 3 | 6 | Airbnb ✅ |
| `apartamento-sao-martinho` | Apartamento São Martinho | Apartment | São Martinho, Silver Coast | 2 | 4 | Direct only |

### What Is NOT Yet Built
- Database (all data is static in `src/data/index.ts`)
- Admin panel / login
- Availability calendar with real data
- Contact form → database + email
- iCal sync with Airbnb / Booking.com
- Owner statements / revenue reporting
- Property photo management

---

## Target Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     EXTERNAL CHANNELS                            │
│         Airbnb (iCal + future API)   Booking.com (iCal)         │
└────────────────────────┬─────────────────────┬───────────────────┘
                         │  iCal pull/push      │
                         ▼                      ▼
┌──────────────────────────────────────────────────────────────────┐
│                  BOUGAN VILLA BACKEND                            │
│                                                                  │
│  Express API Server (port 8080)                                  │
│  ├── POST /api/contact          → Resend email + DB save         │
│  ├── POST /api/owner-estimate   → Calc + Resend email            │
│  ├── GET  /api/properties       → from Supabase                  │
│  ├── GET  /api/availability/:id → from Supabase bookings table   │
│  ├── GET  /api/ical/:id.ics     → iCal feed generated from DB    │
│  └── /api/admin/*              → Protected admin routes          │
│                                                                  │
│  Cron Job (every 15 min)                                         │
│  └── Pull Airbnb/Booking.com iCal → upsert blocked_dates        │
│                                                                  │
└──────────────────────────┬───────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                  SUPABASE (PostgreSQL + Auth + Storage)          │
│                                                                  │
│  Tables: properties · bookings · ical_feeds · costs · owners    │
│  Auth:   manager login (email + password)                        │
│  Storage: property photos                                        │
└──────────────────────────┬───────────────────────────────────────┘
                           │
              ┌────────────┴──────────────┐
              ▼                           ▼
  ┌─────────────────────┐    ┌────────────────────────────┐
  │  Public Website     │    │  Admin Panel (/admin)       │
  │  bouganvilla.com    │    │  Password-protected         │
  │                     │    │  Calendar · Bookings        │
  │  - Availability     │    │  Revenue · Properties       │
  │    calendar widget  │    │  Owner statements           │
  │  - Contact form     │    └────────────────────────────┘
  │  - Owner wizard     │
  └─────────────────────┘
```

---

## Database Schema (Supabase PostgreSQL)

```sql
-- Properties (replaces static data/index.ts)
CREATE TABLE properties (
  id              TEXT PRIMARY KEY,           -- 'villa-emerald'
  name            TEXT NOT NULL,
  type            TEXT NOT NULL,              -- 'villa' | 'apartment'
  location        TEXT NOT NULL,
  area            TEXT NOT NULL,              -- 'Setúbal Coast' | 'Silver Coast'
  beds            INT NOT NULL,
  guests          INT NOT NULL,
  description     TEXT,
  highlights      JSONB,                      -- array of feature strings
  nearby          JSONB,                      -- distances object
  base_price_eur  NUMERIC(10,2),
  airbnb_url      TEXT,
  active          BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- Bookings (calendar source of truth)
CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id     TEXT NOT NULL REFERENCES properties(id),
  channel         TEXT NOT NULL,             -- 'airbnb' | 'booking_com' | 'direct' | 'owner_block'
  channel_ref     TEXT,                      -- external booking ID
  guest_name      TEXT,
  guest_email     TEXT,
  check_in        DATE NOT NULL,
  check_out       DATE NOT NULL,
  guests_count    INT,
  nightly_rate    NUMERIC(10,2),
  total_gross     NUMERIC(10,2),
  channel_fee_pct NUMERIC(5,2),
  net_revenue     NUMERIC(10,2),
  status          TEXT NOT NULL DEFAULT 'confirmed', -- confirmed | cancelled | checked_in | checked_out | enquiry | blocked
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  -- Prevent double-booking
  EXCLUDE USING gist (
    property_id WITH =,
    daterange(check_in, check_out, '[)') WITH &&
  ) WHERE (status NOT IN ('cancelled'))
);

-- iCal feed tracking
CREATE TABLE ical_feeds (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   TEXT NOT NULL REFERENCES properties(id),
  channel       TEXT NOT NULL,
  ical_url      TEXT NOT NULL,
  last_synced   TIMESTAMPTZ,
  last_etag     TEXT,
  error_count   INT DEFAULT 0
);

-- Costs per property
CREATE TABLE costs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   TEXT REFERENCES properties(id),   -- NULL = agency-wide
  category      TEXT NOT NULL,                    -- 'cleaning' | 'maintenance' | 'agency_fee' | 'utility' | 'insurance' | 'other'
  description   TEXT NOT NULL,
  amount        NUMERIC(10,2) NOT NULL,
  date          DATE NOT NULL,
  booking_id    UUID REFERENCES bookings(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Enquiries from contact form
CREATE TABLE enquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   TEXT REFERENCES properties(id),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  message       TEXT NOT NULL,
  check_in      DATE,
  check_out     DATE,
  guests        INT,
  status        TEXT DEFAULT 'new',             -- 'new' | 'replied' | 'converted' | 'closed'
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

---

## Implementation Phases

---

### Phase 1 — Contact Form + Enquiry Database
**Time estimate: 1–2 days**
**Value: Immediate — capture leads instead of losing them to mailto**

What to build:
- Wire the Contact page form to `POST /api/contact`
- API saves enquiry to Supabase `enquiries` table
- Send notification email to owner via Resend
- Send confirmation email to guest via Resend
- Show success state in UI

Files to touch:
- `artifacts/api-server/src/routes/` → add `contact.ts`
- `artifacts/api-server/src/routes/index.ts` → register contact route
- `artifacts/bouganvilla/src/pages/Contact.tsx` → replace mailto with fetch

Environment variables needed:
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- `RESEND_API_KEY` (already in package, just needs the secret)
- `FROM_EMAIL` e.g. `hello@bouganvilla.com`
- `OWNERS_EMAIL` e.g. `manager@bouganvilla.com`

---

### Phase 2 — Supabase as Property Data Source
**Time estimate: 2–3 days**
**Value: Properties editable without code deployments**

What to build:
- Seed Supabase `properties` table with current static data
- Add API endpoints: `GET /api/properties`, `GET /api/properties/:id`
- Replace static `data/index.ts` imports with API calls in frontend (React Query)
- Property detail page reads from API
- Availability calendar component reads from `bookings` table

Files to touch:
- `artifacts/api-server/src/routes/` → add `properties.ts`
- `artifacts/bouganvilla/src/data/` → replace with API hooks
- `artifacts/bouganvilla/src/pages/PropertyDetail.tsx` → wire availability

---

### Phase 3 — iCal Sync Engine
**Time estimate: 3–5 days**
**Value: Real availability data — no more double-booking risk**

What to build:
- Cron job (Express route called by external cron or Supabase pg_cron): `GET /api/sync-ical`
- Pulls each property's Airbnb `.ics` URL from `ical_feeds` table
- Parses VEVENT blocks, upserts into `bookings` with `channel = 'airbnb'`
- Generates Supabase iCal feeds: `GET /api/ical/:propertyId.ics`
- Import Supabase feed back into Airbnb + Booking.com so they see blocks

What the manager needs to do once:
1. In Airbnb: Settings → Availability → Export calendar → copy `.ics` URL
2. Insert that URL into `ical_feeds` table for each property
3. In Booking.com: import the Supabase-generated iCal URL

Files to touch:
- `artifacts/api-server/src/routes/` → add `ical.ts` and `sync.ts`
- `artifacts/api-server/src/lib/` → add `icalParser.ts`

---

### Phase 4 — Admin Panel
**Time estimate: 1–2 weeks**
**Value: Manager can see and manage everything in one place**

What to build:

#### 4a — Login (Supabase Auth)
- `/admin/login` page — email + password via Supabase Auth
- Session cookie, protected route wrapper
- Single manager account (no self-signup)

#### 4b — Dashboard
- KPI strip: this month revenue, occupancy rate, upcoming bookings, pending enquiries
- Quick links to calendar, bookings, enquiries

#### 4c — Calendar (master view)
- Month view: all properties on one timeline
- Colour-coded by channel: Airbnb=orange, Booking.com=blue, Direct=green, Owner block=grey
- Click booking → guest details panel
- Click empty date → create manual booking or owner block

#### 4d — Bookings Table
- Sortable/filterable list of all bookings
- Columns: Property · Channel · Guest · Dates · Nights · Gross · Fee · Net · Status
- Edit booking details, add costs, mark checked-in/out

#### 4e — Enquiries
- List of contact form submissions
- Mark as replied/converted, add notes
- One-click reply via email

Files to build:
- `artifacts/bouganvilla/src/pages/admin/` → Login, Dashboard, Calendar, Bookings, Enquiries

---

### Phase 5 — Revenue & Owner Statements
**Time estimate: 3–5 days**
**Value: Professional owner reporting — key to retaining property owners**

What to build:
- Revenue tab: per-property monthly income breakdown
- Costs entry: add cleaning, maintenance, utilities, etc.
- Owner statement generator: auto-calculated monthly PDF/print view

Statement format:
```
BOUGAN VILLA — Monthly Owner Statement
Villa Emerald · June 2026

BOOKINGS                         Gross     Channel Fee    Net
BV-240  14–21 Jun (7n) Airbnb   €1,610    €241           €1,369
BV-241  21–28 Jun (7n) Direct   €1,400    €0             €1,400
                                 ─────     ─────          ─────
                                 €3,010    €241           €2,769

COSTS
Cleaning (x2)                                             -€160
Pool maintenance                                          -€80
Agency management (18%)                                   -€498
                                                          ─────
NET TO OWNER                                              €2,031
```

---

### Phase 6 — Public Availability + Direct Booking (Future)
**Time estimate: 2–3 weeks**
**Value: Direct bookings = highest margin (no Airbnb 15% fee)**

What to build:
- Availability calendar widget on property detail pages (reads from Supabase)
- Booking enquiry form with date picker
- Optional: Stripe payment for direct bookings
- Auto-block calendar on all channels when direct booking confirmed

Channel manager evaluation trigger: **5+ properties → evaluate Smoobu (~€25/mo)**

---

## Environment Variables Needed

| Variable | Purpose | Phase |
|---|---|---|
| `SUPABASE_URL` | Supabase project URL | Phase 1 |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side DB access | Phase 1 |
| `RESEND_API_KEY` | Transactional email | Phase 1 |
| `FROM_EMAIL` | Sender address | Phase 1 |
| `OWNERS_EMAIL` | Manager notification address | Phase 1 |
| `VITE_SUPABASE_URL` | Client-side (read-only queries) | Phase 2 |
| `VITE_SUPABASE_ANON_KEY` | Client-side anon key | Phase 2 |
| `CRON_SECRET` | Protect the sync endpoint | Phase 3 |
| `STRIPE_SECRET_KEY` | Direct payments | Phase 6 |

---

## Decision Log

| Decision | Rationale |
|---|---|
| Supabase over Replit DB | RLS, Auth, Storage, Edge Functions, and iCal cron all in one. Designed for this exact use case. |
| iCal over Airbnb API | iCal works today with zero credentials. Airbnb Partner API requires 5+ listings and weeks of approval. |
| Resend for email | Already installed, clean API, generous free tier. |
| No channel manager yet | Worth building in-house up to 4–5 properties. Evaluate Smoobu/Lodgify at 5+ properties. |
| Admin in same frontend | Simpler deployment. Protected by Supabase Auth session. Separate subdomain optional later. |
| Commission model (18%) | Incentive-aligned with owners. Industry standard 15–20%. |

---

## Priority Order (Do These First)

```
1. Phase 1 — Contact Form        [1-2 days]  IMMEDIATE BUSINESS VALUE
2. Phase 2 — Supabase Properties [2-3 days]  FOUNDATION FOR EVERYTHING
3. Phase 3 — iCal Sync           [3-5 days]  PREVENT DOUBLE-BOOKING
4. Phase 4 — Admin Panel         [1-2 weeks] OPERATIONAL CONTROL
5. Phase 5 — Owner Statements    [3-5 days]  OWNER RETENTION
6. Phase 6 — Direct Booking      [2-3 weeks] REVENUE OPTIMISATION
```

**Total to a fully operational rental agency platform: ~6–8 weeks of focused building.**
