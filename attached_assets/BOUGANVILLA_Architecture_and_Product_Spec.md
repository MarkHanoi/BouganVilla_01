# Bougan Villa — Architecture, Orchestration & Product Spec

> Version 1.0 · June 2026  
> Bougan Villa Property Management — Lisbon / Setúbal Coast / Silver Coast

---

## Table of Contents

1. [Current Stack & Architecture](#1-current-stack--architecture)
2. [System Orchestration](#2-system-orchestration)
3. [Booking Alignment — How It All Connects](#3-booking-alignment--how-it-all-connects)
4. [Airbnb & Booking.com Integration](#4-airbnb--bookingcom-integration)
5. [Calendar Synchronisation Engine](#5-calendar-synchronisation-engine)
6. [Manager Master Screen](#6-manager-master-screen)
7. [Revenue & Cost Management](#7-revenue--cost-management)
8. [Future Roadmap — Phased Delivery](#8-future-roadmap--phased-delivery)
9. [Infrastructure & Cost Estimates](#9-infrastructure--cost-estimates)
10. [Data Model Reference](#10-data-model-reference)

---

## 1. Current Stack & Architecture

### Frontend (Live)

| Layer | Technology | Notes |
|---|---|---|
| Framework | React 19 + Vite 7 | Port 5000 (dev), static build for prod |
| Styling | Tailwind CSS v4 | `@theme` block, CSS `@property` animations |
| Routing | Wouter | Lightweight, no react-router |
| Fonts | Jost 100–500 + Cormorant Garamond | Google Fonts |
| Icons | Lucide React | Consistent stroke-weight icon set |
| Hosting target | Replit Deploy → static CDN | No SSR required |

### Current Pages

```
/                    Home — hero gradient, property preview strip, testimonials
/properties          Property listing — two cards, clickable image + Learn More
/properties/:id      Property detail — gallery, lightbox, highlights, nearby, CTA
/areas               Destinations — Setúbal Coast + Silver Coast
/owners              For Owners — management pitch
/about               Brand story
/contact             Contact form (currently mailto)
```

### Current Property Data

Two properties, defined in `artifacts/bouganvilla/src/data/index.ts`:

| ID | Name | Type | Location | Beds | Guests | Live on Airbnb |
|---|---|---|---|---|---|---|
| `villa-emerald` | Villa Emerald | Villa | Belverde, Aroeira, Setúbal | 3 | 6 | ✅ Yes |
| `apartamento-sao-martinho` | Apartamento São Martinho | Apartment | São Martinho, Silver Coast | 2 | 4 | ❌ Not yet |

### What Is NOT Yet Built

- Backend / database (all data is static)
- Auth / admin panel
- Real booking / availability system
- Channel sync with Airbnb or Booking.com
- Payment processing
- Email notifications
- Revenue reporting

---

## 2. System Orchestration

### Target Architecture (Next 6 Months)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        EXTERNAL CHANNELS                            │
│   ┌───────────────┐         ┌──────────────────┐                   │
│   │  Airbnb API   │         │  Booking.com API  │   (future: VRBO) │
│   │  + iCal feed  │         │  + iCal feed      │                   │
│   └───────┬───────┘         └────────┬─────────┘                   │
└───────────┼──────────────────────────┼─────────────────────────────┘
            │                          │
            ▼                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   BOUGAN VILLA BACKEND (Supabase)                   │
│                                                                     │
│  ┌─────────────────┐   ┌──────────────────┐   ┌─────────────────┐  │
│  │  Calendar Sync  │   │  Booking Engine  │   │  Revenue Ledger │  │
│  │  (cron job)     │   │  (availability + │   │  (income/costs/ │  │
│  │  every 15 min   │   │   hold/confirm)  │   │   channel fees) │  │
│  └────────┬────────┘   └────────┬─────────┘   └────────┬────────┘  │
│           │                    │                        │           │
│           ▼                    ▼                        ▼           │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    Supabase PostgreSQL                       │   │
│  │  properties · bookings · blocked_dates · owners · revenue   │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────────────┐   ┌──────────────────┐                        │
│  │   Resend Email   │   │  Supabase Auth   │                        │
│  │  (guest + owner) │   │  (admin login)   │                        │
│  └──────────────────┘   └──────────────────┘                        │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
        ┌──────────────────┐    ┌──────────────────────────┐
        │  Bougan Villa    │    │  Admin / Manager Screen  │
        │  Public Website  │    │  (password protected)    │
        │  (current site)  │    │  Calendar · Income · CRM │
        └──────────────────┘    └──────────────────────────┘
```

### Key Principles

1. **Single source of truth** — Supabase is the master calendar. Airbnb and Booking.com are treated as channels that read from and write to it, never the other way round.
2. **Block-before-confirm** — when any channel receives a booking enquiry, it immediately blocks the dates in Supabase before confirming back to the channel. Prevents double-booking.
3. **Async sync** — iCal polling runs every 15 minutes (acceptable latency for short-stay rentals). Real-time webhooks from Airbnb are preferred when available.
4. **Owner-first reporting** — all revenue and cost data is structured to produce owner statements (monthly PDF or dashboard view) as a first-class output.

---

## 3. Booking Alignment — How It All Connects

### Guest Booking Journey

```
Guest lands on bouganvilla.com
        │
        ├── Clicks "View on Airbnb" → books on Airbnb
        │         Airbnb webhook (or iCal) → Supabase calendar blocked
        │
        ├── Clicks "Enquire" (direct) → enquiry form → email to manager
        │         Manager confirms → Supabase manual block + guest email
        │
        └── (future) Inline availability widget → Stripe payment
                  Booking confirmed → Supabase blocked + all channels updated
```

### Booking States

| State | Meaning | Action |
|---|---|---|
| `available` | No bookings, no blocks | Show as open on all channels |
| `enquiry` | Guest enquired, not confirmed | Soft block for 24–48h |
| `confirmed` | Payment or channel confirmation received | Hard block all channels |
| `blocked` | Owner personal use or maintenance | Hard block all channels |
| `cancelled` | Cancellation after confirmation | Unblock, log revenue impact |
| `checked_in` | Guest in property | No calendar change |
| `checked_out` | Property returned to available | Trigger cleaning task |

### Double-Booking Prevention

The critical rule: **all external channels must push to Supabase before confirming**. The flow:

```
Airbnb receives booking request
  → Airbnb calls webhook (or sync job reads iCal)
  → Supabase tries INSERT into bookings WHERE no overlap
  → If no conflict: INSERT succeeds, return "accepted" to Airbnb
  → If conflict: INSERT fails, return "declined" to Airbnb
  → Airbnb notifies guest of unavailability
```

For direct bookings through the website:
```
Guest submits booking form
  → API checks Supabase for conflicts
  → If available: create booking record + Stripe payment intent
  → On payment success: confirm booking + block all channels via iCal push
```

---

## 4. Airbnb & Booking.com Integration

### Approach A — iCal (Immediate, Works Today)

Both Airbnb and Booking.com export iCal feeds for each listing. This is the fastest integration, available with zero API credentials.

**How it works:**
1. Airbnb → Settings → Availability → Export Calendar → copy `.ics` URL
2. Bougan Villa sync job fetches that URL every 15 minutes
3. Parses VEVENT blocks → writes blocked dates to Supabase
4. Supabase generates its own iCal feed for each property
5. Airbnb and Booking.com import that feed → blocked there too

```
Airbnb .ics URL  ──→  Sync job (cron)  ──→  Supabase blocked_dates
Supabase .ics    ←──  Sync job pushes  ←──  Booking.com imports
```

**Limitations:** 15-minute latency window. Extremely low risk in practice for weekly rentals.

**iCal format for Supabase-generated feed:**
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Bougan Villa//EN
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260614
DTEND;VALUE=DATE:20260621
SUMMARY:Bougan Villa - Reserved
UID:booking-uuid@bouganvilla.com
END:VEVENT
END:VCALENDAR
```

### Approach B — Airbnb API (Official, Applied Access)

Airbnb has a Partner API for property managers. Requires application and approval (typically for managers with 5+ listings). This gives:

- Real-time webhooks for new bookings, modifications, cancellations
- Programmatic pricing updates (dynamic pricing)
- Messaging API (reply to guests from admin screen)
- Listing management (update descriptions, photos, rules)
- Financial reports (payout data)

**Apply at:** https://www.airbnb.com/partner  
**Requirements:** Active host account, multiple listings, verifiable business.

**Key Airbnb API endpoints once approved:**

| Endpoint | Purpose |
|---|---|
| `GET /v2/listings` | Fetch all managed listings |
| `GET /v2/calendar_operations` | Read availability per listing |
| `PUT /v2/calendar_operations` | Block/unblock dates |
| `GET /v2/reservations` | Fetch booking details |
| `POST /v2/messages` | Send messages to guests |
| `GET /v2/transaction_history` | Payout and earnings data |

### Approach C — Booking.com Connectivity API

Booking.com offers a Connectivity API (previously called "Extranet API") for property managers:

- Available through certified Channel Manager partners (Lodgify, Smoobu, Hostaway)
- Or directly via Booking.com Connectivity program (requires registration)
- Provides real-time availability, rates, and reservations sync

**Apply at:** https://partner.booking.com  

### Recommended Path for Bougan Villa (Now → 6 Months)

| Phase | Action | Timeline |
|---|---|---|
| Now | Set up iCal export from Airbnb, import into Supabase sync job | Week 1 |
| Month 1 | Generate Supabase iCal feed, import back into Airbnb + Booking.com | Month 1 |
| Month 2–3 | Build admin calendar UI reading from Supabase | Month 2–3 |
| Month 4–6 | Apply for Airbnb Partner API as portfolio grows | Month 4–6 |
| 6–12 months | Evaluate Hostaway / Lodgify as channel manager if 5+ properties | 6–12 mo |

### Channel Manager Option (Alternative to Building In-House)

If the portfolio grows to 4+ properties, a dedicated channel manager is worth evaluating:

| Tool | Monthly Cost | Airbnb Sync | Booking.com | Direct Booking | Notes |
|---|---|---|---|---|---|
| **Smoobu** | €25–50/mo | ✅ Real-time | ✅ Real-time | ✅ Widget | Best for small PM |
| **Lodgify** | €12–35/mo | ✅ Real-time | ✅ Real-time | ✅ Full site | Has website builder |
| **Hostaway** | ~€100/mo | ✅ API | ✅ API | ✅ | Best for 10+ properties |
| **Guesty** | ~€200/mo | ✅ API | ✅ API | ✅ | Enterprise |

**Decision rule:** Build in-house up to 4 properties. Evaluate channel manager at 5+ properties, especially if iCal latency becomes a real operational problem.

---

## 5. Calendar Synchronisation Engine

### Database Tables (Supabase)

```sql
-- Core calendar truth
CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id     TEXT NOT NULL REFERENCES properties(id),
  channel         TEXT NOT NULL, -- 'airbnb' | 'booking_com' | 'direct' | 'owner_block'
  channel_ref     TEXT,          -- external booking ID from channel
  guest_name      TEXT,
  guest_email     TEXT,
  check_in        DATE NOT NULL,
  check_out       DATE NOT NULL,
  guests_count    INT,
  nightly_rate    NUMERIC(10,2),
  total_gross     NUMERIC(10,2), -- what guest paid (on Airbnb)
  channel_fee_pct NUMERIC(5,2),  -- e.g. 15.0 for Airbnb 15%
  net_revenue     NUMERIC(10,2), -- gross minus channel fee
  status          TEXT NOT NULL DEFAULT 'confirmed',
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),

  -- Prevent overlapping bookings for same property
  EXCLUDE USING gist (
    property_id WITH =,
    daterange(check_in, check_out, '[)') WITH &&
  ) WHERE (status NOT IN ('cancelled'))
);

-- iCal sync state per property per channel
CREATE TABLE ical_feeds (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   TEXT NOT NULL REFERENCES properties(id),
  channel       TEXT NOT NULL,
  ical_url      TEXT NOT NULL,    -- URL we pull from
  last_synced   TIMESTAMPTZ,
  last_etag     TEXT,             -- HTTP ETag for change detection
  error_count   INT DEFAULT 0
);

-- Owner cost tracking
CREATE TABLE costs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id   TEXT,             -- NULL = agency-wide cost
  category      TEXT NOT NULL,    -- 'cleaning' | 'maintenance' | 'agency_fee' | 'utility' | 'insurance' | 'other'
  description   TEXT NOT NULL,
  amount        NUMERIC(10,2) NOT NULL,
  currency      TEXT DEFAULT 'EUR',
  date          DATE NOT NULL,
  booking_id    UUID REFERENCES bookings(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);
```

### Sync Job (Edge Function or Cron)

```typescript
// supabase/functions/sync-ical/index.ts
// Runs every 15 minutes via pg_cron or external cron

async function syncAllFeeds() {
  const feeds = await supabase.from('ical_feeds').select('*');

  for (const feed of feeds.data) {
    const ical = await fetch(feed.ical_url, {
      headers: { 'If-None-Match': feed.last_etag ?? '' }
    });

    if (ical.status === 304) continue; // unchanged

    const events = parseIcal(await ical.text());

    for (const event of events) {
      // Upsert by channel_ref — idempotent
      await supabase.from('bookings').upsert({
        property_id: feed.property_id,
        channel: feed.channel,
        channel_ref: event.uid,
        check_in: event.dtstart,
        check_out: event.dtend,
        status: 'confirmed',
        guest_name: event.summary ?? 'External Booking',
      }, { onConflict: 'channel,channel_ref' });
    }

    await supabase.from('ical_feeds').update({
      last_synced: new Date().toISOString(),
      last_etag: ical.headers.get('etag'),
      error_count: 0
    }).eq('id', feed.id);
  }
}
```

---

## 6. Manager Master Screen

### Overview

A password-protected admin panel at `/admin` (or separate subdomain `admin.bouganvilla.com`). Accessible only to the Bougan Villa manager. No guest-facing content.

### Screen Layout

```
┌──────────────────────────────────────────────────────────────────────┐
│  BOUGAN VILLA  Admin                              [Manager name] [▼] │
├──────────────────────────────────────────────────────────────────────┤
│  [Dashboard] [Calendar] [Bookings] [Revenue] [Properties] [Owners]  │
└──────────────────────────────────────────────────────────────────────┘

DASHBOARD TAB
┌──────────────┬───────────────┬───────────────┬────────────────────┐
│ This month   │ Next 30 days  │ Occupancy     │ Pending actions    │
│ €4,200 net   │ 18 nights     │ Villa 74%     │ 1 enquiry reply    │
│ ↑ 12% vs LY  │ booked        │ Apt  52%      │ 2 cleanings due    │
└──────────────┴───────────────┴───────────────┴────────────────────┘

CALENDAR TAB — master unified view
```

### Calendar Module

```
Month view — all properties on one timeline

June 2026
         Mon  Tue  Wed  Thu  Fri  Sat  Sun
Week 23  [ Villa Emerald: AirBnb - Johnson family ████████ ]
         [                      ] [Apt: Available          ]
Week 24  [ Villa Emerald: Direct booking - Ribeiro ███████ ]
         [ Apt: Booking.com - Schmidt ████████████         ]
Week 25  [ Villa Emerald: Available                        ]
         [ Apt: Owner Block ██                             ]
```

**Features:**
- Colour-coded by channel (Airbnb = orange, Booking.com = blue, Direct = green, Owner block = grey)
- Click any booking → guest details, payment summary, check-in notes
- Click empty date → create manual booking or owner block
- Drag to extend/shorten booking (with conflict check)
- Export month to PDF for owner statement

### Bookings Module

Table view of all bookings with filters:

| Column | Description |
|---|---|
| Property | Villa Emerald / Apt São Martinho |
| Channel | Airbnb / Booking.com / Direct |
| Guest | Name + country |
| Check-in / Check-out | Dates |
| Nights | Calculated |
| Gross | What guest paid |
| Channel fee | Platform % |
| Net | To owner (after fee + cleaning + agency %) |
| Status | confirmed / cancelled / checked-in / checked-out |
| Actions | View · Edit · Message · Statement |

### Owner Statement (Auto-generated Monthly)

```
BOUGAN VILLA — Monthly Owner Statement
Villa Emerald · June 2026

BOOKINGS
Ref        Dates              Channel      Gross      Fee       Net
BV-240     14–21 Jun (7n)     Airbnb       €1,610     €241      €1,369
BV-241     21–28 Jun (7n)     Direct       €1,400     €0        €1,400
───────────────────────────────────────────────────────────────────────
                              Total gross  €3,010     €241      €2,769

COSTS
Cleaning (x2)                                                   -€160
Pool maintenance                                                 -€80
Agency management fee (15%)                                     -€416
───────────────────────────────────────────────────────────────────────
NET TO OWNER                                                    €2,113
```

---

## 7. Revenue & Cost Management

### Revenue Flows

```
Guest pays Airbnb
    └── Airbnb collects 100%
    └── Airbnb deducts ~15% service fee from host payout
    └── Airbnb transfers net to Bougan Villa (or owner) bank account

Guest pays Booking.com
    └── Guest pays Booking.com or at property (model-dependent)
    └── Booking.com invoices 15–18% commission monthly
    └── Bougan Villa collects gross, pays commission separately

Guest pays direct (future Stripe integration)
    └── Stripe charges guest, deducts 1.4% + €0.25 (EU cards)
    └── Full gross to Bougan Villa, no platform commission
    └── Best margin channel — worth incentivising (loyalty discount)
```

### Agency Fee Structure

Bougan Villa charges property owners a management fee. Typical structure:

| Model | Structure | Best for |
|---|---|---|
| **Commission** | 15–20% of net revenue (after channel fees) | Most common, aligns incentives |
| **Fixed monthly** | €300–500/property regardless of bookings | Owner prefers predictability |
| **Hybrid** | Low base (€150) + 10% commission | Covers fixed costs + upside |

*Recommendation: commission model at 18% of net — fully incentive-aligned.*

### Cost Categories (per property, per year, indicative)

| Category | Villa Emerald est. | Notes |
|---|---|---|
| Pool maintenance | €800–1,200 | Monthly pool service |
| Cleaning (per booking) | €80–120 | Per turnover |
| Gardening | €400–600 | Monthly or bi-monthly |
| Utilities (electricity) | €600–1,200 | Pool pump + AC heavy |
| Internet | €300 | Annual |
| Property insurance | €400–800 | Short-let specific cover |
| Airbnb host fee | ~3% of gross | Per booking |
| Booking.com commission | 15–18% | On confirmed gross |
| Minor maintenance reserve | €500–1,000 | Annual provision |
| **Total fixed + variable est.** | **€3,600–5,000/year** | Excluding agency fee |

### Pricing Strategy

**Dynamic pricing by season:**

| Season | Occupancy target | Strategy |
|---|---|---|
| Peak (Jul–Aug) | 95%+ | Maximum rate, 7-night min stays |
| Shoulder (May–Jun, Sep) | 75–85% | Competitive rate, 3-night min |
| Low (Oct–Apr) | 40–60% | Reduced rate, weekend breaks |
| Portuguese holidays | +20–30% boost | Manual price lift |

**Tools:**
- Short-term: Manual price setting in Airbnb / Booking.com extranets
- Medium-term: Airbnb Smart Pricing (free, but conservative) or Pricelabs (€20/property/month, recommended)
- Long-term: Bougan Villa dynamic pricing engine reading occupancy data from Supabase

---

## 8. Future Roadmap — Phased Delivery

### Phase 1 — Backend Foundation (4–6 weeks)

**Goal:** Supabase database, admin login, manual booking management.

- [ ] Supabase project setup + schema (properties, bookings, costs tables)
- [ ] Supabase Auth — magic link email login for manager
- [ ] Admin screen: `/admin` — protected, dashboard + calendar view (read-only first)
- [ ] Manual booking creation / owner blocks
- [ ] Basic monthly statement export (PDF or CSV)

### Phase 2 — Channel Sync (2–4 weeks)

**Goal:** Live iCal sync — Airbnb + Booking.com reflected in Supabase calendar.

- [ ] iCal pull job (Supabase Edge Function + pg_cron)
- [ ] Parse Airbnb iCal → bookings table
- [ ] Parse Booking.com iCal → bookings table
- [ ] Generate Bougan Villa iCal feed per property
- [ ] Import Bougan Villa iCal back into Airbnb + Booking.com (closes the loop)
- [ ] Conflict detection alerts in admin screen
- [ ] Sync status panel (last synced, error count)

### Phase 3 — Revenue Dashboard (2–3 weeks)

**Goal:** Manager and owner can see income, costs, occupancy in one place.

- [ ] Revenue ledger — log all bookings with gross/fee/net breakdown
- [ ] Cost entry screen — log cleaning, maintenance, other costs
- [ ] Monthly P&L view per property
- [ ] Owner statement generator (PDF export)
- [ ] Occupancy rate charts (monthly, rolling 12 months)
- [ ] Channel mix chart (% Airbnb vs Booking.com vs Direct)

### Phase 4 — Direct Booking Engine (3–4 weeks)

**Goal:** Guests can book and pay directly on bouganvilla.com — best margin channel.

- [ ] Availability widget on PropertyDetail page (reads Supabase)
- [ ] Booking request form → availability check → hold dates
- [ ] Stripe Checkout for payment
- [ ] On payment confirmation: create booking, block all channels via iCal push
- [ ] Confirmation email to guest (Resend)
- [ ] Notification email to manager

### Phase 5 — Airbnb Partner API (6–12 months, if approved)

**Goal:** Real-time webhooks replace iCal polling. Pricing control via API.

- [ ] Apply for Airbnb Partner API access
- [ ] Replace iCal sync with webhook receiver for new bookings
- [ ] Implement programmatic pricing sync from Bougan Villa admin
- [ ] Guest messaging through admin panel (reply to Airbnb messages in-app)
- [ ] Pull payout data from Airbnb transaction API

### Phase 6 — Owner Portal (3–4 weeks)

**Goal:** Property owners can log in and see their own property's calendar and income.

- [ ] Separate owner login (Supabase Auth, row-level security per property)
- [ ] Owner dashboard: their property only — calendar, revenue, statement download
- [ ] Owner can mark personal-use dates (owner block)
- [ ] No access to other properties or agency cost data

---

## 9. Infrastructure & Cost Estimates

### Current (Replit Dev)

| Service | Cost | Notes |
|---|---|---|
| Replit deployment | ~$20/month | Autoscale plan |
| Domain (bouganvilla.com) | ~€12/year | Wherever registered |
| **Total** | **~€22/month** | |

### After Phase 1–2 (with Supabase)

| Service | Cost | Notes |
|---|---|---|
| Replit deployment | ~$20/month | Static frontend |
| Supabase (Pro) | $25/month | DB + Auth + Edge Functions |
| Resend (email) | Free–$20/month | Up to 100k emails/month |
| Domain | €12/year | |
| **Total** | **~€50–60/month** | |

### After Phase 4 (with Stripe + Dynamic Pricing)

| Service | Cost | Notes |
|---|---|---|
| Replit deployment | $20/month | |
| Supabase Pro | $25/month | |
| Resend | $20/month | |
| Pricelabs (pricing tool) | $20/property/month | Optional |
| Stripe | 1.4% + €0.25 per transaction | Only on direct bookings |
| **Total fixed** | **~€70–90/month** | + Stripe per transaction |

### ROI Note

One additional direct booking per month at €1,400 (Villa Emerald, 7 nights) = **€210 saved in Airbnb fees** (15%). Infrastructure cost: €70–90/month. Direct bookings pay for themselves with 1 extra booking per 2 months.

---

## 10. Data Model Reference

### Properties (currently static, move to Supabase)

```typescript
interface Property {
  id: string;                    // 'villa-emerald'
  name: string;                  // 'Villa Emerald'
  area: string;                  // 'Belverde, Aroeira'
  region: string;                // 'Setúbal Coast'
  type: 'villa' | 'apartment';
  description: string;           // Short (1–2 sentences)
  longDescription: string;       // Full detail page copy
  bedrooms: number;
  bathrooms: number;
  guests: number;
  image: string;                 // Hero image URL
  images: string[];              // Full gallery
  amenities: string[];
  tags: string[];
  highlights: { label: string; value: string }[];
  nearby: { label: string; distance: string }[];
  cta: { label: string; href: string; external?: boolean };
  // To add:
  airbnb_listing_id?: string;    // Airbnb listing ID for API
  booking_com_id?: string;       // Booking.com property ID
  ical_export_url?: string;      // Supabase-generated iCal URL
  nightly_rate_eur?: number;     // Base rate for direct bookings
  cleaning_fee_eur?: number;
  owner_id?: string;             // FK to owners table
}
```

### Channel Fee Reference

| Channel | Host fee | Guest fee | Net to host |
|---|---|---|---|
| Airbnb | 3% of booking subtotal | 14–20% on top | ~97% of subtotal |
| Booking.com | 15–18% commission | Varies | 82–85% of guest price |
| Direct (Stripe) | 1.4% + €0.25 | None | ~98.5% |
| Direct (bank transfer) | 0% | None | 100% |

---

*Prepared by Bougan Villa · Architecture v1.0 · June 2026*  
*Next review: when Supabase integration begins (Phase 1)*
