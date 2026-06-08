'use server';
/**
 * @fileOverview An AI-powered interactive mock interview coach that provides feedback on candidate responses.
 *
 * - interactiveMockInterviewCoach - A function that provides immediate, constructive feedback on a candidate's interview response.
 * - InteractiveMockInterviewCoachInput - The input type for the interactiveMockInterviewCoach function.
 * - InteractiveMockInterviewCoachOutput - The return type for the interactiveMockInterviewCoach function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InteractiveMockInterviewCoachInputSchema = z.object({
  interviewQuestion: z.string().describe('The interview question the candidate was asked.'),
  candidateResponse: z.string().describe('The candidate\u0027s spoken or written response to the interview question.'),
});
export type InteractiveMockInterviewCoachInput = z.infer<typeof InteractiveMockInterviewCoachInputSchema>;

const InteractiveMockInterviewCoachOutputSchema = z.object({
  feedback: z.string().describe('Constructive, detailed feedback on the candidate\u0027s response, highlighting strengths and weaknesses.'),
  sentiment: z.enum(['positive', 'neutral', 'negative']).describe('The overall sentiment conveyed by the candidate\u0027s response.'),
  relevanceScore: z.number().int().min(0).max(10).describe('A score from 0 (not relevant) to 10 (perfectly relevant) indicating how well the response addressed the question.'),
  suggestions: z.array(z.string()).describe('A list of actionable suggestions for how the candidate could improve their response for future interviews.'),
});
export type InteractiveMockInterviewCoachOutput = z.infer<typeof InteractiveMockInterviewCoachOutputSchema>;

export async function interactiveMockInterviewCoach(input: InteractiveMockInterviewCoachInput): Promise<InteractiveMockInterviewCoachOutput> {
  return interactiveMockInterviewCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interactiveMockInterviewCoachPrompt',
  input: {schema: InteractiveMockInterviewCoachInputSchema},
  output: {schema: InteractiveMockInterviewCoachOutputSchema},
  prompt: `You are an expert AI interview coach. Your task is to provide objective, constructive, and actionable feedback on a candidate's response to an interview question.\n\nAnalyze the provided 'candidateResponse' in the context of the 'interviewQuestion'.\n\nYour feedback should include:\n1.  **Detailed feedback**: Highlight strengths and weaknesses of the response.\n2.  **Sentiment**: Determine the overall sentiment of the response (e.g., confident, hesitant, positive, negative).\n3.  **Relevance Score**: Assign a relevance score between 0 and 10, where 0 means completely irrelevant and 10 means perfectly on-topic and comprehensive.\n4.  **Actionable Suggestions**: Provide specific advice on how the candidate can improve their answer, including areas like structure, clarity, content, and confidence.\n\nInterview Question: "{{{interviewQuestion}}}"\nCandidate Response: "{{{candidateResponse}}}"`,
});

const interactiveMockInterviewCoachFlow = ai.defineFlow(
  {
    name: 'interactiveMockInterviewCoachFlow',
    inputSchema: InteractiveMockInterviewCoachInputSchema,
    outputSchema: InteractiveMockInterviewCoachOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to get feedback from the AI coach.');
    }
    return output;
  }
);
