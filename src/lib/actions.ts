
'use server';

import { suggestBudget, type SuggestBudgetInput, type SuggestBudgetOutput } from '@/ai/flows/suggest-budget';
import { z } from 'zod';

const SuggestBudgetFormSchema = z.object({
  transactionHistory: z.string().min(1, "Transaction history is required."),
  financialGoals: z.string().min(1, "Financial goals are required."),
});

export interface FormState {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  data?: SuggestBudgetOutput;
}

export async function getAISuggestions(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SuggestBudgetFormSchema.safeParse({
    transactionHistory: formData.get('transactionHistory'),
    financialGoals: formData.get('financialGoals'),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data.',
      issues,
      fields: {
        transactionHistory: formData.get('transactionHistory')?.toString() ?? '',
        financialGoals: formData.get('financialGoals')?.toString() ?? '',
      }
    };
  }

  const inputData: SuggestBudgetInput = validatedFields.data;

  try {
    // Validate JSON string before passing to AI
    try {
      JSON.parse(inputData.transactionHistory);
    } catch (e) {
      return { message: "Transaction history is not valid JSON.", fields: inputData };
    }

    const result = await suggestBudget(inputData);
    return { message: 'Success', data: result };
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { message: `Failed to get AI suggestions: ${errorMessage}`, fields: inputData };
  }
}
