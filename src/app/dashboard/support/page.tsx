import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, AlertCircle, PlusCircle, Search, Filter, MoreHorizontal, ArrowRight } from "lucide-react"

export default function SupportTasksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support & Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage customer support tickets, internal tasks, and automated workflows.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-foreground rounded-xl">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Open Tickets</h3>
          <div className="text-3xl font-bold text-foreground">24</div>
          <div className="text-xs text-yellow-400 mt-2">5 high priority</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">My Tasks</h3>
          <div className="text-3xl font-bold text-foreground">7</div>
          <div className="text-xs text-red-400 mt-2">2 overdue</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Avg Resolution Time</h3>
          <div className="text-3xl font-bold text-foreground">4.2 hrs</div>
          <div className="text-xs text-green-400 mt-2">-1.1 hrs this week</div>
        </div>
        <div className="rounded-xl border border-border bg-muted p-6 backdrop-blur-sm">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">AI Resolution Rate</h3>
          <div className="text-3xl font-bold text-primary">68%</div>
          <div className="text-xs text-primary/80 mt-2">Resolved without human</div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted">
          <div className="flex items-center gap-2 w-full max-w-sm relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search tasks and tickets..." 
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
                <th className="px-6 py-4 font-medium">Task / Ticket</th>
                <th className="px-6 py-4 font-medium">Reporter</th>
                <th className="px-6 py-4 font-medium">Assignee</th>
                <th className="px-6 py-4 font-medium">Priority</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Updated</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { title: "Customer portal login failing", rep: "John Doe (Client)", ass: "Jane Smith", prio: "High", status: "In Progress", up: "10m ago" },
                { title: "Review Q3 Marketing Budget", rep: "System (Automated)", ass: "You", prio: "Medium", status: "To Do", up: "2h ago" },
                { title: "Renew SSL Certificate", rep: "Spark AI", ass: "You", prio: "High", status: "Overdue", up: "1d ago" },
                { title: "Update Terms of Service", rep: "Legal Dept", ass: "Unassigned", prio: "Low", status: "To Do", up: "3d ago" },
                { title: "Fix API Rate Limit Issue", rep: "Acme Corp", ass: "Dev Team", prio: "Critical", status: "Resolved", up: "4d ago" },
              ].map((task, i) => (
                <tr key={i} className="hover:bg-muted transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{task.rep}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-bold">
                        {task.ass.charAt(0)}
                      </div>
                      {task.ass}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-xs font-medium ${
                      task.prio === 'Critical' ? 'text-red-500' : 
                      task.prio === 'High' ? 'text-orange-400' : 
                      task.prio === 'Medium' ? 'text-yellow-400' : 'text-blue-400'
                    }`}>
                      <AlertCircle className="h-3 w-3" /> {task.prio}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-sm ${
                      task.status === 'Resolved' ? 'text-green-400' : 
                      task.status === 'Overdue' ? 'text-red-400' : 
                      task.status === 'In Progress' ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {task.status === 'Resolved' ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs">{task.up}</td>
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
