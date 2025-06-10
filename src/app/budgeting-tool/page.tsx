"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AIBudgetForm from '@/components/budgeting-tool/ai-budget-form';
import BudgetSuggestionDisplay from '@/components/budgeting-tool/budget-suggestion-display';
import type { SuggestBudgetOutput } from '@/ai/flows/suggest-budget';
import { Lightbulb } from 'lucide-react';

export default function AIBudgetingToolPage() {
  const [suggestions, setSuggestions] = React.useState<SuggestBudgetOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSuggestions = (output: SuggestBudgetOutput | null, loading: boolean, errorMsg: string | null) => {
    setSuggestions(output);
    setIsLoading(loading);
    setError(errorMsg);
  };
  
  // Example JSON data
  const exampleSpendingHistory = JSON.stringify([
    { "category": "Food", "amount": 450.75, "period": "Last Month" },
    { "category": "Transportation", "amount": 120.00, "period": "Last Month" },
    { "category": "Entertainment", "amount": 200.50, "period": "Last Month" },
    { "category": "Utilities", "amount": 150.00, "period": "Last Month" }
  ], null, 2);

  const exampleCategories = JSON.stringify([
    "Food", "Transportation", "Entertainment", "Utilities", "Shopping", "Healthcare"
  ], null, 2);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Lightbulb className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-3xl font-bold font-headline">AI Budgeting Tool</h1>
      </div>
      <CardDescription className="mb-6 max-w-2xl">
        Let our AI analyze your spending habits and financial goals to provide personalized budget recommendations. 
        Enter your data below (or use the pre-filled examples) to get started.
      </CardDescription>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Input Your Financial Data</CardTitle>
            <CardDescription>Provide your spending history, goals, and categories for analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <AIBudgetForm 
              onSuggestionsReceived={handleSuggestions} 
              exampleSpendingHistory={exampleSpendingHistory}
              exampleCategories={exampleCategories}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>AI Budget Suggestions</CardTitle>
            <CardDescription>Optimal allocations and insights based on your input.</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetSuggestionDisplay suggestions={suggestions} isLoading={isLoading} error={error} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
