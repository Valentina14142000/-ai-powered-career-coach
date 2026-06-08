import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  ArrowUpRight, 
  Users, 
  Briefcase, 
  BrainCircuit, 
  Search,
  Bell,
  Sparkles,
  FileText,
  PenTool,
  Mic2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const stats = [
  { label: "Matches Found", value: "124", icon: BrainCircuit, color: "text-primary" },
  { label: "Applications", value: "12", icon: Briefcase, color: "text-accent" },
  { label: "Interviews", value: "3", icon: Users, color: "text-green-400" },
  { label: "Success Rate", value: "85%", icon: ArrowUpRight, color: "text-purple-400" },
]

export default function Home() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <header className="h-20 border-b border-border/50 flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-4 max-w-md w-full">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search jobs, skills, or applications..." className="pl-10 bg-white/5 border-none h-11 focus-visible:ring-primary" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl hover:bg-white/5">
                <Bell className="size-5" />
                <span className="absolute top-2.5 right-2.5 size-2 bg-destructive rounded-full border-2 border-background" />
              </Button>
              <Button className="h-11 px-6 rounded-xl font-semibold gap-2 ai-glow">
                <Sparkles className="size-4" />
                AI Match Now
              </Button>
            </div>
          </header>

          <main className="flex-1 p-8 space-y-8 overflow-y-auto">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold font-headline">Welcome back, <span className="gradient-text">Jane</span></h1>
              <p className="text-muted-foreground text-lg">Your AI Career Copilot has 12 new job matches waiting for you today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.label} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={cn("p-2.5 rounded-xl bg-white/5", stat.color)}>
                        <stat.icon className="size-6" />
                      </div>
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                        +12% this week
                      </Badge>
                    </div>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                    <h3 className="text-3xl font-bold font-headline mt-1">{stat.value}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 glass-card">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Recommended Opportunities</CardTitle>
                  <CardDescription>Based on your AI-analyzed skill profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="group p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="size-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-lg">
                            {['G', 'A', 'M'][i-1]}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{['Senior Product Designer', 'Frontend Architect', 'AI Ethics Consultant'][i-1]}</h4>
                            <p className="text-muted-foreground text-sm">{['Google', 'Airbnb', 'Microsoft'][i-1]} • Remote • $140k - $180k</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-3 py-1">
                            {98 - i*3}% Match
                          </Badge>
                          <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tighter">Matched 2h ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="link" className="w-full text-primary hover:text-primary/80">View all matches</Button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-3">
                  <Button variant="outline" className="h-14 justify-start gap-4 px-4 bg-white/5 border-white/10 hover:bg-white/10 text-lg rounded-2xl">
                    <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <FileText className="size-4 text-primary" />
                    </div>
                    Refresh Resume Analysis
                  </Button>
                  <Button variant="outline" className="h-14 justify-start gap-4 px-4 bg-white/5 border-white/10 hover:bg-white/10 text-lg rounded-2xl">
                    <div className="size-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <PenTool className="size-4 text-accent" />
                    </div>
                    Generate New Cover Letter
                  </Button>
                  <Button variant="outline" className="h-14 justify-start gap-4 px-4 bg-white/5 border-white/10 hover:bg-white/10 text-lg rounded-2xl">
                    <div className="size-8 rounded-lg bg-green-400/20 flex items-center justify-center">
                      <Mic2 className="size-4 text-green-400" />
                    </div>
                    Start Mock Interview
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}