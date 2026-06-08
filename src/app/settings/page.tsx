
"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Bell, Lock, User, Globe, Sparkles } from "lucide-react"

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <main className="flex-1 p-8 max-w-4xl mx-auto w-full space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold font-headline gradient-text">Settings</h1>
              <p className="text-muted-foreground text-lg">Manage your account preferences and AI configuration.</p>
            </div>

            <div className="grid gap-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="size-5 text-primary" />
                    Profile Information
                  </CardTitle>
                  <CardDescription>Update your personal details used for job matching.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="size-20 border-2 border-primary/20">
                      <AvatarImage src="https://picsum.photos/seed/jane/200/200" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="rounded-xl">Change Avatar</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input defaultValue="Jane Doe" className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input defaultValue="jane.doe@example.com" className="bg-white/5 border-white/10" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-white/5 px-6 py-4 border-t border-white/5">
                  <Button className="ml-auto rounded-xl bg-primary">Save Changes</Button>
                </CardFooter>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="size-5 text-accent" />
                    AI Preferences
                  </CardTitle>
                  <CardDescription>Customize how the AI Career Copilot interacts with you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Proactive Matching</Label>
                      <p className="text-sm text-muted-foreground">Automatically scan for new jobs while you're away.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Detailed Feedback</Label>
                      <p className="text-sm text-muted-foreground">Receive comprehensive reasoning for match scores.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="size-5 text-green-400" />
                    Notifications
                  </CardTitle>
                  <CardDescription>Choose what updates you want to receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Switch id="notify-matches" />
                    <Label htmlFor="notify-matches">New Job Matches</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch id="notify-interviews" defaultChecked />
                    <Label htmlFor="notify-interviews">Interview Reminders</Label>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between items-center p-6 border border-destructive/20 rounded-3xl bg-destructive/5">
                <div className="space-y-1">
                  <h3 className="font-bold text-destructive">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">Permanently delete your profile and application history.</p>
                </div>
                <Button variant="destructive" className="rounded-xl">Delete Account</Button>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
