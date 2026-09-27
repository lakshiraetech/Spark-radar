# Architecture

Spark Radar uses a modern, modular architecture optimized for deployment on Vercel.

## Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **State/Data Fetching**: React Server Components, Server Actions, React Query (for client mutations)
- **Forms**: React Hook Form with Zod validation
- **Payments**: Stripe & PayPal
- **AI**: OpenAI via Vercel AI SDK

## Directory Structure
```
src/
  app/          # Next.js App Router pages and layouts
  components/   # Reusable UI components
  lib/          # Utilities, external service wrappers (Stripe, AI, etc.)
  db/           # Database schema, types, migrations (Supabase)
  modules/      # Feature modules (Collect, Renew, Repair, etc.)
```

## Security
- Row-Level Security (RLS) enabled on all tables in Supabase.
- Strict Zod validation on API routes and Server Actions.
- Server-side verification for Webhooks and Payments.
