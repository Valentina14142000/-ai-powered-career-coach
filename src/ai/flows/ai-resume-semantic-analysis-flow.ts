'use server';
/**
 * @fileOverview This file defines a Genkit flow for semantically analyzing a resume.
 *
 * - analyzeResume - A function that analyzes a resume and extracts key skills and experiences.
 * - ResumeAnalysisInput - The input type for the analyzeResume function.
 * - ResumeAnalysisOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeAnalysisInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the resume.'),
});
export type ResumeAnalysisInput = z.infer<typeof ResumeAnalysisInputSchema>;

const ResumeAnalysisOutputSchema = z.object({
  extractedSkills: z
    .array(z.string())
    .describe('A list of key technical and soft skills extracted from the resume.'),
  extractedExperiences: z
    .array(
      z.object({
        title: z.string().describe('The job title or role.'),
        company: z.string().describe('The company where the experience took place.'),
        dates: z.string().describe('The start and end dates of the experience (e.g., "Jan 2020 - Dec 2022").'),
        description: z.string().describe('A summary of responsibilities and achievements in this role.'),
      })
    )
    .describe('A list of professional experiences extracted from the resume, including title, company, dates, and description.'),
});
export type ResumeAnalysisOutput = z.infer<typeof ResumeAnalysisOutputSchema>;

export async function analyzeResume(
  input: ResumeAnalysisInput
): Promise<ResumeAnalysisOutput> {
  return resumeAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeAnalysisPrompt',
  input: {schema: ResumeAnalysisInputSchema},
  output: {schema: ResumeAnalysisOutputSchema},
  prompt: `You are an expert career analyst. Your task is to semantically analyze the provided resume text and extract the most relevant skills and professional experiences.

For skills, identify both technical and soft skills that are prominently mentioned or implied.

For experiences, identify each distinct professional role, its title, the company, the duration, and a concise summary of the responsibilities and key achievements.

Resume Text:
{{resumeText}}`,
});

const resumeAnalysisFlow = ai.defineFlow(
  {
    name: 'resumeAnalysisFlow',
    inputSchema: ResumeAnalysisInputSchema,
    outputSchema: ResumeAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to extract resume analysis output.');
    }
    return output;
  }
);
