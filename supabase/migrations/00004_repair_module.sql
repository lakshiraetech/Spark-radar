-- Migration: 00004_repair_module
-- Description: Repair jobs, assets, parts, estimates.

-- 1. Repair Assets (Vehicles/Equipment)
CREATE TABLE repair_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    name TEXT NOT NULL,
    asset_type TEXT, -- e.g., 'vehicle', 'equipment', 'electronics'
    make TEXT,
    model TEXT,
    year INT,
    serial_number TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- 2. Repair Jobs
CREATE TYPE repair_status AS ENUM ('received', 'inspection', 'diagnosis', 'estimate', 'awaiting_approval', 'approved', 'repairing', 'quality_check', 'ready', 'delivered', 'completed', 'cancelled');

CREATE TABLE repair_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES customers(id),
    asset_id UUID REFERENCES repair_assets(id),
    job_number TEXT NOT NULL,
    status repair_status DEFAULT 'received',
    description TEXT NOT NULL,
    technician_id UUID REFERENCES profiles(id),
    estimated_completion DATE,
    actual_completion DATE,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    UNIQUE(organization_id, job_number)
);

-- 3. Repair Job Events (Timeline tracking)
CREATE TABLE repair_job_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES repair_jobs(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- e.g., 'status_change', 'note', 'inspection_result'
    description TEXT NOT NULL,
    previous_status repair_status,
    new_status repair_status,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Repair Estimates
CREATE TABLE repair_estimates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID NOT NULL REFERENCES repair_jobs(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'draft', -- draft, sent, approved, rejected
    parts_total DECIMAL(12,2) DEFAULT 0,
    labour_total DECIMAL(12,2) DEFAULT 0,
    tax_total DECIMAL(12,2) DEFAULT 0,
    grand_total DECIMAL(12,2) DEFAULT 0,
    notes TEXT,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Repair Parts & Labour
CREATE TABLE repair_parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES repair_estimates(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES repair_jobs(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    item_type TEXT DEFAULT 'part', -- 'part', 'labour'
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit_price DECIMAL(12,2) NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Configuration
ALTER TABLE repair_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_job_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_parts ENABLE ROW LEVEL SECURITY;

-- Standard Policies
CREATE POLICY "Org members can view repair_assets" ON repair_assets FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage repair_assets" ON repair_assets FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view repair_jobs" ON repair_jobs FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage repair_jobs" ON repair_jobs FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view repair_job_events" ON repair_job_events FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage repair_job_events" ON repair_job_events FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view repair_estimates" ON repair_estimates FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage repair_estimates" ON repair_estimates FOR ALL USING (auth.is_org_member(organization_id));

CREATE POLICY "Org members can view repair_parts" ON repair_parts FOR SELECT USING (auth.is_org_member(organization_id));
CREATE POLICY "Org members can manage repair_parts" ON repair_parts FOR ALL USING (auth.is_org_member(organization_id));

-- Triggers
CREATE TRIGGER update_repair_assets_updated_at BEFORE UPDATE ON repair_assets FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_repair_jobs_updated_at BEFORE UPDATE ON repair_jobs FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER update_repair_estimates_updated_at BEFORE UPDATE ON repair_estimates FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
