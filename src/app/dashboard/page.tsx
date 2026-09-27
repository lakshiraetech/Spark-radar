import { Button } from "@/components/ui/button"

export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <Button>Ask Spark AI</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Overdue Invoices</h3>
          </div>
          <div className="text-2xl font-bold">$4,231.00</div>
          <p className="text-xs text-muted-foreground">+2 since last week</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Critical Renewals</h3>
          </div>
          <div className="text-2xl font-bold">3 items</div>
          <p className="text-xs text-muted-foreground">Due in next 7 days</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Repairs</h3>
          </div>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">4 awaiting approval</p>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Pending Tasks</h3>
          </div>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">2 assigned to you</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="col-span-4 rounded-xl border bg-card shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight mb-4">Recent Activity</h3>
          <div className="text-sm text-muted-foreground">Connect database to see real-time activity...</div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card shadow-sm p-6">
          <h3 className="font-semibold leading-none tracking-tight mb-4">Attention Needed</h3>
          <div className="text-sm text-muted-foreground">No critical items detected today.</div>
        </div>
      </div>
    </div>
  )
}
