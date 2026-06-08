
"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { tailoredCoverLetterArchitect, type TailoredCoverLetterArchitectOutput } from "@/ai/flows/tailored-cover-letter-architect-flow"
import { Loader2, PenTool, Sparkles, FileText, ClipboardList, Copy, Check } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function CoverLetterPage() {
  const [resume, setResume] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<TailoredCoverLetterArchitectOutput | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = async () => {
    if (!resume.trim() || !jobDescription.trim()) return
    setIsGenerating(true)
    try {
      const output = await tailoredCoverLetterArchitect({
        resumeContent: resume,
        jobDescription: jobDescription
      })
      setResult(output)
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: "Could not architect your cover letter. Please try again."
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (!result) return
    navigator.clipboard.writeText(result.coverLetter)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: "Your tailored cover letter is ready to paste."
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background w-full">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col">
          <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold font-headline gradient-text">Tailored Cover Letter Architect</h1>
              <p className="text-muted-foreground text-lg">Generate high-conversion cover letters by aligning your experience with specific job requirements.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="size-5 text-primary" />
                      Your Resume
                    </CardTitle>
                    <CardDescription>Paste your full resume text here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea 
                      placeholder="Paste resume content..." 
                      className="min-h-[200px] bg-white/5 border-white/10 rounded-xl resize-none"
                      value={resume}
                      onChange={(e) => setResume(e.target.value)}
                    />
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="size-5 text-accent" />
                      Job Description
                    </CardTitle>
                    <CardDescription>Paste the job post you are applying for.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      placeholder="Paste job description..." 
                      className="min-h-[200px] bg-white/5 border-white/10 rounded-xl resize-none"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                    <Button 
                      className="w-full h-12 rounded-xl bg-primary ai-glow font-bold" 
                      disabled={isGenerating || !resume || !jobDescription}
                      onClick={handleGenerate}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Architecting Cover Letter...
                        </>
                      ) : (
                        <>
                          <PenTool className="mr-2 h-4 w-4" />
                          Generate Tailored Letter
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {result ? (
                  <Card className="glass-card ai-glow border-primary/20 h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-headline">Generated Cover Letter</CardTitle>
                        <CardDescription>AI-crafted for maximum impact</CardDescription>
                      </div>
                      <Button variant="outline" size="icon" onClick={copyToClipboard} className="rounded-xl">
                        {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
                      </Button>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-[600px] overflow-y-auto whitespace-pre-wrap leading-relaxed text-muted-foreground">
                        {result.coverLetter}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-white/5 rounded-3xl bg-white/5">
                    <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <PenTool className="size-10 text-primary/30" />
                    </div>
                    <h3 className="text-xl font-headline font-semibold mb-2">Ready to Architect</h3>
                    <p className="text-muted-foreground max-w-xs">Your personalized, persuasive cover letter will appear here once you provide your details.</p>
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
