# Bougan Villa — Master Audit, Analysis & Roadmap
> Full-stack audit · June 2026 · Prepared after Replit migration

---

## Executive Summary

Bougan Villa is a boutique vacation rental management platform for a Portuguese coastal agency (Setúbal + Silver Coast). The foundation is **exceptionally strong** — premium brand identity, solid multi-language architecture, a working backend API, live database, and a functional admin panel. However, several high-value features are incomplete or missing that are **directly costing bookings and owner trust today**.

**Verdict:** The bones are world-class. The gaps are fixable in 4–6 weeks of focused work. Below is the full picture.

---

## 1. ARCHITECTURE AUDIT

### Current Stack
| Layer | Technology | Grade |
|---|---|---|
| Frontend | React 19 + Vite 7 + TypeScript | A |
| Routing | Wouter | A |
| Styling | Tailwind CSS v4 + CSS custom properties | A |
| Animations | Framer Motion | A |
| Backend | Express 5 + TypeScript | A |
| Database | PostgreSQL (Replit native) | A |
| Email | Resend | A |
| i18n | Custom context + 1,975-line translations | A |
| Build | pnpm workspaces + esbuild | A |
| iCal Sync | node-cron every 15 min | B+ |

### Architecture Strengths
- **Clean monorepo** — frontend and backend are properly separated with clear API boundaries
- **No client-side DB leakage** — all data access goes through the Express API, never directly from the browser
- **Security-first backend** — helmet, CORS regex, session cookies (httpOnly + secure in prod), zod validation on all inputs
- **iCal engine is complete** — inbound sync (pulling Airbnb/Booking.com) and outbound feed (serving `.ics` to channels) both implemented
- **Proxy setup** — Vite proxies `/api` to Express; no CORS issues in dev, clean production split

### Architecture Gaps
| Gap | Impact | Priority |
|---|---|---|
| Properties table is empty — static `data/index.ts` is still the source of truth for the public site | Properties can't be managed without a code deploy | 🔴 Critical |
| No `ADMIN_EMAIL` / `ADMIN_PASSWORD` secrets set — admin login will always fail | Admin panel completely non-functional | 🔴 Critical |
| `RESEND_API_KEY` not set — contact form saves to DB but no emails sent | Leads silently lost | 🔴 Critical |
| No DB migration system — schema created manually, no versioning | Fragile, impossible to reproduce | 🟠 High |
| Admin panel excluded from `LanguageProvider` — i18n context unavailable in admin | Minor but inconsistent | 🟡 Medium |
| WhatsApp number is placeholder (`+351912345678`) | Wrong number shown to users | 🟠 High |
| No rate limiting on `/api/contact` or `/api/owner-estimate` | Spam/abuse risk | 🟠 High |
| No error boundary in React app | Any uncaught error crashes the whole UI | 🟡 Medium |

---

## 2. UI / UX AUDIT

### Public Website

#### Home Page — Grade: A-
**Strengths:**
- Dual-persona toggle (Guest / Owner) is a smart conversion mechanic
- Hero gradient with grain overlay is visually distinctive — premium feel
- Frosted glass panel works well
- Property strip below the fold is clean

**Gaps:**
- Hero CTA "Explore Our Properties" goes to the listing — no date picker on the hero itself
- No social proof count (e.g. "47 five-star reviews") near the hero
- The 3 USP icons (✦ ◈ ◇) are abstract — real icons would communicate faster
- Testimonials section: only 3 testimonials, no pagination, no property filter
- No trust signals in the footer (Airbnb Superhost badge, year established, etc.)

#### Properties Listing — Grade: B+
**Strengths:**
- Clean card layout, good image ratio
- Tags displayed well

**Gaps:**
- **No search or filters** — guests can't filter by bedrooms, guests, dates, or price
- Only 2 properties — cards look lonely; a "More properties coming soon" card would help
- No availability indicator on the card itself ("Available in July" vs "Fully booked")
- Map view missing — many rental sites show properties on a map

#### Property Detail — Grade: A-
**Strengths:**
- 5-photo editorial grid on desktop is premium
- Full-screen lightbox with keyboard nav (← →, Esc) — excellent
- Availability calendar is implemented and wired to the API
- Highlights and nearby distances section is well-structured

**Gaps:**
- **Date picker on the calendar doesn't connect to enquiry form** — user selects dates but must re-enter them manually in Contact (URL param carry-through partially exists but fragile)
- No pricing widget ("From €190/night" with seasonal breakdown)
- Amenities list is plain text — icons would improve scannability
- No "Similar properties" or cross-sell section
- WhatsApp CTA on mobile should be more prominent here

#### Areas / Destinations — Grade: B
**Strengths:**
- Good structure for destination storytelling
- Area highlights well-written

**Gaps:**
- **5 of 6 destinations are `comingSoon: true`** — dead ends for users
- No photos on the areas listing page
- No "Properties in this area" link from destination detail

#### Contact Page — Grade: B+
**Strengths:**
- Form is wired to the API and saves to DB
- Pre-fills from URL params (dates from calendar)
- Success/error states implemented

**Gaps:**
- No WhatsApp link as alternative (some users prefer chat)
- No response time promise ("We reply within 24 hours")
- Phone field is optional but there's no "preferred contact method" selector
- `VITE_API_URL` must be empty string (proxied) — any misconfiguration breaks form silently

#### Owners Page — Grade: A-
**Strengths:**
- Owner Wizard is a great lead magnet
- Estimate sends email via Resend
- 4-step UX is smooth

**Gaps:**
- Wizard result doesn't show a range or seasonality breakdown
- No case study / existing owner testimonial
- No clear next-step CTA after the estimate ("We'll call you within 48 hours")

### Admin Panel

#### Login — Grade: B
- Works structurally but **completely non-functional** until `ADMIN_EMAIL` + `ADMIN_PASSWORD` secrets are set

#### Dashboard — Grade: B+
**Strengths:**
- KPI calculation is solid (occupancy %, revenue, upcoming bookings)
- Data fetched from real API endpoints
- Upcoming bookings list is useful

**Gaps:**
- No MoM (month-over-month) comparison on KPIs
- No visual chart for revenue or occupancy over time
- "New enquiries" badge but no inline reply button

#### Calendar — Grade: B
**Strengths:**
- Monthly grid view
- Colour-coded by channel
- iCal feed management (add/delete URLs, trigger manual sync)

**Gaps:**
- **No click-to-create booking from empty date** — must go to Bookings tab
- No drag-to-extend booking
- No multi-property side-by-side view (like a Gantt chart)
- Sync button gives no feedback on what actually synced

#### Bookings — Grade: B+
**Strengths:**
- Full CRUD operations
- Filterable by property/status/dates
- Manual booking creation

**Gaps:**
- No bulk actions (e.g. mark multiple as checked out)
- No export to CSV/PDF

#### Revenue — Grade: B
**Strengths:**
- Real aggregation from DB
- Grouped by property + channel

**Gaps:**
- **No costs entry UI** — the `costs` table exists in the DB and the API endpoints exist (`GET/POST/DELETE /admin/costs`) but there is no frontend page for it
- **No owner statement generator** — described in the implementation plan, not yet built
- No YTD or 12-month trend view

#### Enquiries — Grade: B+
**Strengths:**
- Status management (new → replied → converted → closed)
- Displays all fields correctly

**Gaps:**
- No inline email reply button (just status change)
- No notes field visible in the UI (exists in DB)
- No "convert to booking" one-click action

---

## 3. FEATURE GAP ANALYSIS

### Gaps That Are Costing Money Right Now

| # | Feature | What's Missing | Business Cost |
|---|---|---|---|
| G1 | Admin credentials | Secrets not set | Admin panel 100% non-functional |
| G2 | Properties in DB | `properties` table empty | API returns nothing, admin can't see properties |
| G3 | Email notifications | `RESEND_API_KEY` not set | Enquiry emails never sent |
| G4 | Costs UI | No page to enter costs | Revenue tab shows gross only, never net |
| G5 | Owner statements | No statement generator | Can't report to property owners professionally |
| G6 | Direct booking | No date-to-payment flow | All revenue goes through Airbnb (15% fee) |

### Gaps That Harm the Guest Experience

| # | Feature | What's Missing | User Impact |
|---|---|---|---|
| U1 | Date picker on property page | Dates selected in calendar don't auto-flow to enquiry | Friction, drop-off |
| U2 | Pricing display | No nightly rate shown anywhere public | Guests go to Airbnb to check price |
| U3 | Mobile experience | No mobile-specific sticky booking bar on property detail | Mobile conversion low |
| U4 | Coming-soon areas | 5/6 destinations are dead ends | Disappoints international guests |
| U5 | Amenity icons | Text-only amenities list | Harder to scan than icon grid |
| U6 | Real WhatsApp number | Placeholder number in code | Wrong contact shown |

### Gaps That Harm Owner Trust

| # | Feature | What's Missing | Owner Impact |
|---|---|---|---|
| O1 | Monthly statement | No PDF/printable owner report | Unprofessional for owner relations |
| O2 | Owner portal | No owner login to see their own data | Owners have to email for updates |
| O3 | Occupancy calendar for owners | Owners can't see their own calendar | Trust gap |

---

## 4. ORCHESTRATION AUDIT

### Data Flow Assessment

```
Guest visits property page
  → Frontend reads from static data/index.ts        ✅ works but not dynamic
  → Availability calendar calls GET /api/availability/:id  ✅ works (DB-backed)
  → Guest clicks Enquire → Contact form → POST /api/contact  ✅ works (DB saves)
  → Owner gets email notification                   ❌ BROKEN (no RESEND_API_KEY)

Guest selects dates on calendar
  → URL params passed to Contact page               ⚠️  partial (checkin/checkout only, not property)

Admin logs in
  → POST /api/admin/login                           ❌ BROKEN (no ADMIN_EMAIL/PASSWORD)
  → Cookie set, validated on every admin request    ✅ architecture correct

iCal Sync (every 15 min)
  → Calls POST /api/sync-ical internally            ✅ works
  → Parses Airbnb/Booking.com .ics files           ✅ works
  → Upserts into bookings table                     ✅ works
  → But: no ical_feeds rows exist yet               ⚠️  nothing to sync until admin adds feeds

Outbound iCal
  → GET /api/ical/:propertyId.ics                   ✅ works
  → But: no properties in DB                        ❌ returns 404
```

### Critical Broken Paths Today
1. **Admin panel** — login fails (no credentials)
2. **Email flow** — contact + owner estimate emails never sent (no Resend key)
3. **API property endpoints** — return empty arrays (DB not seeded)
4. **Outbound iCal** — returns 404 (no properties in DB)

---

## 5. THE MASTER ROADMAP

### Priority 0 — Environment & Data (Do First, ~2 hours)
These are blockers that prevent everything else from working.

| Task | What to do |
|---|---|
| P0-1 | Set `ADMIN_EMAIL`, `ADMIN_PASSWORD` secrets |
| P0-2 | Set `RESEND_API_KEY`, `FROM_EMAIL`, `OWNERS_EMAIL` secrets |
| P0-3 | Seed `properties` table with Villa Emerald + Apt São Martinho data from `data/index.ts` |
| P0-4 | Update WhatsApp number in `App.tsx` (placeholder `+351912345678`) |
| P0-5 | Wire public `/api/properties` endpoint to the frontend (replace static import) |

---

### Phase 1 — Fix Broken Paths (1–2 days)
Get every existing feature actually working end-to-end.

| Task | Description |
|---|---|
| 1-1 | Add rate limiting middleware (`express-rate-limit`) on `/api/contact` and `/api/owner-estimate` |
| 1-2 | Add React error boundary around the App |
| 1-3 | Fix URL param carry-through from AvailabilityCalendar → Contact (include `property` param) |
| 1-4 | Add `CRON_SECRET` secret and document the iCal setup flow for the manager |
| 1-5 | Verify admin login flow works end-to-end after secrets are set |

---

### Phase 2 — Complete the Admin Panel (3–5 days)
Fill the gaps that block operational use.

| Task | Description | Files |
|---|---|---|
| 2-1 | **Costs Entry UI** — page to add/view/delete costs per property | new `admin/Costs.tsx` |
| 2-2 | **Owner Statement** — printable monthly breakdown (bookings + costs + net) | new `admin/OwnerStatement.tsx` |
| 2-3 | **Create Booking from Calendar** — click empty date → create booking modal | `admin/Calendar.tsx` |
| 2-4 | **Enquiry reply** — one-click mailto with pre-filled subject + body | `admin/Enquiries.tsx` |
| 2-5 | **Convert enquiry → booking** — one-click conversion with date pre-fill | `admin/Enquiries.tsx` |
| 2-6 | **Admin property CRUD** — create/edit/deactivate properties from the panel | new `admin/Properties.tsx` + API |
| 2-7 | **Revenue chart** — 12-month bar chart (gross vs net) using Recharts | `admin/Revenue.tsx` |

---

### Phase 3 — Guest Experience Upgrades (3–5 days)
Convert more visitors into enquiries.

| Task | Description | Files |
|---|---|---|
| 3-1 | **Pricing display** — show "From €Xnight" on property cards and detail page | `data/index.ts` + `PropertyCard.tsx` + `PropertyDetail.tsx` |
| 3-2 | **Mobile sticky booking bar** — fixed bottom bar on property detail (mobile only) | `PropertyDetail.tsx` |
| 3-3 | **Seamless date → enquiry flow** — selected dates auto-populate enquiry form with one click | `AvailabilityCalendar.tsx` + `Contact.tsx` |
| 3-4 | **Amenity icons** — map each amenity to a Lucide icon | `PropertyDetail.tsx` |
| 3-5 | **Destination content** — write content for at least 3 more areas (Ericeira, Cascais, Lisbon) | `data/index.ts` |
| 3-6 | **"Properties in this area" cross-link** — from area detail to filtered properties | `DestinationDetail.tsx` |
| 3-7 | **Search/filter on properties page** — filter by guests count and area | `Properties.tsx` |
| 3-8 | **Social proof** — add total review count to hero and testimonials section | `Home.tsx` |

---

### Phase 4 — SEO & Performance (2–3 days)

| Task | Description |
|---|---|
| 4-1 | Add `<title>` and `<meta description>` per page (react-helmet or Vite SSG) |
| 4-2 | Add structured data (JSON-LD `LodgingBusiness` + `Offer`) to property pages |
| 4-3 | Lazy-load images below the fold (use `loading="lazy"`) |
| 4-4 | Convert remaining `.jpg` images to `.avif`/`.webp` |
| 4-5 | Add `sitemap.xml` generation to build pipeline |
| 4-6 | Add `robots.txt` |
| 4-7 | Add Open Graph tags for social sharing |

---

### Phase 5 — Direct Booking Engine (2–3 weeks)
The highest-ROI long-term investment: remove the 15% Airbnb fee on direct bookings.

| Task | Description |
|---|---|
| 5-1 | Stripe integration — `POST /api/checkout` creates a Stripe checkout session |
| 5-2 | Booking confirmation flow — after payment, auto-create booking in DB |
| 5-3 | Auto-block all channels when direct booking is confirmed (push to iCal) |
| 5-4 | Guest confirmation email with booking summary |
| 5-5 | Cancellation / refund policy page |
| 5-6 | "Instant Book" badge on property cards |

---

### Phase 6 — Owner Portal (1–2 weeks)
Build trust with property owners through transparency.

| Task | Description |
|---|---|
| 6-1 | Owner login — separate `/owner` route with read-only credentials per property |
| 6-2 | Owner calendar view — see their own property bookings (channel-blinded) |
| 6-3 | Owner statement self-service — download their own monthly PDF |
| 6-4 | Owner messaging — direct line to the manager |

---

## 6. QUICK WIN MATRIX

Sorted by effort vs. business impact:

| Task | Effort | Impact | Do it |
|---|---|---|---|
| Set ADMIN_EMAIL / ADMIN_PASSWORD secrets | 5 min | Unlocks entire admin panel | **Now** |
| Set RESEND_API_KEY | 5 min | Turns on all email | **Now** |
| Seed properties table | 1 hour | API returns real data | **Now** |
| Costs Entry UI | 4 hours | Enables true net revenue | **This week** |
| Owner Statement page | 6 hours | Professional owner reporting | **This week** |
| Mobile sticky booking bar | 2 hours | Immediate mobile conversion lift | **This week** |
| Pricing display ("From €X/night") | 1 hour | Reduces bounce to Airbnb | **This week** |
| Rate limiting on contact/estimate | 1 hour | Security hygiene | **This week** |
| Seamless date → enquiry flow | 3 hours | Reduces enquiry friction | Next sprint |
| Amenity icons | 2 hours | Better UX scannability | Next sprint |
| Destination content (3 areas) | 4 hours | Reduces dead-end pages | Next sprint |

---

## 7. RECOMMENDED EXECUTION ORDER

```
Week 1: Priority 0 + Phase 1
  → Admin panel working, emails flowing, properties in DB, rate limiting

Week 2–3: Phase 2 (Admin Panel Completion)
  → Costs, owner statements, better calendar, enquiry-to-booking conversion

Week 4: Phase 3 (Guest Experience)
  → Pricing, mobile bar, seamless date flow, amenity icons

Week 5: Phase 4 (SEO)
  → Titles, meta, structured data, sitemap

Week 6–8: Phase 5 (Direct Booking)
  → Stripe, confirmation flow, auto-block

Week 9–10: Phase 6 (Owner Portal)
  → Owner login, statement download
```

---

## 8. TECHNICAL DEBT TO WATCH

| Item | Severity | Notes |
|---|---|---|
| `data/index.ts` is still used by the public site | High | Must be replaced with API calls once properties are in DB |
| `any` types in admin pages (e.g. `bookings: any[]`) | Medium | Should be typed with shared interfaces |
| No DB migration system | High | Consider a simple migration script in `scripts/` |
| `window.location` used in Contact.tsx for URL params | Low | Should use wouter's `useSearch` for consistency |
| Admin panel missing `LanguageProvider` | Low | Wrap admin routes in provider or use a separate admin i18n context |
| No graceful degradation if API is down | Medium | Frontend should show cached/static fallback, not blank page |

---

## 9. WHAT "BEST IN CLASS" LOOKS LIKE FOR A BOUTIQUE RENTAL SITE

Reference: sites like Plum Guide, Oliver's Travels, Mr & Mrs Smith

| Dimension | Reference standard | Bougan Villa today | Gap |
|---|---|---|---|
| Photography | Full-screen editorial, 15+ photos | 12 photos, good grid | Minor |
| Pricing transparency | Nightly rate + cleaning fee shown | Not shown | Significant |
| Availability | Interactive calendar with instant dates | Calendar works, no price | Moderate |
| Trust signals | Reviews count, years operating, partner logos | Testimonials only | Moderate |
| Mobile UX | Sticky "Book" bar, thumb-friendly | No sticky bar | Significant |
| Direct booking | Payment on-site, instant confirmation | Not available | Major |
| Owner reporting | Self-service portal, PDF statements | Not yet built | Major |
| Content depth | Area guides, local tips, blog | 1 of 6 areas populated | Significant |
| SEO | Structured data, meta, sitemap | None implemented | Major |
| Speed | Core Web Vitals green | Not measured | Unknown |

---

*This document replaces `BOUGANVILLA_IMPLEMENTATION_PLAN.md` as the authoritative planning reference.*
*Next update should be triggered when Phase 2 is complete.*
