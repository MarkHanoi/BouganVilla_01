---
name: Admin properties management
description: Admin backend PATCH endpoint and frontend Properties management page
---

## Backend
`PATCH /api/admin/properties/:id` in `routes/admin.ts`:
- Protected by `requireAdmin`
- Accepts any subset of: name, type, area, region, bedrooms, bathrooms, guests, description, long_description, image, images, amenities, tags, highlights, nearby, cta_label, cta_href, cta_external, airbnb_url, base_price_eur, active
- Serializes object values via JSON.stringify before writing
- Returns updated row

## Frontend
`pages/admin/Properties.tsx`:
- Inline edit for `base_price_eur` (click-to-edit number field)
- Inline edit for `airbnb_url` (click-to-edit URL field)
- Toggle active/inactive button per property
- Uses AdminLayout + useAdminAuth guard

## Nav
`AdminLayout.tsx` navItems includes `{ href: "/admin/properties", label: "Properties", icon: Home }`.
Route registered in `App.tsx` admin switch.

**Why:** Owners need to update pricing and booking links without touching code or DB directly.
