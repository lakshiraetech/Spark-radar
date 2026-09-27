import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Filter, MoreHorizontal, Wrench, AlertTriangle } from "lucide-react"

export default function RepairPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Repairs & Assets</h1>
          <p className="text-muted-foreground mt-1">Manage physical assets, maintenance schedules, and repair tickets.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Repair Issue
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Assets Needing Repair</h3>
          <div className="text-3xl font-bold text-red-400">4</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Scheduled Maintenance</h3>
          <div className="text-3xl font-bold text-white">12</div>
          <div className="text-xs text-muted-foreground mt-2">Within next 30 days</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Repair Cost (YTD)</h3>
          <div className="text-3xl font-bold text-white">$4,250</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 w-full max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search repairs and assets..." 
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
                <th className="px-6 py-4 font-medium">Asset / Item</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Issue</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Assigned To</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "HVAC Unit A", loc: "Building 1, Roof", issue: "Making loud grinding noise", status: "Critical", ass: "Acme Repair Co." },
                { name: "Conference Room Projector", loc: "Room 4B", issue: "Bulb needs replacement", status: "Pending", ass: "Internal IT" },
                { name: "Employee Laptop (MacBook)", loc: "Remote (Jane D.)", issue: "Battery swelling", status: "Critical", ass: "Apple Care" },
                { name: "Espresso Machine", loc: "Kitchen 2", issue: "Routine Descaling", status: "Scheduled", ass: "Office Admin" },
              ].map((repair, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    {repair.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{repair.loc}</td>
                  <td className="px-6 py-4 text-white max-w-[200px] truncate" title={repair.issue}>{repair.issue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex w-fit items-center gap-1 ${
                      repair.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      repair.status === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {repair.status === 'Critical' && <AlertTriangle className="h-3 w-3" />}
                      {repair.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{repair.ass}</td>
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
