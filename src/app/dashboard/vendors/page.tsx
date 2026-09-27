import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Filter, MoreHorizontal, Truck, Star } from "lucide-react"

export default function VendorsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
          <p className="text-muted-foreground mt-1">Manage vendor relationships, contracts, and performance scores.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Active Vendors</h3>
          <div className="text-3xl font-bold text-white">18</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Spend (YTD)</h3>
          <div className="text-3xl font-bold text-white">$242,500</div>
          <div className="text-xs text-muted-foreground mt-2">Across all vendor contracts</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Needs Review</h3>
          <div className="text-3xl font-bold text-yellow-400">2</div>
          <div className="text-xs text-muted-foreground mt-2">Contracts expiring soon</div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-2 w-full max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search vendors..." 
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
                <th className="px-6 py-4 font-medium">Vendor Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Contact</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "AWS", cat: "Cloud Infrastructure", contact: "aws-account@spark.ai", rating: 5, status: "Active" },
                { name: "Salesforce", cat: "CRM Software", contact: "rep@salesforce.com", rating: 4, status: "Active" },
                { name: "WeWork", cat: "Real Estate", contact: "community@wework.com", rating: 3, status: "Under Review" },
                { name: "Stripe", cat: "Payments", contact: "support@stripe.com", rating: 5, status: "Active" },
                { name: "Acme Cleaning", cat: "Facilities", contact: "bob@acme.com", rating: 2, status: "Terminated" },
              ].map((vendor, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                      <Truck className="h-4 w-4 text-primary" />
                    </div>
                    {vendor.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{vendor.cat}</td>
                  <td className="px-6 py-4 text-muted-foreground">{vendor.contact}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`h-3 w-3 ${j < vendor.rating ? "fill-yellow-400" : "text-white/20 fill-transparent"}`} />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      vendor.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      vendor.status === 'Under Review' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {vendor.status}
                    </span>
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
