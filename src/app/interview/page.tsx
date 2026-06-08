"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { interactiveMockInterviewCoach, type InteractiveMockInterviewCoachOutput } from "@/ai/flows/interactive-mock-interview-coach-flow"
import { Badge } from "@/components/ui/badge"
import { Loader2, Mic2, Send, BrainCircuit, Star, BarChart3, Quote } from "lucide-react"

export default function MockInterviewPage() {
  const [question] = useState("Tell me about a time you had to handle a difficult technical challenge. How did you resolve it?")
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [feedback, setFeedback] = useState<InteractiveMockInterviewCoachOutput | null>(null)

  const handleSubmit = async () => {
    if (!response.trim()) return
    setIsProcessing(true)
    try {
      const output = await interactiveMockInterviewCoach({
        interviewQuestion: question,
        candidateResponse: response
      })
      setFeedback(output)
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <main className="flex-1 p-8 max-w-5xl mx-auto w-full space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold font-headline gradient-text">AI Interview Coach</h1>
              <p className="text-muted-foreground text-lg">Simulate real-world interviews and get constructive feedback on your delivery and sentiment.</p>
            </div>

            <Card className="glass-card overflow-hidden border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
              <CardHeader className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary/20 text-primary border-none">Current Session</Badge>
                  <span className="text-sm text-muted-foreground">Behavioral Interview #4</span>
                </div>
                <CardTitle className="text-2xl font-headline flex items-center gap-3">
                  <Quote className="size-6 text-primary" />
                  {question}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8 space-y-6">
                <div className="relative">
                  <Textarea 
                    placeholder="Speak your response or type it here..." 
                    className="min-h-[200px] bg-background/50 border-white/10 focus-visible:ring-primary rounded-2xl p-6 text-lg resize-none"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-primary/10 text-primary">
                      <Mic2 className="size-6" />
                    </Button>
                    <Button 
                      className="rounded-xl h-12 px-6 bg-primary ai-glow font-bold"
                      disabled={isProcessing || !response}
                      onClick={handleSubmit}
                    >
                      {isProcessing ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
                      <span className="ml-2">Get Feedback</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {feedback && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Card className="glass-card ai-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-headline">Score</CardTitle>
                      <BarChart3 className="size-5 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pb-8">
                    <div className="text-6xl font-bold font-headline text-primary mb-2">{feedback.relevanceScore}/10</div>
                    <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Relevance Score</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-headline">Tone</CardTitle>
                      <BrainCircuit className="size-5 text-accent" />
                    </div>
                  </CardHeader>
                  <CardContent className="text-center pb-8">
                    <Badge variant="outline" className={cn(
                      "text-xl px-6 py-2 rounded-full border-2",
                      feedback.sentiment === 'positive' ? 'border-green-400 text-green-400' : 
                      feedback.sentiment === 'neutral' ? 'border-accent text-accent' : 'border-destructive text-destructive'
                    )}>
                      {feedback.sentiment.toUpperCase()}
                    </Badge>
                    <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest mt-4">Sentiment analysis</p>
                  </CardContent>
                </Card>

                <Card className="glass-card md:col-span-3 lg:col-span-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-headline">Suggestions</CardTitle>
                      <Star className="size-5 text-yellow-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feedback.suggestions.map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary font-bold">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card md:col-span-3 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-headline">Detailed AI Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="text-lg leading-relaxed text-muted-foreground">
                    {feedback.feedback}
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}