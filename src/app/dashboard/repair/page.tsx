import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Filter, MoreHorizontal, Wrench, AlertTriangle } from "lucide-react"
import { getRepairs } from "@/app/actions/repair"

export default async function RepairPage() {
  let repairs = []
  let error = null

  try {
    repairs = await getRepairs()
  } catch (e: any) {
    error = e.message || "Failed to fetch repairs"
  }

  // Fallback dummy data if DB is empty or fails
  const displayRepairs = repairs.length > 0 ? repairs : [
    { title: "HVAC Unit A", location: "Building 1, Roof", description: "Making loud grinding noise", status: "Critical", assigned_to: "Acme Repair Co." },
    { title: "Conference Room Projector", location: "Room 4B", description: "Bulb needs replacement", status: "Pending", assigned_to: "Internal IT" },
    { title: "Employee Laptop (MacBook)", location: "Remote (Jane D.)", description: "Battery swelling", status: "Critical", assigned_to: "Apple Care" },
    { title: "Espresso Machine", location: "Kitchen 2", description: "Routine Descaling", status: "Scheduled", assigned_to: "Office Admin" },
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
              {displayRepairs.map((repair: any, i: number) => (
                <tr key={repair.id || i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    {repair.title || repair.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{repair.location || repair.loc}</td>
                  <td className="px-6 py-4 text-white max-w-[200px] truncate" title={repair.description || repair.issue}>{repair.description || repair.issue}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex w-fit items-center gap-1 ${
                      repair.status === 'Scheduled' || repair.status === 'scheduled' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      repair.status === 'Critical' || repair.status === 'critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    }`}>
                      {(repair.status === 'Critical' || repair.status === 'critical') && <AlertTriangle className="h-3 w-3" />}
                      {repair.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{repair.assigned_to || repair.ass}</td>
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
