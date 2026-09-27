-- Migration: 00006_support_tasks_module
-- Description: Tasks, Support Tickets, Notifications, Subscriptions, AI, Audit logs.

-- 1. Tasks
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMPTZ,
    status TEXT DEFAULT 'pending', -- pending, in_progress, completed, cancelled
    priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
    assigned_to UUID REFERENCES profiles(id),
    related_entity_type TEXT, -- e.g., 'invoice', 'renewal', 'customer'
    related_entity_id UUID,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 2. Support Tickets
CREATE TYPE ticket_status AS ENUM ('open', 'assigned', 'in_progress', 'waiting_customer', 'waiting_vendor', 'resolved', 'closed');

CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id), -- If submitted by a customer
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status ticket_status DEFAULT 'open',
    priority TEXT DEFAULT 'medium',
    assigned_to UUID REFERENCES profiles(id),
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 3. Ticket Messages
CREATE TABLE ticket_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES profiles(id),
    action TEXT NOT NULL, -- e.g., 'invoice.created', 'payment.received'
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Subscriptions (SaaS Billing)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    status TEXT DEFAULT 'active', -- active, past_due, canceled, trialing
    provider TEXT, -- 'stripe', 'paypal'
    provider_subscription_id TEXT,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Standard Policies
CREATE POLICY "Org members can view tasks" ON tasks FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage tasks" ON tasks FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view support_tickets" ON support_tickets FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage support_tickets" ON support_tickets FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view ticket_messages" ON ticket_messages FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage ticket_messages" ON ticket_messages FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view audit_logs" ON audit_logs FOR SELECT USING (auth.is_org_member(organization_id));
-- Intentionally NO UPDATE/DELETE policies for audit_logs (append only for standard users)
CREATE POLICY "Org members can insert audit_logs" ON audit_logs FOR INSERT WITH CHECK (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view subscriptions" ON subscriptions FOR SELECT USING (auth.is_org_member(organization_id));
-- Subscriptions should generally be managed by server-side webhooks (service role)

-- Triggers
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
