"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Zap, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signup } from "../actions/auth"

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSimulatedAuth = (e: React.FormEvent) => {
    e.preventDefault()
    alert("OAuth login is not configured yet. Please sign up with email.")
  }

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row my-8 rounded-3xl overflow-hidden glass-panel shadow-2xl z-10 relative border border-border">
        
        {/* Left Side - Copy */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-card border-r border-border w-1/2 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 z-0 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <Zap className="h-5 w-5 text-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">Spark Radar</span>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-6 leading-tight">
                  One intelligent radar for every important payment, renewal, repair, document, vendor and task.
                </h2>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
                  <p className="text-lg text-primary-foreground italic">
                    “What do I need to collect, pay, renew, repair, follow up or complete — and when?”
                  </p>
                </div>
              </div>

              <div className="space-y-6 pt-6">
                <div className="bg-muted border border-border p-5 rounded-xl">
                  <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    Personal Workspace
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bills, Insurance, Vehicle service, Documents, Memberships, Subscriptions, Licences, Important dates, Payments, Renewals, Personal reminders, Family & shared responsibilities.
                  </p>
                </div>
                
                <div className="bg-muted border border-border p-5 rounded-xl">
                  <h3 className="text-foreground font-semibold mb-3 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500" />
                    Business Workspace
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Customers, Receivables, Payments, Invoices, Contracts, Renewals, Insurance, Licences, AMC, Vendor management, Purchase follow-up, Repairs/service jobs, Employee/company documents, Customer communications, Tasks, Team assignments, Reports, AI assistant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-card">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm mx-auto"
          >
            <div className="flex flex-col items-center mb-8 lg:hidden">
              <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                <Zap className="h-6 w-6 text-foreground" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Spark Radar</h1>
              <p className="text-muted-foreground text-center">
                One intelligent radar for every important task.
              </p>
            </div>

            <div className="mb-8 hidden lg:block">
              <h2 className="text-2xl font-bold text-foreground mb-2">Create your account</h2>
              <p className="text-muted-foreground">Start tracking what matters most.</p>
            </div>

            {searchParams?.error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                {searchParams.error}
              </div>
            )}
            
            {searchParams?.message && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-sm">
                {searchParams.message}
              </div>
            )}

            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full h-12 bg-muted border-border hover:bg-muted-foreground/10 text-foreground rounded-xl transition-all"
                onClick={() => handleSimulatedAuth({ preventDefault: () => {} } as any)}
              >
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Sign up with GitHub
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 bg-muted border-border hover:bg-muted-foreground/10 text-foreground rounded-xl transition-all"
                onClick={() => handleSimulatedAuth({ preventDefault: () => {} } as any)}
              >
                <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </Button>
            </div>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with email
                </span>
              </div>
            </div>

            <form action={signup} className="space-y-4">
              <div className="space-y-2">
                <Input 
                  name="fullName"
                  type="text" 
                  placeholder="Full Name" 
                  className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input 
                  name="companyName"
                  type="text" 
                  placeholder="Company Name (Optional)" 
                  className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Input 
                  name="email"
                  type="email" 
                  placeholder="name@company.com" 
                  className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary rounded-xl"
                  required
                />
              </div>
              <div className="space-y-2">
                <Input 
                  name="password"
                  type="password" 
                  placeholder="Create a password" 
                  className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary rounded-xl"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 text-foreground rounded-xl font-medium mt-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2"
              >
                Create Account <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account? <Link href="/login" className="text-primary hover:underline font-medium">Sign in</Link>
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
