import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Filter, MoreHorizontal, Truck, Star } from "lucide-react"
import { getVendors } from "@/app/actions/vendors"

export default async function VendorsPage() {
  let vendors = []
  let error = null

  try {
    vendors = await getVendors()
  } catch (e: any) {
    error = e.message || "Failed to fetch vendors"
  }

  // Fallback dummy data if DB is empty or fails
  const displayVendors = vendors.length > 0 ? vendors : [
    { name: "AWS", category: "Cloud Infrastructure", contact_email: "aws-account@spark.ai", rating: 5, status: "Active" },
    { name: "Salesforce", category: "CRM Software", contact_email: "rep@salesforce.com", rating: 4, status: "Active" },
    { name: "WeWork", category: "Real Estate", contact_email: "community@wework.com", rating: 3, status: "Under Review" },
    { name: "Stripe", category: "Payments", contact_email: "support@stripe.com", rating: 5, status: "Active" },
    { name: "Acme Cleaning", category: "Facilities", contact_email: "bob@acme.com", rating: 2, status: "Terminated" },
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
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground mt-1">Manage vendor relationships, contracts, and performance scores.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-foreground rounded-xl">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Active Vendors</h3>
          <div className="text-3xl font-bold text-foreground">18</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Spend (YTD)</h3>
          <div className="text-3xl font-bold text-foreground">$242,500</div>
          <div className="text-xs text-muted-foreground mt-2">Across all vendor contracts</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Needs Review</h3>
          <div className="text-3xl font-bold text-yellow-400">2</div>
          <div className="text-xs text-muted-foreground mt-2">Contracts expiring soon</div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
          <div className="flex items-center gap-2 w-full max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search vendors..." 
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
                <th className="px-6 py-4 font-medium">Vendor Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayVendors.map((vendor: any, i: number) => (
                <tr key={vendor.id || i} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                      <Truck className="h-4 w-4 text-primary" />
                    </div>
                    {vendor.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{vendor.category || vendor.cat}</td>
                  <td className="px-6 py-4 text-muted-foreground">{vendor.contact_email || vendor.contact}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`h-3 w-3 ${j < (vendor.rating || 3) ? "fill-yellow-400" : "text-muted-foreground fill-transparent"}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      vendor.status === 'Active' || vendor.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      vendor.status === 'Under Review' || vendor.status === 'under_review' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {vendor.status}
                    </span>
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
