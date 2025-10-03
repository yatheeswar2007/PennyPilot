
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';
import AIBudgetForm from '@/components/budgeting-tool/ai-budget-form';
import BudgetSuggestionDisplay from '@/components/budgeting-tool/budget-suggestion-display';
import SpendingCharts from '@/components/budgeting-tool/spending-charts';
import type { SuggestBudgetOutput } from '@/ai/flows/suggest-budget';
import type { CategorizedSpending } from '@/types';

// Mock data representing what might be on the budget page
const mockTransactionsForAI = [
  { "description": "Starbucks", "amount": 150.75 },
  { "description": "Uber Ride", "amount": 350.00 },
  { "description": "Netflix Subscription", "amount": 649.00 },
  { "description": "Grocery Shopping at Big Bazaar", "amount": 4500.50 },
  { "description": "H&M T-shirt", "amount": 1200.00 },
  { "description": "Electricity Bill", "amount": 2200.00 },
  { "description": "Dinner at Olive Bar", "amount": 3500.00 },
  { "description": "Movie tickets", "amount": 850.00 },
  { "description": "Monthly Metro Pass", "amount": 1000.00 }
];


export default function AIBudgetingToolPage() {
  const [aiSuggestions, setAiSuggestions] = useState<SuggestBudgetOutput | null>(null);
  const [categorizedSpending, setCategorizedSpending] = useState<CategorizedSpending[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggestionsReceived = (suggestions: SuggestBudgetOutput | null, loading: boolean, err: string | null) => {
    setIsLoading(loading);
    setError(err);
    setAiSuggestions(suggestions);

    if (suggestions && suggestions.categorizedSpending) {
      try {
        const parsedSpending = JSON.parse(suggestions.categorizedSpending);
        setCategorizedSpending(parsedSpending);
      } catch (e) {
        console.error("Failed to parse categorized spending:", e);
        setError("AI returned invalid chart data.");
        setCategorizedSpending([]);
      }
    } else if (!loading) {
       // Clear charts if there are no suggestions or on error
       setCategorizedSpending([]);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-2">
        <Lightbulb className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-3xl font-bold font-headline">AI Budgeting Tool</h1>
      </div>
      <CardDescription className="mb-8 max-w-3xl">
        Let our AI analyze your spending patterns and financial goals to provide personalized budget recommendations. Paste your transaction data below to get started.
      </CardDescription>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Get AI Suggestions</CardTitle>
              <CardDescription>
                Provide your transactions and goals.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AIBudgetForm 
                onSuggestionsReceived={handleSuggestionsReceived}
                exampleTransactionHistory={JSON.stringify(mockTransactionsForAI, null, 2)}
              />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <SpendingCharts data={categorizedSpending} isLoading={isLoading} />
           <BudgetSuggestionDisplay suggestions={aiSuggestions} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
}
