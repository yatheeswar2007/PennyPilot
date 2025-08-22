
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
import {z} from 'zod';

const SuggestBudgetInputSchema = z.object({
  transactionHistory: z
    .string()
    .describe(
      'A JSON string representing a list of user transactions, each with a description and amount.'
    ),
  financialGoals: z
    .string()
    .describe(
      'A string describing the user’s financial goals (e.g., save for a down payment, reduce debt).'
    ),
});
export type SuggestBudgetInput = z.infer<typeof SuggestBudgetInputSchema>;

const SuggestBudgetOutputSchema = z.object({
  categorizedSpending: z
    .string()
    .describe(
      'A JSON array of objects, where each object represents a spending category and its total amount. e.g., [{"category": "Food", "amount": 550.75}]'
    ),
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
  prompt: `You are an expert financial analyst. Your task is to analyze a user's raw transaction history, categorize their spending, and then provide actionable budget advice.

Follow these steps:
1.  **Categorize Transactions**: Analyze the list of transactions and group them into meaningful spending categories (e.g., Food & Dining, Transportation, Shopping, Utilities, Entertainment, Health & Wellness, Other).
2.  **Calculate Category Totals**: Sum the amounts for each category to get a total spending amount per category.
3.  **Analyze Goals and Spending**: Based on the categorized spending and the user's stated financial goals, formulate budget recommendations.
4.  **Identify Overspending**: Highlight categories where spending seems excessive relative to typical budgets or the user's goals.

User's Transaction History:
{{{transactionHistory}}}

User's Financial Goals:
{{{financialGoals}}}

**Output format:**
You must provide a response in a valid JSON format that adheres to the output schema.

-   **categorizedSpending**: A JSON array of objects, where each object has a "category" (string) and "amount" (number) key.
-   **categorySuggestions**: A JSON array of objects, each with "category", "suggestedLimit", and "justification".
-   **overspendingAreas**: A JSON array of objects, each with "category" and "explanation".

Ensure all numbers are valid JSON numbers (no currency symbols).`,
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
