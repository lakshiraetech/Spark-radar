# Spark AI

Spark AI is a secure intelligent assistant integrated directly into the workspace.

## Philosophy
- **No Direct DB Access**: AI relies solely on secure server-side tools.
- **Tenant Isolation**: Tools enforce `organization_id` based on the authenticated session.
- **Confirmation Required**: Destructive or financial changes (e.g. creating invoices, deleting records) require manual user confirmation via UI.

## Capabilities
- Summarize upcoming tasks, renewals, and overdue invoices.
- Search records naturally.
- Draft emails and notifications using contextual data.
