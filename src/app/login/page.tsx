"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Zap, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { login } from "../actions/auth"

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; message?: string }
}) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSimulatedAuth = (e: React.FormEvent) => {
    e.preventDefault()
    alert("OAuth login is not configured yet. Please sign in with email.")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md p-8 glass-panel rounded-3xl shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(124,58,237,0.5)]">
            <Zap className="h-6 w-6 text-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-center">
            Sign in to Spark Radar to manage your operations.
          </p>
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
            Continue with GitHub
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
            Continue with Google
          </Button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background/80 backdrop-blur-sm px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        <form action={login} className="space-y-4">
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
              placeholder="••••••••" 
              className="h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary rounded-xl"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-primary hover:bg-primary/90 text-foreground rounded-xl font-medium mt-2 shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Don't have an account? <Link href="/signup" className="text-primary hover:underline font-medium">Sign up</Link>
        </p>
      </motion.div>
    </div>
  )
}
