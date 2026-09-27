import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Search, Filter, MoreHorizontal } from "lucide-react"
import { getInvoices } from "@/app/actions/collect"

export default async function CollectPage() {
  let invoices = []
  let error = null

  try {
    invoices = await getInvoices()
  } catch (e: any) {
    error = e.message || "Failed to fetch invoices"
  }

  // Fallback dummy data if DB is empty or fails
  const displayInvoices = invoices.length > 0 ? invoices : [
    { id: "INV-2026-001", client: "Acme Corp", amount: "$12,500.00", due_date: "Today", status: "Overdue", auto: "Email Sent (1d ago)" },
    { id: "INV-2026-002", client: "Globex Inc", amount: "$4,200.00", due_date: "In 3 days", status: "Sent", auto: "Scheduled (2d)" },
    { id: "INV-2026-003", client: "Initech", amount: "$8,900.00", due_date: "In 5 days", status: "Sent", auto: "Scheduled (4d)" },
    { id: "INV-2026-004", client: "Soylent Corp", amount: "$1,250.00", due_date: "Past Due", status: "Overdue", auto: "Escalated" },
    { id: "INV-2026-005", client: "Stark Ind", amount: "$45,000.00", due_date: "Paid", status: "Paid", auto: "None" },
  ]

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          <strong>Database Connection Error:</strong> {error}. 
          <span className="block mt-1 opacity-80">Showing demo data until Supabase keys are configured in Vercel.</span>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collect (Invoices)</h1>
          <p className="text-muted-foreground mt-1">Manage your receivables, automate follow-ups, and get paid faster.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-foreground rounded-xl">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Outstanding</h3>
          <div className="text-3xl font-bold text-foreground">$45,231.00</div>
          <div className="text-xs text-red-400 mt-2">12 invoices overdue</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Collected This Month</h3>
          <div className="text-3xl font-bold text-foreground">$128,450.00</div>
          <div className="text-xs text-green-400 mt-2">+14% from last month</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Time to Pay</h3>
          <div className="text-3xl font-bold text-foreground">18 days</div>
          <div className="text-xs text-green-400 mt-2">-2 days from last month</div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
          <div className="flex items-center gap-2 w-full max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search invoices..." 
              className="w-full bg-card border border-border rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 text-foreground"
            />
          </div>
          <Button variant="outline" size="sm" className="bg-transparent border-border hover:bg-muted-foreground/10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-muted uppercase border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice ID</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Due Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Automations</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayInvoices.map((inv: any, i: number) => (
                <tr key={inv.id || i} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {inv.id}
                  </td>
                  <td className="px-6 py-4 text-foreground">{inv.client_id || inv.client}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{inv.amount}</td>
                  <td className="px-6 py-4 text-muted-foreground">{inv.due_date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      inv.status === 'Paid' || inv.status === 'paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      inv.status === 'Overdue' || inv.status === 'overdue' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{inv.auto || 'None'}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
