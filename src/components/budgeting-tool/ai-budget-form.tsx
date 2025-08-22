
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
  exampleTransactionHistory: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Analyze & Get Suggestions
    </Button>
  );
}

export default function AIBudgetForm({ onSuggestionsReceived, exampleTransactionHistory }: AIBudgetFormProps) {
  const initialState: FormState = { message: '', data: undefined };
  
  // Create a form action that also calls onSuggestionsReceived with loading state
  const formActionWithLoading: (payload: FormData) => void = (payload) => {
    onSuggestionsReceived(null, true, null); // Set loading state
    (formAction as any)(payload); // Call the original formAction
  };
  
  const [state, formAction] = useFormState(getAISuggestions, initialState);

  React.useEffect(() => {
    if(state.message) { // This runs when the server action completes
        onSuggestionsReceived(state.data || null, false, state.message === 'Success' ? null : state.message);
    }
  }, [state, onSuggestionsReceived]);

  return (
    <form action={formActionWithLoading} className="space-y-6">
      <div>
        <Label htmlFor="transactionHistory" className="font-semibold">Transaction History (JSON format)</Label>
        <Textarea
          id="transactionHistory"
          name="transactionHistory"
          rows={8}
          placeholder='e.g., [{"description": "Starbucks Coffee", "amount": 5.75}]'
          defaultValue={exampleTransactionHistory}
          className="mt-1"
        />
        {state?.fields?.transactionHistory && state.message && !state.message.startsWith("Success") && <p className="text-sm text-destructive mt-1">{state.message}</p>}
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
