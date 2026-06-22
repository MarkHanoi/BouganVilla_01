---
name: useProperties hook
description: API-driven hook for fetching properties from /api/properties; transforms snake_case to camelCase with static data fallback
---

## Pattern
`src/hooks/useProperties.ts` exports `useProperties()` and `useProperty(id)`.

Both hooks:
1. Initialize with static data from `src/data/index.ts` (instant render, no flash)
2. Fetch from `/api/properties` or `/api/properties/:id` in a useEffect
3. Override with API data when available
4. Never throw — silently fall back to static on API errors

## Key transform rule
API returns snake_case columns (`long_description`, `cta_label`, `cta_href`, `cta_external`, `base_price_eur`).
Hook transforms to camelCase (`longDescription`, `cta: { label, href, external }`, `basePriceEur`).

## Critical SQL rule
**Every SELECT in `routes/properties.ts` must explicitly list `base_price_eur`.**
The column is NOT in a `SELECT *` wildcard — it was added after the initial schema and is silently omitted if not named.

## JSONB columns
pg driver auto-parses JSONB columns (`images`, `amenities`, `tags`, `highlights`, `nearby`) into JS objects — no JSON.parse needed in the hook.

**Why:** Static fallback prevents layout shift on first render; the API enriches with pricing data (€190 villa, €110 apt) from the DB.
