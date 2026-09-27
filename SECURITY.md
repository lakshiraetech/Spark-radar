# Security

Spark Radar adheres to production-grade security standards.

## Multi-Tenancy
- **Row-Level Security (RLS)** is strictly enforced at the database level.
- Authentication relies on Supabase Auth.
- Authorization relies on server-side session checks and `organization_members` roles.

## API & Data Validation
- All inputs are validated via **Zod** schemas.
- Server Actions use strict typing and verify user sessions prior to execution.
- No direct database updates are exposed to the client without RLS.

## Third-Party Integrations
- Webhooks from Stripe and PayPal verify signatures before acting.
- Webhooks check for idempotency.
- File storage restricts access via bucket policies and signed URLs.

## AI Safeguards
- AI features are heavily sandboxed.
- AI has no direct DB access. Tools provided to the AI filter data implicitly by `organization_id`.
- Destructive operations require explicit user confirmation.
