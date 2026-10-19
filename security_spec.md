# Security Specification — Imobiliária Fonseca e Cândido

## 1. Data Invariants
1. Public visitors can read (`get`, `list`) properties and settings so the real estate showcase and landing pages work seamlessly.
2. Only verified administrators (`jonasjessicalove@gmail.com` or existing `/admins/{uid}`) can create, update, or delete documents in `/properties/{propertyId}` and `/settings/{configId}`.
3. Every string field is strictly bounded by `.size()` and every document ID matches `^[a-zA-Z0-9_\-]+$`.
4. All writes enforce `hasOnly` and `hasAll` key allowlists to prevent shadow field injection.

## 2. The "Dirty Dozen" Payloads
1. Unauthenticated create on `/properties/prop-1` -> PERMISSION_DENIED
2. Non-admin authenticated create on `/properties/prop-1` -> PERMISSION_DENIED
3. Admin with `email_verified: false` attempting write -> PERMISSION_DENIED
4. Shadow field injection (`isSuperAdmin: true`) on `/properties/prop-1` -> PERMISSION_DENIED
5. Oversized title (> 160 chars) on `/properties/prop-1` -> PERMISSION_DENIED
6. Invalid category enum (`"Comercial"`) on `/properties/prop-1` -> PERMISSION_DENIED
7. Invalid status enum (`"Cancelado"`) on `/properties/prop-1` -> PERMISSION_DENIED
8. Unbounded image list (> 50 images) on `/properties/prop-1` -> PERMISSION_DENIED
9. ID poisoning with special characters on `/properties/bad$id` -> PERMISSION_DENIED
10. Unauthenticated update on `/settings/global` -> PERMISSION_DENIED
11. Shadow field injection on `/settings/global` -> PERMISSION_DENIED
12. Oversized address (> 300 chars) on `/settings/global` -> PERMISSION_DENIED
