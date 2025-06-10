"use client";

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAISuggestions, type FormState } from '@/lib/actions';
import type { SuggestBudgetOutput } from '@/ai/flows/suggest-budget';
import { Loader2, AlertCircle } from 'lucide-react';

interface AIBudgetFormProps {
  onSuggestionsReceived: (suggestions: SuggestBudgetOutput | null, isLoading: boolean, error: string | null) => void;
  exampleSpendingHistory: string;
  exampleCategories: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Get AI Suggestions
    </Button>
  );
}

export default function AIBudgetForm({ onSuggestionsReceived, exampleSpendingHistory, exampleCategories }: AIBudgetFormProps) {
  const initialState: FormState = { message: '', data: undefined };
  const [state, formAction] = useFormState(getAISuggestions, initialState);

  React.useEffect(() => {
    const { pending } = (formAction as any)?._formState || {}; // Workaround to check pending status if not using useFormStatus in parent
    if (state.message) {
      onSuggestionsReceived(state.data || null, pending || false, state.message.startsWith('Success') ? null : state.message);
    }
  }, [state, onSuggestionsReceived, formAction]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="spendingHistory" className="font-semibold">Spending History (JSON format)</Label>
        <Textarea
          id="spendingHistory"
          name="spendingHistory"
          rows={6}
          placeholder='e.g., [{"category": "Food", "amount": 300}, {"category": "Rent", "amount": 1200}]'
          defaultValue={exampleSpendingHistory}
          className="mt-1"
        />
        {state?.fields?.spendingHistory && state.message && !state.message.startsWith("Success") && <p className="text-sm text-destructive mt-1">{state.message}</p>}
      </div>

      <div>
        <Label htmlFor="financialGoals" className="font-semibold">Financial Goals</Label>
        <Textarea
          id="financialGoals"
          name="financialGoals"
          rows={3}
          placeholder="e.g., Save for a down payment on a house, pay off credit card debt, build an emergency fund."
          defaultValue={"Save 15% of income, reduce dining out expenses, invest in stocks."}
          className="mt-1"
        />
        {state?.fields?.financialGoals && state.message && !state.message.startsWith("Success") && <p className="text-sm text-destructive mt-1">{state.message}</p>}

      </div>

      <div>
        <Label htmlFor="categories" className="font-semibold">Spending Categories (JSON Array)</Label>
        <Textarea
          id="categories"
          name="categories"
          rows={4}
          placeholder='e.g., ["Groceries", "Utilities", "Entertainment", "Travel"]'
          defaultValue={exampleCategories}
          className="mt-1"
        />
        {state?.fields?.categories && state.message && !state.message.startsWith("Success") && <p className="text-sm text-destructive mt-1">{state.message}</p>}
      </div>
      
      {state.message && !state.message.startsWith("Success") && state.issues && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {state.message}
            <ul className="list-disc list-inside">
              {state.issues.map((issue, index) => <li key={index}>{issue}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <SubmitButton />
    </form>
  );
}
