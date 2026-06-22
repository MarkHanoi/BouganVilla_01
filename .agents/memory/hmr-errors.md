---
name: HMR transient errors
description: Vite HMR can produce stale module state during rapid sequential file edits
---

## Symptoms
- "Invalid hook call" in browser console
- "X is not defined" ReferenceError for a variable that is clearly declared in the source
- Errors appear immediately after multiple hot updates in quick succession

## Cause
When many files are edited back-to-back, Vite HMR can update some modules before their dependencies are ready, creating a brief inconsistent state. Stale closure from a previous module version may survive in memory.

## Fix
Restart the `Start application` workflow — this forces a full cold rebuild of the frontend.
The errors are transient and disappear on clean reload; they do NOT indicate a real code bug.

**Why:** This bit us when editing 8+ files in a single agent turn. Safe to ignore if a fresh browser load is clean.
