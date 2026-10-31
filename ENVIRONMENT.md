# Environment Setup

This project requires external services to function. See `.env.example` for required keys.

## Services
1. **Supabase**: Relational database, Auth, and Storage.
2. **Stripe**: Payment gateway for subscriptions.
3. **PayPal**: Alternative payment gateway.
4. **OpenAI**: Core AI engine for Spark AI.

## Local Development (Docker)

The repo ships a self-contained development stack that needs no external accounts
and no `.env.local`:

```bash
docker compose -f docker-compose.base44.yml up -d
# app: http://localhost:3000
```

It runs Next.js in dev mode from the mounted source (live reload) together with a
local, Supabase-compatible backend: Postgres (`supabase/postgres`), GoTrue for
auth (email signup is auto-confirmed locally) and PostgREST, all behind a single
internal gateway. `supabase/migrations/*.sql` and `supabase/seed.sql` are applied
automatically on first boot.

Notes:
- The database lives in the `db-data` volume. To rebuild it from scratch:
  `docker compose -f docker-compose.base44.yml down -v && docker compose -f docker-compose.base44.yml up -d`.
- The local JWT secret is a development placeholder committed in
  `docker-compose.base44.yml`; the `anon` key is derived from it at start-up.
  Never reuse it outside local development.
- In the Base44 sandbox, `BASE44_PREVIEW_MODE=1` makes `next.config.ts` allow the
  preview host for dev assets/HMR and for forwarded server actions. With the
  variable unset the config behaves exactly as before.
- See `AGENTS.md` for service ordering details and known pre-existing issues.

## Local Development (Supabase CLI)

1. Clone the repository.
2. Copy `.env.example` to `.env.local` and populate the keys.
3. Start the local database (Supabase CLI):
   ```bash
   supabase start
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
