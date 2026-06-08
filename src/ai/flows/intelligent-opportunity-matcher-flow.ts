'use server';
/**
 * @fileOverview An AI agent that analyzes a candidate's resume against multiple job descriptions
 * and provides a ranked list of job opportunities with match scores and reasoning.
 *
 * - intelligentOpportunityMatcher - A function that handles the job matching process.
 * - IntelligentOpportunityMatcherInput - The input type for the intelligentOpportunityMatcher function.
 * - IntelligentOpportunityMatcherOutput - The return type for the intelligentOpportunityMatcher function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const IntelligentOpportunityMatcherInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The candidate's resume, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobDescriptions: z
    .array(z.string())
    .describe('A list of job descriptions to be matched against the resume.'),
});
export type IntelligentOpportunityMatcherInput = z.infer<
  typeof IntelligentOpportunityMatcherInputSchema
>;

const IntelligentOpportunityMatcherOutputSchema = z.object({
  rankedJobs: z
    .array(
      z.object({
        jobDescription: z.string().describe('The original job description.'),
        matchScore: z
          .number()
          .min(0)
          .max(100)
          .describe('A match score out of 100 for the job description.'),
        reasoning: z
          .string()
          .describe(
            'A brief explanation of why this job description is a good or poor match.'
          ),
      })
    )
    .describe(
      'A list of job opportunities ranked by match score, along with reasoning.'
    ),
});
export type IntelligentOpportunityMatcherOutput = z.infer<
  typeof IntelligentOpportunityMatcherOutputSchema
>;

export async function intelligentOpportunityMatcher(
  input: IntelligentOpportunityMatcherInput
): Promise<IntelligentOpportunityMatcherOutput> {
  return intelligentOpportunityMatcherFlow(input);
}

const intelligentOpportunityMatcherPrompt = ai.definePrompt({
  name: 'intelligentOpportunityMatcherPrompt',
  input: { schema: IntelligentOpportunityMatcherInputSchema },
  output: { schema: IntelligentOpportunityMatcherOutputSchema },
  prompt: `You are an expert career advisor specializing in matching job seekers to suitable roles.
Your task is to analyze the provided resume and a list of job descriptions.
For each job description, you will evaluate how well the candidate's skills and experience, as detailed in the resume, align with the requirements and responsibilities of the job.

Based on your analysis, provide a match score (out of 100) and a brief reasoning for each job description.
Your output MUST be a JSON array of objects, as specified by the output schema.

Candidate Resume: {{media url=resumeDataUri}}

Job Descriptions to evaluate:
{{#each jobDescriptions}}
---JOB_DESCRIPTION_START---
Job Index: {{@index}}
{{this}}
---JOB_DESCRIPTION_END---
{{/each}}`,
});

const intelligentOpportunityMatcherFlow = ai.defineFlow(
  {
    name: 'intelligentOpportunityMatcherFlow',
    inputSchema: IntelligentOpportunityMatcherInputSchema,
    outputSchema: IntelligentOpportunityMatcherOutputSchema,
  },
  async (input) => {
    const { output } = await intelligentOpportunityMatcherPrompt(input);
    return output!;
  }
);
