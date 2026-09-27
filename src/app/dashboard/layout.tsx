import { ReactNode } from "react"
import Link from "next/link"
import { Home, FileText, Calendar, Wrench, Truck, ShieldQuestion, BrainCircuit } from "lucide-react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-xl tracking-tighter">Spark Radar</span>
        </Link>
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:text-sm md:gap-5 lg:gap-6 ml-10">
          <Link href="/dashboard" className="text-foreground transition-colors hover:text-foreground">
            Overview
          </Link>
          <Link href="/dashboard/collect" className="text-muted-foreground transition-colors hover:text-foreground">
            Collect
          </Link>
          <Link href="/dashboard/renew" className="text-muted-foreground transition-colors hover:text-foreground">
            Renew
          </Link>
          <Link href="/dashboard/repair" className="text-muted-foreground transition-colors hover:text-foreground">
            Repair
          </Link>
          <Link href="/dashboard/vendors" className="text-muted-foreground transition-colors hover:text-foreground">
            Vendors
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold cursor-pointer">
            A
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 flex-col border-r bg-background md:flex">
          <nav className="grid gap-2 p-4 text-sm font-medium">
            <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
              <Home className="h-4 w-4" />
              Overview
            </Link>
            <Link href="/dashboard/collect" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <FileText className="h-4 w-4" />
              Collect (Invoices)
            </Link>
            <Link href="/dashboard/renew" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Calendar className="h-4 w-4" />
              Renew
            </Link>
            <Link href="/dashboard/repair" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Wrench className="h-4 w-4" />
              Repair
            </Link>
            <Link href="/dashboard/vendors" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Truck className="h-4 w-4" />
              Vendors
            </Link>
            <Link href="/dashboard/support" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <ShieldQuestion className="h-4 w-4" />
              Support
            </Link>
            <Link href="/dashboard/ai" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <BrainCircuit className="h-4 w-4" />
              Spark AI
            </Link>
            <div className="mt-4 pt-4 border-t border-border">
              <Link href="/dashboard/billing" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                Billing & Plans
              </Link>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
