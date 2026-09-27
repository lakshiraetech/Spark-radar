# Database

Spark Radar uses PostgreSQL hosted on Supabase.

## Schema
The database is strictly relational and enforces multi-tenancy.

### Core Tables
- `organizations`: Represents workspaces/tenants.
- `users` (Supabase Auth): Handled by Supabase.
- `profiles`: Application-level user data.
- `organization_members`: Maps profiles to organizations with roles.

### Multi-Tenancy
Every tenant-owned record contains `organization_id`.
Isolation is enforced via Postgres Row Level Security (RLS) policies.

## Migrations
We manage schema migrations using Supabase CLI. Migrations are stored in `supabase/migrations`.

To apply migrations locally:
```bash
supabase db push
```

## Security & RLS
No table allows full access by default. All operations require an authenticated session context with proper organizational membership checks.
