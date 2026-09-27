# Testing

A robust testing strategy ensures platform stability.

## Frameworks
- **Unit Tests**: Vitest/Jest for business logic (payment calculations, RLS policy validation scripts).
- **Integration Tests**: Supertest + Vitest for API and Webhook testing.
- **End-to-End (E2E) Tests**: Playwright for complete user workflows.

## Critical Test Paths
- Organization and Workspace creation.
- Supabase Row Level Security (RLS) enforcement.
- Payment Webhook Idempotency.
- Customer Portal isolation.

Tests can be run via standard npm scripts in `package.json`.
