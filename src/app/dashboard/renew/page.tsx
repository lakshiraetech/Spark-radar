import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar, Search, Filter, MoreHorizontal, BellRing } from "lucide-react"
import { getRenewals } from "@/app/actions/renew"

export default async function RenewPage() {
  let renewals = []
  let error = null

  try {
    renewals = await getRenewals()
  } catch (e: any) {
    error = e.message || "Failed to fetch renewals"
  }

  // Fallback dummy data if DB is empty or fails
  const displayRenewals = renewals.length > 0 ? renewals : [
    { name: "AWS Cloud Services", cat: "Infrastructure", cost: "$4,500/mo", renewal_date: "Oct 1, 2026", status: "Critical", alert: "Active (SMS + Email)" },
    { name: "sparkradar.ai Domain", cat: "Domain", cost: "$20/yr", renewal_date: "Oct 3, 2026", status: "Critical", alert: "Active (Email)" },
    { name: "Office Lease", cat: "Contract", cost: "$8,000/mo", renewal_date: "Oct 5, 2026", status: "Critical", alert: "Legal Review Needed" },
    { name: "Salesforce CRM", cat: "Software", cost: "$1,200/yr", renewal_date: "Oct 15, 2026", status: "Warning", alert: "Scheduled" },
    { name: "Slack Enterprise", cat: "Software", cost: "$800/mo", renewal_date: "Nov 1, 2026", status: "Safe", alert: "Scheduled" },
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
          <h1 className="text-3xl font-bold tracking-tight">Renew (Radar)</h1>
          <p className="text-muted-foreground mt-1">Track software subscriptions, domains, contracts, and compliance dates.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-foreground rounded-xl">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Renewal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Critical Renewals</h3>
          <div className="text-3xl font-bold text-red-400">3</div>
          <div className="text-xs text-muted-foreground mt-2">Expiring in next 7 days</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Upcoming Renewals (30d)</h3>
          <div className="text-3xl font-bold text-foreground">8</div>
          <div className="text-xs text-muted-foreground mt-2">Est. Cost: $14,200.00</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Managed Items</h3>
          <div className="text-3xl font-bold text-foreground">45</div>
          <div className="text-xs text-green-400 mt-2">100% Tracking Coverage</div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
          <div className="flex items-center gap-2 w-full max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search renewals..." 
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
                <th className="px-6 py-4 font-medium">Item Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Cost / Period</th>
                <th className="px-6 py-4 font-medium">Renewal Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Alerts</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayRenewals.map((item: any, i: number) => (
                <tr key={item.id || i} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {item.item_name || item.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category || item.cat}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{item.cost_amount ? `$${item.cost_amount}` : item.cost}</td>
                  <td className="px-6 py-4 text-foreground">{item.renewal_date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.status === 'Safe' || item.status === 'safe' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      item.status === 'Critical' || item.status === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs flex items-center gap-1">
                    <BellRing className="h-3 w-3" /> {item.alert || 'None'}
                  </td>
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
