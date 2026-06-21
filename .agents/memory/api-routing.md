---
name: API routing convention
description: Express router mounted at /api — sub-route files must NOT repeat the /api prefix
---

**Rule:** `app.use("/api", router)` in `artifacts/api-server/src/app.ts`. All route files registered under the main router must NOT include `/api` in their paths.

- Correct: `router.post("/contact", ...)` → resolves to `POST /api/contact`
- Wrong: `router.post("/api/contact", ...)` → would resolve to `POST /api/api/contact`

Health check is at `GET /healthz` (registered directly on `app`, not on the router, so no `/api` prefix).

**Why:** Standard Express mounting pattern — the prefix is applied once at mount time.

**How to apply:** Any time a new route file is added, verify the paths in the file do NOT start with `/api`.
