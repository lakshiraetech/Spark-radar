'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'
import { 
  ArrowRight, Zap, CheckCircle2, AlertCircle, Clock, Search, 
  Briefcase, User, Wallet, RotateCw, Wrench, Package, Heart, Bot, Building2
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-background backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">Spark Radar</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#engines" className="hover:text-foreground transition-colors">The 5 Engines</Link>
            <Link href="#workspaces" className="hover:text-foreground transition-colors">Workspaces</Link>
            <Link href="#ai" className="hover:text-foreground transition-colors">Spark AI</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link href="/signup">
              <Button className="rounded-full bg-primary hover:bg-primary/90 text-foreground border-0">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        
        {/* HERO SECTION */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center hero-gradient">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
          
          <div className="container px-4 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                One intelligent radar for every important task.
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 max-w-5xl leading-tight">
                Never Miss <br/> What Matters.
              </h1>
              
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground mt-4 leading-relaxed">
                Spark Radar keeps your payments, renewals, repairs, documents, vendors and important tasks visible in one intelligent workspace.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/signup">
                  <Button size="lg" className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-foreground shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:scale-105">
                    Start Free
                  </Button>
                </Link>
                <Link href="#engines">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-border bg-muted hover:bg-muted-foreground/10 text-foreground backdrop-blur-sm transition-all hover:scale-105">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROBLEM STATEMENT */}
        <section className="w-full py-24 bg-card border-y border-border relative overflow-hidden">
          <div className="container px-4 text-center relative z-10">
            <p className="text-xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto text-muted-foreground">
              "What do I need to collect, pay, renew, repair, follow up or complete — and when?"
            </p>
            <p className="mt-6 text-primary font-semibold tracking-wide uppercase text-sm">
              Spark Radar helps you answer this instantly.
            </p>
          </div>
        </section>

        {/* TWO OPERATING MODES */}
        <section id="workspaces" className="w-full py-24 relative">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Two Operating Modes</h2>
              <p className="text-muted-foreground text-lg">Built for the complexity of business, simplified for your personal life.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="glass-panel p-10 rounded-3xl border border-border relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/20 transition-colors" />
                <User className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Personal Workspace</h3>
                <p className="text-muted-foreground mb-8">For normal users managing life's admin.</p>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Bills & Insurance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Vehicle Service</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Documents</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Memberships</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Family Responsibilities</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Important Dates</li>
                </ul>
              </div>

              <div className="glass-panel p-10 rounded-3xl border border-border relative overflow-hidden group hover:border-primary/50 transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-purple-500/20 transition-colors" />
                <Building2 className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-2">Business Workspace</h3>
                <p className="text-muted-foreground mb-8">For companies tracking operations.</p>
                <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Receivables & Invoices</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Vendor Management</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Contracts & AMCs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Team Assignments</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Service/Repair Jobs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> AI Assistant & Reports</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* THE FIVE ENGINES */}
        <section id="engines" className="w-full py-24 bg-card border-y border-border">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Spark Radar Engines</h2>
              <p className="text-muted-foreground text-lg">One unified platform powered by distinct, purpose-built engines.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Collect */}
              <div className="glass-panel p-8 rounded-2xl">
                <Wallet className="h-10 w-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Spark Collect</h3>
                <p className="text-sm text-muted-foreground mb-4">Track money that should be received. Automate aging, payment links, and reminders.</p>
                <div className="bg-card p-4 rounded-xl border border-border text-sm">
                  <div className="flex justify-between mb-2"><span className="text-muted-foreground">Invoice:</span><span>INV-1045</span></div>
                  <div className="flex justify-between mb-2"><span className="text-muted-foreground">Amount:</span><span className="font-bold text-emerald-400">₹39,000</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Status:</span><span className="text-yellow-400 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Pending</span></div>
                </div>
              </div>

              {/* Renew */}
              <div className="glass-panel p-8 rounded-2xl">
                <RotateCw className="h-10 w-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Spark Renew</h3>
                <p className="text-sm text-muted-foreground mb-4">Anything with an expiration date. Contracts, domains, insurance, and AMCs.</p>
                <div className="bg-card p-4 rounded-xl border border-border text-sm space-y-2">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> <span className="text-muted-foreground">1 day:</span> Critical</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"/> <span className="text-muted-foreground">7 days:</span> Urgent</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-yellow-500"/> <span className="text-muted-foreground">14 days:</span> Attention</div>
                </div>
              </div>

              {/* Repair */}
              <div className="glass-panel p-8 rounded-2xl">
                <Wrench className="h-10 w-10 text-orange-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Spark Repair</h3>
                <p className="text-sm text-muted-foreground mb-4">Track customer service jobs step-by-step from estimate to final delivery.</p>
                <div className="bg-card p-4 rounded-xl border border-border text-sm relative">
                  <div className="absolute left-[21px] top-6 bottom-6 w-px bg-muted-foreground/10" />
                  <div className="flex items-center gap-3 mb-3 relative z-10"><CheckCircle2 className="w-4 h-4 text-emerald-400"/> Diagnosis</div>
                  <div className="flex items-center gap-3 mb-3 relative z-10"><Clock className="w-4 h-4 text-yellow-400"/> Approval</div>
                  <div className="flex items-center gap-3 relative z-10"><div className="w-4 h-4 rounded-full border-2 border-border"/> Repair</div>
                </div>
              </div>

              {/* Vendor */}
              <div className="glass-panel p-8 rounded-2xl">
                <Package className="h-10 w-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Spark Vendor</h3>
                <p className="text-sm text-muted-foreground mb-4">Track purchase orders, expected deliveries, pending payments, and vendor docs.</p>
                <div className="bg-card p-4 rounded-xl border border-border text-sm">
                  <div className="font-medium mb-2">Vendor: XYZ Auto Parts</div>
                  <div className="flex justify-between mb-1"><span className="text-muted-foreground">Delivery:</span><span>Expected 30 Sep</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Payment:</span><span className="text-yellow-400">₹45,000 pending</span></div>
                </div>
              </div>

              {/* Life */}
              <div className="glass-panel p-8 rounded-2xl md:col-span-2">
                <Heart className="h-10 w-10 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Spark Life</h3>
                <p className="text-sm text-muted-foreground mb-4 max-w-2xl">Because people forget bills, documents, and important dates. Expanding Spark Radar from a business SaaS into an essential tool for everyday life.</p>
                <div className="flex flex-wrap gap-2">
                  {['Electricity bill', 'Passport', 'Driving licence', 'Medical appointment', 'School fee'].map(tag => (
                    <span key={tag} className="px-3 py-1 bg-muted border border-border rounded-full text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPARK AI SECTION */}
        <section id="ai" className="w-full py-24 relative overflow-hidden">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm mb-6">
                  <Bot className="w-4 h-4 mr-2" /> Powered by Open AI
                </div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Not merely a chatbot. <br/>An executive assistant.</h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  The AI understands your actual Spark Radar records. Ask natural questions, get exact data, and let the AI execute authorized commands like creating reminders or drafting invoices.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 bg-muted p-3 rounded-lg border border-border">
                    <Search className="w-5 h-5 text-primary" /> "Show overdue payments."
                  </li>
                  <li className="flex items-center gap-3 bg-muted p-3 rounded-lg border border-border">
                    <Search className="w-5 h-5 text-primary" /> "Which renewals are coming this month?"
                  </li>
                  <li className="flex items-center gap-3 bg-muted p-3 rounded-lg border border-border">
                    <Search className="w-5 h-5 text-primary" /> "What should I handle today?"
                  </li>
                </ul>
              </div>
              <div className="glass-panel p-6 rounded-3xl border border-border">
                <div className="bg-card rounded-2xl p-6 border border-border font-mono text-sm leading-relaxed">
                  <div className="text-muted-foreground mb-4">{">"} What is going to become a problem in the next 30 days?</div>
                  <div className="text-primary mb-2">Analyzing database records...</div>
                  <div className="text-muted-foreground">3 important items need attention:</div>
                  <br/>
                  <div className="text-red-400">1. Car insurance expires in 9 days.</div>
                  <div className="text-orange-400">2. ABC Traders payment of ₹39,000 is overdue.</div>
                  <div className="text-yellow-400">3. Office AMC renewal is due in 16 days.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="w-full py-24 bg-card border-y border-border">
          <div className="container px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Pricing Structure</h2>
              <p className="text-muted-foreground text-lg">Start for free, scale to the enterprise.</p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              
              <div className="glass-panel p-6 rounded-2xl flex flex-col">
                <h3 className="font-bold text-lg text-muted-foreground">Free</h3>
                <div className="text-3xl font-bold my-4">₹0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                  <li>20 active records</li>
                  <li>1 workspace</li>
                  <li>1 user</li>
                  <li>Basic reminders</li>
                </ul>
                <Button variant="outline" className="w-full border-border bg-muted hover:bg-muted-foreground/10 text-foreground">Start Free</Button>
              </div>

              <div className="glass-panel p-6 rounded-2xl flex flex-col">
                <h3 className="font-bold text-lg text-muted-foreground">Personal</h3>
                <div className="text-3xl font-bold my-4">₹199<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                  <li>100 records</li>
                  <li>1 user</li>
                  <li>Documents</li>
                  <li>Email notifications</li>
                </ul>
                <Button variant="outline" className="w-full border-border bg-muted hover:bg-muted-foreground/10 text-foreground">Choose Plan</Button>
              </div>

              <div className="glass-panel p-6 rounded-2xl flex flex-col border-primary/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 h-1 bg-primary"></div>
                <h3 className="font-bold text-lg text-primary">Business Starter</h3>
                <div className="text-3xl font-bold my-4">₹499<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                  <li>500 records</li>
                  <li>5 users</li>
                  <li>Customers</li>
                  <li>Collect & Renew modules</li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-foreground">Choose Plan</Button>
              </div>

              <div className="glass-panel p-6 rounded-2xl flex flex-col">
                <h3 className="font-bold text-lg text-muted-foreground">Business Pro</h3>
                <div className="text-3xl font-bold my-4">₹999<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                  <li>2,500 records</li>
                  <li>15 users</li>
                  <li>AI Assistant</li>
                  <li>Vendor & Reports</li>
                </ul>
                <Button variant="outline" className="w-full border-border bg-muted hover:bg-muted-foreground/10 text-foreground">Choose Plan</Button>
              </div>

              <div className="glass-panel p-6 rounded-2xl flex flex-col">
                <h3 className="font-bold text-lg text-muted-foreground">Business Plus</h3>
                <div className="text-3xl font-bold my-4">₹1,999<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <ul className="text-sm text-muted-foreground space-y-3 mb-8 flex-1">
                  <li>10,000+ records</li>
                  <li>50 users</li>
                  <li>Advanced reports</li>
                  <li>API & Priority support</li>
                </ul>
                <Button variant="outline" className="w-full border-border bg-muted hover:bg-muted-foreground/10 text-foreground">Choose Plan</Button>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold">Spark Radar</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Spark Radar Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
