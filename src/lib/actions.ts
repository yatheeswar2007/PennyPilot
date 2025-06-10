'use server';

import { suggestBudget, type SuggestBudgetInput, type SuggestBudgetOutput } from '@/ai/flows/suggest-budget';
import { z } from 'zod';

const SuggestBudgetFormSchema = z.object({
  spendingHistory: z.string().min(1, "Spending history is required."),
  financialGoals: z.string().min(1, "Financial goals are required."),
  categories: z.string().min(1, "Categories are required."),
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
    spendingHistory: formData.get('spendingHistory'),
    financialGoals: formData.get('financialGoals'),
    categories: formData.get('categories'),
  });

  if (!validatedFields.success) {
    const issues = validatedFields.error.issues.map((issue) => issue.message);
    return {
      message: 'Invalid form data.',
      issues,
      fields: {
        spendingHistory: formData.get('spendingHistory')?.toString() ?? '',
        financialGoals: formData.get('financialGoals')?.toString() ?? '',
        categories: formData.get('categories')?.toString() ?? '',
      }
    };
  }

  const inputData: SuggestBudgetInput = validatedFields.data;

  try {
    // Validate JSON strings before passing to AI
    try {
      JSON.parse(inputData.spendingHistory);
    } catch (e) {
      return { message: "Spending history is not valid JSON.", fields: inputData };
    }
    try {
      JSON.parse(inputData.categories);
    } catch (e) {
      return { message: "Categories list is not valid JSON array.", fields: inputData };
    }


    const result = await suggestBudget(inputData);
    return { message: 'Successfully generated budget suggestions.', data: result };
  } catch (error) {
    console.error('Error getting AI suggestions:', error);
    return { message: 'Failed to get AI suggestions. Please try again.', fields: inputData };
  }
}
