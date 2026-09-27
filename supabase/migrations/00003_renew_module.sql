-- Migration: 00003_renew_module
-- Description: Renewals, categories, and tracking.

-- 1. Renewal Categories
CREATE TABLE renewal_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL, -- e.g., 'insurance', 'licence', 'AMC', 'contract', 'membership', 'software', 'hosting', 'domain', 'warranty', 'certificate', 'registration', 'subscription', 'custom'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Renewals
CREATE TYPE renewal_radar_level AS ENUM ('planned', 'upcoming', 'attention', 'urgent', 'critical', 'expired');

CREATE TABLE renewals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category_id UUID REFERENCES renewal_categories(id),
    provider TEXT,
    renewal_date DATE NOT NULL,
    cost DECIMAL(12,2),
    currency TEXT DEFAULT 'USD',
    owner_id UUID REFERENCES profiles(id),
    status TEXT DEFAULT 'active', -- active, cancelled, renewed
    radar_level renewal_radar_level DEFAULT 'planned',
    notes TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 3. Renewal Reminders
CREATE TABLE renewal_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    renewal_id UUID NOT NULL REFERENCES renewals(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    days_before INT NOT NULL, -- e.g., 30, 15, 7, 1
    notification_type TEXT NOT NULL, -- 'email', 'in_app', 'sms'
    is_sent BOOLEAN DEFAULT false,
    sent_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE renewal_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE renewals ENABLE ROW LEVEL SECURITY;
ALTER TABLE renewal_reminders ENABLE ROW LEVEL SECURITY;

-- Standard Policies
CREATE POLICY "Org members can view renewal_categories" ON renewal_categories FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage renewal_categories" ON renewal_categories FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view renewals" ON renewals FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage renewals" ON renewals FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view renewal_reminders" ON renewal_reminders FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage renewal_reminders" ON renewal_reminders FOR ALL USING (auth.is_org_member(organization_id));

-- Triggers
CREATE TRIGGER update_renewal_categories_updated_at BEFORE UPDATE ON renewal_categories FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_renewals_updated_at BEFORE UPDATE ON renewals FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
