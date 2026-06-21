---
name: Admin auth pattern
description: Cookie session auth — ADMIN_EMAIL + ADMIN_PASSWORD secrets, checkPassword() in lib/auth.ts
---

Admin authentication uses a custom cookie-based session stored in the `admin_sessions` PostgreSQL table.

**Rule:** Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` as Replit secrets. `checkPassword()` in `artifacts/api-server/src/lib/auth.ts` checks the plain password against `ADMIN_PASSWORD` first, then falls back to a SHA-256 hash comparison against `ADMIN_PASSWORD_HASH` if that secret is set instead.

**Why:** Replit secrets are encrypted at rest, so storing the plain password as a secret is safe and simpler than a separate hashing step during setup.

**How to apply:** When debugging admin login failures, check: (1) both secrets are set, (2) the API server was restarted after secrets were added, (3) cookie `sameSite: strict` means the login request must come from the same origin.
