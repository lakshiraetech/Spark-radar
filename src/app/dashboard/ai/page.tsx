import { Button } from "@/components/ui/button"
import { PlusCircle, BrainCircuit, Search, Filter, MoreHorizontal, Bot, Sparkles, MessageSquare } from "lucide-react"

export default function AiPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Spark AI</h1>
          <p className="text-muted-foreground mt-1">Your autonomous agent for operations, analysis, and communication.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-foreground rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.4)]">
          <Sparkles className="mr-2 h-4 w-4" />
          New Automation
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-primary/30 bg-primary/10 p-6 backdrop-blur-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
          <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Bot className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium text-primary">Chat with Data</h3>
            </div>
            <p className="text-2xl font-bold text-foreground mb-4">Ask anything</p>
            <div className="text-sm text-muted-foreground mb-4">"Which clients have unpaid invoices over 30 days?"</div>
            <Button variant="outline" className="w-full bg-card border-primary/20 text-foreground hover:bg-primary/20">
              <MessageSquare className="mr-2 h-4 w-4" /> Start Chat
            </Button>
          </div>
        </div>
        
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Automated Actions Taken (30d)</h3>
          <div className="text-3xl font-bold text-foreground">1,420</div>
          <div className="text-xs text-green-400 mt-2">Saved ~48 human hours</div>
        </div>
        
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">AI Accuracy</h3>
          <div className="text-3xl font-bold text-foreground">99.8%</div>
          <div className="text-xs text-muted-foreground mt-2">Based on human overrides</div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden mt-4">
        <div className="p-4 border-b border-border bg-muted">
          <h3 className="font-semibold text-foreground">Active AI Workflows</h3>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { name: "Invoice Follow-ups", desc: "Automatically emails clients 3 days before and 1 day after due date with custom tone.", status: "Active", runs: "142 runs this week" },
            { name: "Support Ticket Triage", desc: "Reads incoming support emails, categorizes them, and replies with help docs.", status: "Active", runs: "89 runs this week" },
            { name: "Vendor Contract Extraction", desc: "Extracts dates and costs from uploaded PDF vendor contracts into the database.", status: "Active", runs: "12 runs this week" },
            { name: "Overdue Risk Predictor", desc: "Flags clients who have a high likelihood of paying late based on historical data.", status: "Learning", runs: "Needs more data" },
          ].map((workflow, i) => (
            <div key={i} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">{workflow.name}</h4>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${workflow.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {workflow.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{workflow.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">{workflow.runs}</span>
                <Button variant="outline" size="sm" className="bg-transparent border-border hover:bg-muted-foreground/10">Configure</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
