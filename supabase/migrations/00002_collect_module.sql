-- Migration: 00002_collect_module
-- Description: Customers, invoices, payments, and receivables.

-- 1. Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company_name TEXT,
    billing_address JSONB,
    tax_id TEXT,
    status TEXT DEFAULT 'active', -- active, inactive
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 2. Customer Contacts
CREATE TABLE customer_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Invoices
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled', 'refunded');

CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    invoice_number TEXT NOT NULL,
    status invoice_status DEFAULT 'draft',
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    currency TEXT DEFAULT 'USD',
    subtotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    tax_total DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    balance_due DECIMAL(12,2) NOT NULL DEFAULT 0,
    notes TEXT,
    terms TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    UNIQUE(organization_id, invoice_number)
);

-- 4. Invoice Items
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit_price DECIMAL(12,2) NOT NULL,
    tax_rate DECIMAL(5,2) DEFAULT 0,
    total DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    invoice_id UUID REFERENCES invoices(id),
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_date DATE NOT NULL,
    payment_method TEXT, -- e.g., 'credit_card', 'bank_transfer', 'cash', 'stripe', 'paypal'
    reference_number TEXT,
    notes TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Receivables (Aggregate tracking for aging/reports, often computed, but good for caching/snapshots)
CREATE TABLE receivables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    amount_due DECIMAL(12,2) NOT NULL,
    due_date DATE NOT NULL,
    status TEXT, -- current, 1-30, 31-60, 61-90, 90+
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE receivables ENABLE ROW LEVEL SECURITY;

-- Standard Policies for org-isolated tables
CREATE POLICY "Org members can view customers" ON customers FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage customers" ON customers FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view contacts" ON customer_contacts FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage contacts" ON customer_contacts FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view invoices" ON invoices FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage invoices" ON invoices FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view invoice_items" ON invoice_items FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage invoice_items" ON invoice_items FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view payments" ON payments FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage payments" ON payments FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view receivables" ON receivables FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage receivables" ON receivables FOR ALL USING (auth.is_org_member(organization_id));

-- Triggers
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_customer_contacts_updated_at BEFORE UPDATE ON customer_contacts FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_receivables_updated_at BEFORE UPDATE ON receivables FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
