"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MoreHorizontal, Calendar, MapPin, Building2 } from "lucide-react"

const columns = [
  { id: "applied", title: "Applied", count: 4 },
  { id: "interviewing", title: "Interviewing", count: 2 },
  { id: "offer", title: "Offer", count: 1 },
  { id: "rejected", title: "Rejected", count: 3 },
]

const applications = [
  { 
    id: 1, 
    role: "Senior UX Designer", 
    company: "Linear", 
    location: "Remote", 
    status: "applied",
    date: "Oct 12",
    logo: "L"
  },
  { 
    id: 2, 
    role: "Staff Engineer", 
    company: "Vercel", 
    location: "SF / Hybrid", 
    status: "interviewing",
    date: "Oct 15",
    logo: "V"
  },
  { 
    id: 3, 
    role: "Product Lead", 
    company: "OpenAI", 
    location: "London", 
    status: "offer",
    date: "Oct 20",
    logo: "O"
  },
  { 
    id: 4, 
    role: "Frontend Dev", 
    company: "Raycast", 
    location: "Remote", 
    status: "applied",
    date: "Oct 22",
    logo: "R"
  },
]

export default function KanbanPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <header className="h-20 border-b border-border/50 flex items-center justify-between px-8 sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <h1 className="text-2xl font-bold font-headline">Pipeline <span className="text-primary">Tracker</span></h1>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="bg-white/5 border-white/10 rounded-xl">View Analytics</Button>
              <Button className="rounded-xl bg-primary ai-glow gap-2">
                <Plus className="size-4" />
                Add Application
              </Button>
            </div>
          </header>

          <main className="flex-1 p-8 w-full overflow-x-auto">
            <div className="flex gap-6 min-w-[1000px] h-full pb-8">
              {columns.map((col) => (
                <div key={col.id} className="flex-1 flex flex-col gap-4 min-w-[280px]">
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg font-headline">{col.title}</h3>
                      <Badge variant="secondary" className="bg-white/5 text-muted-foreground border-none px-2 rounded-md">
                        {col.count}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5">
                      <MoreHorizontal className="size-4 opacity-50" />
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    {applications.filter(app => app.status === col.id).map(app => (
                      <Card key={app.id} className="glass-card hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing group">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-primary group-hover:bg-primary/10 transition-colors">
                                {app.logo}
                              </div>
                              <div>
                                <h4 className="font-bold text-sm leading-tight">{app.role}</h4>
                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                  <Building2 className="size-3" />
                                  {app.company}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 space-y-3">
                          <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                            <div className="flex items-center gap-1">
                              <MapPin className="size-3" />
                              {app.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="size-3" />
                              {app.date}
                            </div>
                          </div>
                          {col.id === 'interviewing' && (
                            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                              <p className="text-[10px] text-primary font-bold uppercase">Next: Tech Interview</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5 italic">"Focus on System Design"</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="ghost" className="w-full border border-dashed border-white/5 hover:bg-white/5 h-12 text-muted-foreground rounded-2xl">
                      <Plus className="size-4 mr-2" />
                      Add to {col.title}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}