"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  PenTool, 
  Mic2, 
  Kanban, 
  CreditCard, 
  Settings,
  Sparkles,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Resume Analysis",
    url: "/resume",
    icon: FileText,
  },
  {
    title: "Job Matcher",
    url: "/matches",
    icon: Target,
  },
  {
    title: "Cover Letters",
    url: "/cover-letter",
    icon: PenTool,
  },
  {
    title: "Mock Interviews",
    url: "/interview",
    icon: Mic2,
  },
  {
    title: "Application Tracker",
    url: "/tracker",
    icon: Kanban,
  },
]

const accountItems = [
  {
    title: "Subscription",
    url: "/pricing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="h-20 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center ai-glow group-hover:scale-105 transition-transform">
            <Sparkles className="text-primary-foreground size-6" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight">CareerPilot <span className="text-primary">AI</span></span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-semibold uppercase tracking-wider opacity-50">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-200 h-11 px-4",
                      pathname === item.url ? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-white/5"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5 mr-2" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator className="mx-6 my-2 bg-white/5" />
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-semibold uppercase tracking-wider opacity-50">Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-4">
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-200 h-11 px-4",
                      pathname === item.url ? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-white/5"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5 mr-2" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-3">
          <div className="size-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">Jane Doe</p>
            <p className="text-xs opacity-50 truncate">jane.doe@example.com</p>
          </div>
          <button className="text-white/50 hover:text-white transition-colors">
            <LogOut className="size-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}