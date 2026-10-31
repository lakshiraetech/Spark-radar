<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Base44 sandbox environment

`docker-compose.base44.yml` runs the app from the cloned source with live reload,
plus a local Supabase-compatible stack. No external credentials are required.

## Services

| Service | Purpose |
| --- | --- |
| `db` | `supabase/postgres` — the database volume `db-data` |
| `db-bootstrap` | one-shot: creates the `auth` enum types GoTrue migrations assume |
| `auth-migrate` | one-shot: `auth migrate` (GoTrue schema) |
| `db-setup` | one-shot: applies `supabase/migrations/*.sql` then `supabase/seed.sql` |
| `auth` | GoTrue (`supabase/gotrue`) on port 9999 — email signup is auto-confirmed |
| `rest` | PostgREST on port 3000, anon role `anon` |
| `gateway` | nginx on port 8000: `/auth/v1/*` → GoTrue, `/rest/v1/*` → PostgREST |
| `web` | `next dev` on host port 3000 (the only public port) |

The app reaches Supabase through `NEXT_PUBLIC_SUPABASE_URL=http://gateway:8000`
(Docker-internal). No browser code imports `src/lib/supabase/client.ts`, so the
URL never has to be reachable from the browser.

## Things that bite

- **Start order matters.** `db-bootstrap` must run before `auth-migrate`: the
  `supabase/postgres` image ships GoTrue's base `auth` schema but not the enum
  types (`auth.factor_type`, `auth.aal_level`, …) that newer GoTrue migrations
  expect, so `auth migrate` fails with `type "auth.factor_type" does not exist`.
  Do not `DROP SCHEMA auth` — GoTrue's migrations only add to it.
- **App migrations run after GoTrue's**, because `00001_core_auth_tenancy.sql`
  creates a foreign key to `auth.users`.
- **`db-setup` skips the SQL migrations once `public.profiles` exists**; the
  seed file is idempotent. To rebuild from scratch:
  `docker compose -f docker-compose.base44.yml down -v && up -d`.
- **The local dev JWT secret lives in `docker-compose.base44.yml`**; the `anon`
  key is derived from it at web start-up by `.base44/make-anon-key.mjs`, so no
  key literal is committed. This is development-only.
- **Dependencies** install into the `web-node-modules` volume on start-up when
  `package-lock.json` changes (`.base44/web-start.sh`).

## Sandbox-only overrides

`next.config.ts` reads `BASE44_PREVIEW_MODE`; when it is exactly `"1"` it adds
the preview host (`3000-${BASE44_PUBLIC_HOST_SUFFIX}`) to `allowedDevOrigins`
and to `experimental.serverActions.allowedOrigins`, and the sandbox host domain
to `allowedDevOrigins`. Without the flag neither list is set and behaviour is
unchanged. The server-actions entry is required because the preview proxy
forwards the browser's public `Origin` while reporting a different `Host`, and
Next rejects the forwarded form action as CSRF without it.

## Known pre-existing issues (not environment related)

- `src/app/actions/{collect,renew,repair,tasks}.ts` query `collect_invoices`,
  `renew_items`, `renew_alerts`, `repair_tickets` and `support_tasks`, but
  `supabase/migrations` creates `invoices`, `renewals`, `repair_jobs` and
  `tasks`. Those dashboard pages show a "Database Connection Error" banner and
  fall back to demo rows.
- `login`/`signup` pages read `searchParams.error` synchronously; Next 16
  expects `await`/`useSearchParams()`, so the dev server logs an error for them
  (the pages still render and sign-in works).

## Verify

```bash
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/   # 200
docker compose -f docker-compose.base44.yml exec -T web node -e \
  "fetch('http://gateway:8000/rest/v1/organizations?select=*',{headers:{Authorization:'Bearer <anon>'}}).then(r=>console.log(r.status))"
```

Sign up through `/signup` (or `/login`) with any email/password; the account is
confirmed automatically and lands on `/dashboard`.
