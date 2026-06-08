"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { analyzeResume, type ResumeAnalysisOutput } from "@/ai/flows/ai-resume-semantic-analysis-flow"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, Upload, FileText } from "lucide-react"

export default function ResumeAnalysisPage() {
  const [resumeText, setResumeText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<ResumeAnalysisOutput | null>(null)

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return
    setIsAnalyzing(true)
    try {
      const output = await analyzeResume({ resumeText })
      setResult(output)
    } catch (error) {
      console.error(error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold font-headline gradient-text">Resume Semantic Analysis</h1>
              <p className="text-muted-foreground text-lg">Upload or paste your resume to let our AI extract your complex technical skills and professional history.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="size-5 text-primary" />
                      Paste Resume Content
                    </CardTitle>
                    <CardDescription>Our AI will process the text to find hidden opportunities.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      placeholder="Paste your resume text here..." 
                      className="min-h-[400px] bg-white/5 border-white/10 focus-visible:ring-primary rounded-xl resize-none"
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                    />
                    <div className="flex gap-4">
                      <Button 
                        className="flex-1 h-12 rounded-xl ai-glow" 
                        disabled={isAnalyzing || !resumeText}
                        onClick={handleAnalyze}
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing with AI...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Extract Skills & Experience
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="h-12 w-12 rounded-xl bg-white/5 border-white/10">
                        <Upload className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {result ? (
                  <>
                    <Card className="glass-card ai-glow border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-xl font-headline">Extracted Skills</CardTitle>
                        <CardDescription>Technical and soft skills identified by AI.</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-2">
                        {result.extractedSkills.map((skill, idx) => (
                          <Badge key={idx} className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle className="text-xl font-headline">Professional Timeline</CardTitle>
                        <CardDescription>Your career path structured by our algorithm.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {result.extractedExperiences.map((exp, idx) => (
                          <div key={idx} className="relative pl-6 border-l-2 border-primary/30 space-y-1">
                            <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-primary ai-glow" />
                            <h4 className="font-bold text-lg">{exp.title}</h4>
                            <p className="text-primary font-medium">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.dates}</p>
                            <p className="text-sm mt-2 leading-relaxed text-muted-foreground">{exp.description}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-3xl bg-white/5">
                    <div className="size-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                      <Sparkles className="size-8 text-primary/30" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Ready to Analyze</h3>
                    <p className="text-muted-foreground max-w-xs">Analysis results will appear here once you submit your resume content.</p>
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