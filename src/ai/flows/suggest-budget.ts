// src/ai/flows/suggest-budget.ts
'use server';
/**
 * @fileOverview AI-powered budget suggestion flow.
 *
 * - suggestBudget - A function that suggests optimal budget allocations based on past spending and goals.
 * - SuggestBudgetInput - The input type for the suggestBudget function.
 * - SuggestBudgetOutput - The return type for the suggestBudget function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBudgetInputSchema = z.object({
  spendingHistory: z
    .string()
    .describe(
      'A JSON string representing the user spending history, including category and amount spent.'
    ),
  financialGoals: z
    .string()
    .describe(
      'A string describing the user’s financial goals (e.g., save for a down payment, reduce debt).'
    ),
  categories: z
    .string()
    .describe(
      'A JSON string array of spending categories (e.g., food, transportation, entertainment).'
    ),
});
export type SuggestBudgetInput = z.infer<typeof SuggestBudgetInputSchema>;

const SuggestBudgetOutputSchema = z.object({
  categorySuggestions: z
    .string()
    .describe(
      'A JSON array of budget suggestions for each category, including suggested limit and justification.'
    ),
  overspendingAreas: z
    .string()
    .describe(
      'A JSON array of categories where the user is likely overspending, with explanations.'
    ),
});
export type SuggestBudgetOutput = z.infer<typeof SuggestBudgetOutputSchema>;

export async function suggestBudget(input: SuggestBudgetInput): Promise<SuggestBudgetOutput> {
  return suggestBudgetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBudgetPrompt',
  input: {schema: SuggestBudgetInputSchema},
  output: {schema: SuggestBudgetOutputSchema},
  prompt: `You are a personal finance advisor. Analyze the user's spending history and financial goals to suggest optimal budget allocations for each category.

Spending History: {{{spendingHistory}}}
Financial Goals: {{{financialGoals}}}
Categories: {{{categories}}}

Provide budget suggestions for each category, including a suggested limit and a brief justification.
Identify any areas where the user is likely overspending, and explain why.

Format your response as a JSON object with "categorySuggestions" and "overspendingAreas" fields. Each field should contain a JSON array.`,
});

const suggestBudgetFlow = ai.defineFlow(
  {
    name: 'suggestBudgetFlow',
    inputSchema: SuggestBudgetInputSchema,
    outputSchema: SuggestBudgetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
