-- Migration: 00005_vendor_module
-- Description: Vendors, purchase orders, deliveries, vendor payments.

-- 1. Vendors
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    website TEXT,
    billing_address JSONB,
    tax_id TEXT,
    status TEXT DEFAULT 'active', -- active, inactive
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 2. Vendor Contacts
CREATE TABLE vendor_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Purchase Orders
CREATE TYPE po_status AS ENUM ('draft', 'sent', 'partially_received', 'received', 'cancelled');

CREATE TABLE purchase_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES vendors(id),
    po_number TEXT NOT NULL,
    status po_status DEFAULT 'draft',
    issue_date DATE NOT NULL,
    expected_delivery_date DATE,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    currency TEXT DEFAULT 'USD',
    notes TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    UNIQUE(organization_id, po_number)
);

-- 4. Vendor Deliveries
CREATE TABLE vendor_deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    po_id UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    delivery_date DATE NOT NULL,
    status TEXT DEFAULT 'received', -- received, delayed, incomplete
    notes TEXT,
    received_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Vendor Payments
CREATE TABLE vendor_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    vendor_id UUID NOT NULL REFERENCES vendors(id),
    po_id UUID REFERENCES purchase_orders(id),
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_date DATE NOT NULL,
    payment_method TEXT,
    reference_number TEXT,
    notes TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_payments ENABLE ROW LEVEL SECURITY;

-- Standard Policies
CREATE POLICY "Org members can view vendors" ON vendors FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage vendors" ON vendors FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view vendor_contacts" ON vendor_contacts FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage vendor_contacts" ON vendor_contacts FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view purchase_orders" ON purchase_orders FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage purchase_orders" ON purchase_orders FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view vendor_deliveries" ON vendor_deliveries FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage vendor_deliveries" ON vendor_deliveries FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view vendor_payments" ON vendor_payments FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage vendor_payments" ON vendor_payments FOR ALL USING (auth.is_org_member(organization_id));

-- Triggers
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_vendor_contacts_updated_at BEFORE UPDATE ON vendor_contacts FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_purchase_orders_updated_at BEFORE UPDATE ON purchase_orders FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_vendor_deliveries_updated_at BEFORE UPDATE ON vendor_deliveries FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_vendor_payments_updated_at BEFORE UPDATE ON vendor_payments FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
