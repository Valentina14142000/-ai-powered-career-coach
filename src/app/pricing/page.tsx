"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for casual job seekers",
    features: ["5 AI Matches per month", "1 Resume Analysis", "Community Support", "Basic Tracker"],
    cta: "Start for Free",
    popular: false
  },
  {
    name: "Pro",
    price: "$29",
    description: "Best for active career transitioners",
    features: ["Unlimited AI Matches", "10 Resume Analyses", "Priority AI Support", "Advanced Analytics", "Custom Pipeline Stages"],
    cta: "Upgrade to Pro",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For professional agencies & experts",
    features: ["Everything in Pro", "Team Collaboration", "API Access", "Dedicated Success Manager", "Custom White-labeling"],
    cta: "Contact Sales",
    popular: false
  }
]

export default function PricingPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-5xl font-bold font-headline gradient-text">Simple, Powerful Pricing</h1>
              <p className="text-muted-foreground text-xl">Accelerate your career with AI-powered tools designed to help you land your dream job faster.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tiers.map((tier) => (
                <Card key={tier.name} className={cn(
                  "glass-card relative flex flex-col h-full",
                  tier.popular ? "border-primary/50 shadow-primary/10 ai-glow scale-105" : "border-white/10"
                )}>
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-headline mb-2">{tier.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold font-headline">{tier.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground mt-4 leading-relaxed">{tier.description}</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 flex-1">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="size-3 text-primary" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="p-8 pt-0">
                    <Button 
                      className={cn(
                        "w-full h-12 rounded-xl text-lg font-bold",
                        tier.popular ? "bg-primary ai-glow" : "bg-white/5 hover:bg-white/10"
                      )}
                    >
                      {tier.name === 'Pro' && <Zap className="size-4 mr-2" />}
                      {tier.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-transparent p-12 rounded-[3rem] border border-white/5 mt-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold font-headline">Need a custom plan?</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We offer tailored solutions for universities, bootcamp providers, and recruitment agencies looking to provide AI-powered career support to their members.
                  </p>
                  <Button variant="outline" className="h-12 px-8 rounded-xl border-white/10 bg-white/5">Talk to our Sales Team</Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-20 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                      <div className="font-headline font-bold text-xl">LOGO {i}</div>
                    </div>
                  ))}
                </div>
              </div>
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