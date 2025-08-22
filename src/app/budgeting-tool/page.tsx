
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AIBudgetForm from '@/components/budgeting-tool/ai-budget-form';
import BudgetSuggestionDisplay from '@/components/budgeting-tool/budget-suggestion-display';
import type { SuggestBudgetOutput } from '@/ai/flows/suggest-budget';
import { Lightbulb } from 'lucide-react';
import SpendingCharts from '@/components/budgeting-tool/spending-charts';
import type { CategorizedSpending } from '@/types';

export default function AIBudgetingToolPage() {
  const [suggestions, setSuggestions] = React.useState<SuggestBudgetOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [categorizedSpending, setCategorizedSpending] = React.useState<CategorizedSpending[]>([]);

  const handleSuggestions = (output: SuggestBudgetOutput | null, loading: boolean, errorMsg: string | null) => {
    setSuggestions(output);
    setIsLoading(loading);
    setError(errorMsg);
    if (output?.categorizedSpending) {
      try {
        const parsedSpending = JSON.parse(output.categorizedSpending);
        setCategorizedSpending(parsedSpending);
      } catch (e) {
        console.error("Failed to parse categorized spending:", e);
        setCategorizedSpending([]);
      }
    } else {
      setCategorizedSpending([]);
    }
  };
  
  // Example JSON data
  const exampleTransactionHistory = JSON.stringify([
      { "description": "Starbucks Coffee", "amount": 5.75 },
      { "description": "Monthly Metro Pass", "amount": 121.00 },
      { "description": "Netflix Subscription", "amount": 15.49 },
      { "description": "Grocery run at Whole Foods", "amount": 154.21 },
      { "description": "Dinner with friends at The Italian Place", "amount": 88.50 },
      { "description": "Uber ride home", "amount": 22.30 },
      { "description": "New sneakers from Nike", "amount": 120.00 },
      { "description": "Electricity Bill", "amount": 75.60 },
      { "description": "Lunch at Sweetgreen", "amount": 17.45 },
      { "description": "Movie tickets for Dune Part Two", "amount": 32.00 }
  ], null, 2);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Lightbulb className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-3xl font-bold font-headline">AI-Powered Financial Analyzer</h1>
      </div>
      <CardDescription className="mb-6 max-w-3xl text-lg">
        Get a complete financial picture. Our AI will automatically categorize your raw transactions, 
        visualize your spending habits with interactive charts, and provide personalized budget recommendations to help you reach your goals.
      </CardDescription>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-2 h-fit">
          <CardHeader>
            <CardTitle>1. Input Your Financial Data</CardTitle>
            <CardDescription>Provide your transaction history and goals for analysis.</CardDescription>
          </CardHeader>
          <CardContent>
            <AIBudgetForm 
              onSuggestionsReceived={handleSuggestions} 
              exampleTransactionHistory={exampleTransactionHistory}
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-8">
           <Card>
            <CardHeader>
                <CardTitle>2. Visualize Your Spending</CardTitle>
                <CardDescription>The AI has categorized your spending into the following buckets.</CardDescription>
            </CardHeader>
            <CardContent>
                <SpendingCharts data={categorizedSpending} isLoading={isLoading} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>3. Get AI Budget Recommendations</CardTitle>
              <CardDescription>Optimal allocations and insights based on your input.</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetSuggestionDisplay suggestions={suggestions} isLoading={isLoading} error={error} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
