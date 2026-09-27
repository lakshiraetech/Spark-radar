import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Search, Filter, MoreHorizontal, ArrowRight } from "lucide-react"

export default function CollectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collect (Invoices)</h1>
          <p className="text-muted-foreground mt-1">Manage your receivables, automate follow-ups, and get paid faster.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Outstanding</h3>
          <div className="text-3xl font-bold text-white">$45,231.00</div>
          <div className="text-xs text-red-400 mt-2">12 invoices overdue</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Collected This Month</h3>
          <div className="text-3xl font-bold text-white">$128,450.00</div>
          <div className="text-xs text-green-400 mt-2">+14% from last month</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Time to Pay</h3>
          <div className="text-3xl font-bold text-white">18 days</div>
          <div className="text-xs text-green-400 mt-2">-2 days from last month</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 w-full max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search invoices..." 
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
              {[
                { id: "INV-2026-001", client: "Acme Corp", amount: "$12,500.00", due: "Today", status: "Overdue", auto: "Email Sent (1d ago)" },
                { id: "INV-2026-002", client: "Globex Inc", amount: "$4,200.00", due: "In 3 days", status: "Sent", auto: "Scheduled (2d)" },
                { id: "INV-2026-003", client: "Initech", amount: "$8,900.00", due: "In 5 days", status: "Sent", auto: "Scheduled (4d)" },
                { id: "INV-2026-004", client: "Soylent Corp", amount: "$1,250.00", due: "Past Due", status: "Overdue", auto: "Escalated" },
                { id: "INV-2026-005", client: "Stark Ind", amount: "$45,000.00", due: "Paid", status: "Paid", auto: "None" },
              ].map((inv, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {inv.id}
                  </td>
                  <td className="px-6 py-4 text-white">{inv.client}</td>
                  <td className="px-6 py-4 font-medium text-white">{inv.amount}</td>
                  <td className="px-6 py-4 text-muted-foreground">{inv.due}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      inv.status === 'Paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      inv.status === 'Overdue' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{inv.auto}</td>
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
