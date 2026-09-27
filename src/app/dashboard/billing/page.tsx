import { Button } from "@/components/ui/button"
import { CreditCard, CheckCircle2 } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Billing & Plans</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Free Plan */}
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col relative overflow-hidden">
          <h3 className="font-semibold text-lg text-foreground">Hobby</h3>
          <p className="text-sm text-muted-foreground mt-2">For personal tracking</p>
          <div className="mt-4 flex items-baseline text-3xl font-extrabold text-foreground">
            Free
          </div>
          <ul className="mt-6 space-y-3 flex-1">
            <li className="flex items-center text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> 1 Workspace</li>
            <li className="flex items-center text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Basic Reminders</li>
          </ul>
          <Button variant="outline" className="mt-8 w-full border-border text-foreground">Current Plan</Button>
        </div>

        {/* Pro Plan */}
        <div className="rounded-xl border-2 border-primary bg-card p-6 flex flex-col relative overflow-hidden shadow-lg shadow-primary/10">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
            RECOMMENDED
          </div>
          <h3 className="font-semibold text-lg text-foreground">Professional</h3>
          <p className="text-sm text-muted-foreground mt-2">For freelancers & SMBs</p>
          <div className="mt-4 flex items-baseline text-3xl font-extrabold text-foreground">
            ₹1,999 <span className="text-sm font-medium text-muted-foreground ml-1">/mo</span>
          </div>
          <ul className="mt-6 space-y-3 flex-1">
            <li className="flex items-center text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> 5 Workspaces</li>
            <li className="flex items-center text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Advanced Automations</li>
            <li className="flex items-center text-sm text-muted-foreground"><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Payment Links (Stripe)</li>
          </ul>
          {/* We would normally wrap this in a form for a Server Action to create a Stripe Checkout Session */}
          <form action="/api/checkout" method="POST" className="mt-8">
             <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <CreditCard className="w-4 h-4 mr-2" /> Upgrade to Pro
            </Button>
          </form>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-4 text-foreground">Payment Methods</h3>
        <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-muted">
              <CreditCard className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">No payment method added</p>
              <p className="text-sm text-muted-foreground">Add a card to upgrade your subscription.</p>
            </div>
          </div>
          <Button variant="outline">Add Card</Button>
        </div>
      </div>
    </div>
  )
}
