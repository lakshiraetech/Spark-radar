-- Seed Data for Development
-- Note: Do not use for production.

-- Create a mock organization for testing
INSERT INTO organizations (id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'Acme Corp', 'acme-corp')
ON CONFLICT (id) DO NOTHING;

-- You can manually add users via the Supabase Studio and link their profiles here
-- OR use the application signup flow which automatically creates profiles and organizations.
