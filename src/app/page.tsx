"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Activity, ShieldCheck, Zap, BarChart, CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Spark Radar</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-primary transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-white">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 hero-gradient relative">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10" />

        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Spark Radar 2.0 is now live
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 max-w-4xl">
                The Intelligent Nervous System for your Business
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground mt-4">
                One intelligent radar for every important payment, renewal, repair, vendor follow-up, document, and task. Never drop the ball again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/login">
                  <Button size="lg" className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all hover:scale-105">
                    Start for free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-105">
                    Book a demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 relative mx-auto max-w-6xl animate-float"
            >
              <div className="rounded-xl border border-white/10 bg-background/50 p-2 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="rounded-lg border border-white/5 bg-[#0a0a0a] overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                      <div className="h-3 w-3 rounded-full bg-green-500/80" />
                    </div>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-1 space-y-4">
                      <div className="h-8 w-3/4 rounded bg-white/5" />
                      <div className="h-4 w-full rounded bg-white/5" />
                      <div className="h-4 w-5/6 rounded bg-white/5" />
                      <div className="h-4 w-4/6 rounded bg-white/5" />
                    </div>
                    <div className="col-span-3 grid grid-cols-2 gap-4">
                      <div className="h-32 rounded-lg bg-primary/10 border border-primary/20 flex flex-col justify-center p-6">
                        <div className="text-sm text-primary/80 mb-2">Pending Invoices</div>
                        <div className="text-3xl font-bold text-white">$12,450</div>
                      </div>
                      <div className="h-32 rounded-lg bg-white/5 border border-white/5 flex flex-col justify-center p-6">
                        <div className="text-sm text-muted-foreground mb-2">Upcoming Renewals</div>
                        <div className="text-3xl font-bold text-white">4 items</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 border-t border-white/5 bg-black/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                Everything you need to run your operations
              </h2>
              <p className="text-muted-foreground max-w-[800px] text-lg">
                Stop manually tracking tasks in spreadsheets. Spark Radar automates your workflows using intelligent agents and real-time alerts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Intelligent Collection", desc: "Automate invoice follow-ups and instantly track payment status across all your vendors and clients.", icon: Activity },
                { title: "Renewal Radar", desc: "Never miss a software subscription, contract, or domain renewal again. Get alerted before you get charged.", icon: Zap },
                { title: "Secure & Compliant", desc: "Enterprise-grade security with role-based access control, audit logs, and complete data isolation.", icon: ShieldCheck }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel p-8 rounded-2xl flex flex-col items-start gap-4 transition-all hover:bg-white/5"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-background py-12">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold">Spark Radar SaaS</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Spark Radar Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
