"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { intelligentOpportunityMatcher, type IntelligentOpportunityMatcherOutput } from "@/ai/flows/intelligent-opportunity-matcher-flow"
import { Loader2, Sparkles, Target, ClipboardList } from "lucide-react"

export default function JobMatcherPage() {
  const [jobDescription, setJobDescription] = useState("")
  const [isMatching, setIsMatching] = useState(false)
  const [results, setResults] = useState<IntelligentOpportunityMatcherOutput | null>(null)

  // In a real app, we'd fetch the user's stored resume or allow upload
  // For this demo, we use a placeholder or previous analysis result
  const mockResumeUri = "data:text/plain;base64,U29mdHdhcmUgRW5naW5lZXIgd2l0aCA1IHllYXJzIGV4cGVyaWVuY2UgaW4gUmVhY3QgYW5kIE5leHRqcy4="

  const handleMatch = async () => {
    if (!jobDescription.trim()) return
    setIsMatching(true)
    try {
      const output = await intelligentOpportunityMatcher({
        resumeDataUri: mockResumeUri,
        jobDescriptions: [jobDescription]
      })
      setResults(output)
    } catch (error) {
      console.error(error)
    } finally {
      setIsMatching(false)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold font-headline gradient-text">Intelligent Matcher</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get high-fidelity match scores and AI reasoning for how well you fit a specific role.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="size-5 text-accent" />
                    Job Description
                  </CardTitle>
                  <CardDescription>Paste the full job post details to analyze alignment.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    placeholder="Paste the job description here..." 
                    className="min-h-[350px] bg-white/5 border-white/10 focus-visible:ring-accent rounded-xl resize-none"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <Button 
                    className="w-full h-12 rounded-xl bg-accent hover:bg-accent/80 text-white font-semibold shadow-lg shadow-accent/20" 
                    disabled={isMatching || !jobDescription}
                    onClick={handleMatch}
                  >
                    {isMatching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Calculating AI Match...
                      </>
                    ) : (
                      <>
                        <Target className="mr-2 h-4 w-4" />
                        Analyze Match Score
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {results ? (
                  results.rankedJobs.map((job, idx) => (
                    <Card key={idx} className="glass-card ai-glow border-accent/20">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl font-headline">AI Match Rating</CardTitle>
                          <CardDescription>Precision match based on your profile</CardDescription>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-4xl font-bold text-accent">{job.matchScore}%</span>
                          <span className="text-xs uppercase text-muted-foreground font-bold">Accuracy</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <Progress value={job.matchScore} className="h-3 bg-white/10" />
                        <div className="space-y-4">
                          <h4 className="font-bold text-lg flex items-center gap-2">
                            <Sparkles className="size-5 text-primary" />
                            AI Reasoning
                          </h4>
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 leading-relaxed text-muted-foreground italic">
                            "{job.reasoning}"
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button className="flex-1 rounded-xl h-12 bg-white/10 hover:bg-white/20 border border-white/10">Save Job</Button>
                          <Button className="flex-1 rounded-xl h-12 bg-primary ai-glow">Apply with AI Cover Letter</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="h-[500px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-3xl bg-white/5">
                    <div className="size-20 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                      <Target className="size-10 text-accent/30" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Performance Prediction</h3>
                    <p className="text-muted-foreground max-w-xs">Our AI will evaluate your skills against the job requirements to predict your success rate.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}