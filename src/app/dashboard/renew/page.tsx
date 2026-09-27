import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar, Search, Filter, MoreHorizontal, BellRing } from "lucide-react"

export default function RenewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Renew (Radar)</h1>
          <p className="text-muted-foreground mt-1">Track software subscriptions, domains, contracts, and compliance dates.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Renewal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Critical Renewals</h3>
          <div className="text-3xl font-bold text-red-400">3</div>
          <div className="text-xs text-muted-foreground mt-2">Expiring in next 7 days</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Upcoming Renewals (30d)</h3>
          <div className="text-3xl font-bold text-white">8</div>
          <div className="text-xs text-muted-foreground mt-2">Est. Cost: $14,200.00</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Managed Items</h3>
          <div className="text-3xl font-bold text-white">45</div>
          <div className="text-xs text-green-400 mt-2">100% Tracking Coverage</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 w-full max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search renewals..." 
              className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 text-white"
            />
          </div>
          <Button variant="outline" size="sm" className="bg-transparent border-white/10 hover:bg-white/10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground bg-white/5 uppercase border-b border-white/10">
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
              {[
                { name: "AWS Cloud Services", cat: "Infrastructure", cost: "$4,500/mo", date: "Oct 1, 2026", status: "Critical", alert: "Active (SMS + Email)" },
                { name: "sparkradar.ai Domain", cat: "Domain", cost: "$20/yr", date: "Oct 3, 2026", status: "Critical", alert: "Active (Email)" },
                { name: "Office Lease", cat: "Contract", cost: "$8,000/mo", date: "Oct 5, 2026", status: "Critical", alert: "Legal Review Needed" },
                { name: "Salesforce CRM", cat: "Software", cost: "$1,200/yr", date: "Oct 15, 2026", status: "Warning", alert: "Scheduled" },
                { name: "Slack Enterprise", cat: "Software", cost: "$800/mo", date: "Nov 1, 2026", status: "Safe", alert: "Scheduled" },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.cat}</td>
                  <td className="px-6 py-4 text-white font-medium">{item.cost}</td>
                  <td className="px-6 py-4 text-white">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.status === 'Safe' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      item.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs flex items-center gap-1">
                    <BellRing className="h-3 w-3" /> {item.alert}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-white">
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
