Update the public contact email address across the site.

Locations to change:
1. `src/routes/index.tsx` (line 54): constant `EMAIL_PRIMARY` currently set to `sales@mohitpackaging.in`.
2. `src/routes/__root.tsx` (line 136): `email` field in the JSON-LD organization schema.

Change both values to `mohitpackaging96@gmail.com`.

No other code, styling, or dependencies affected. A quick build/type-check will confirm the change.