'use server';
/**
 * @fileOverview An AI agent that generates personalized cover letters.
 *
 * - tailoredCoverLetterArchitect - A function that handles the personalized cover letter generation process.
 * - TailoredCoverLetterArchitectInput - The input type for the tailoredCoverLetterArchitect function.
 * - TailoredCoverLetterArchitectOutput - The return type for the tailoredCoverLetterArchitect function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailoredCoverLetterArchitectInputSchema = z.object({
  resumeContent: z
    .string()
    .describe("The full text content of the candidate's resume."),
  jobDescription: z
    .string()
    .describe("The full text content of the job description."),
});
export type TailoredCoverLetterArchitectInput = z.infer<
  typeof TailoredCoverLetterArchitectInputSchema
>;

const TailoredCoverLetterArchitectOutputSchema = z.object({
  coverLetter: z.string().describe('The generated personalized cover letter.'),
});
export type TailoredCoverLetterArchitectOutput = z.infer<
  typeof TailoredCoverLetterArchitectOutputSchema
>;

export async function tailoredCoverLetterArchitect(
  input: TailoredCoverLetterArchitectInput
): Promise<TailoredCoverLetterArchitectOutput> {
  return tailoredCoverLetterArchitectFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailoredCoverLetterPrompt',
  input: {schema: TailoredCoverLetterArchitectInputSchema},
  output: {schema: TailoredCoverLetterArchitectOutputSchema},
  prompt: `You are an expert career coach AI.
Your task is to generate a highly personalized and persuasive cover letter for a job application.

Synthesize specific bullet points and relevant experiences from the provided resume with the requirements and responsibilities outlined in the job description.
Highlight how the candidate's skills and experience directly align with the job's needs.
Ensure the tone is professional, enthusiastic, and tailored to the target company.

Resume Content:
---
{{{resumeContent}}}
---

Job Description:
---
{{{jobDescription}}}
---

Generate the cover letter in a clear, concise, and professional manner, focusing on maximizing the candidate's chances of getting an interview.`,
});

const tailoredCoverLetterArchitectFlow = ai.defineFlow(
  {
    name: 'tailoredCoverLetterArchitectFlow',
    inputSchema: TailoredCoverLetterArchitectInputSchema,
    outputSchema: TailoredCoverLetterArchitectOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
