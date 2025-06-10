
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import type { SuggestBudgetOutput } from '@/ai/flows/suggest-budget'; // Use specific type from flow
import type { AISuggestion, AIOverspendingArea } from '@/types'; // Using general types for parsed data
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react'; // Removed DollarSign as it's not directly used now

interface BudgetSuggestionDisplayProps {
  suggestions: SuggestBudgetOutput | null;
  isLoading: boolean;
  error: string | null;
}

export default function BudgetSuggestionDisplay({ suggestions, isLoading, error }: BudgetSuggestionDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error && !suggestions) { // Show error only if there are no suggestions to display along with it
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error Generating Suggestions</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (!suggestions && !error) {
     return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>No Suggestions Yet</AlertTitle>
        <AlertDescription>Enter your financial data in the form and click "Get AI Suggestions" to see your personalized budget plan.</AlertDescription>
      </Alert>
    );
  }


  let categorySuggestions: AISuggestion[] = [];
  let overspendingAreas: AIOverspendingArea[] = [];

  if (suggestions) {
    try {
      categorySuggestions = suggestions.categorySuggestions ? JSON.parse(suggestions.categorySuggestions) : [];
    } catch (e) {
      console.error("Failed to parse categorySuggestions:", e);
      // categorySuggestions remains empty or could show an error message specific to this part
    }

    try {
      overspendingAreas = suggestions.overspendingAreas ? JSON.parse(suggestions.overspendingAreas) : [];
    } catch (e) {
      console.error("Failed to parse overspendingAreas:", e);
      // overspendingAreas remains empty
    }
  }
  
  const hasContent = categorySuggestions.length > 0 || overspendingAreas.length > 0;

  return (
    <div className="space-y-6">
      {error && suggestions && ( // Show error alongside suggestions if suggestions are also present
         <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Notice</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!hasContent && !error && (
         <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No specific recommendations found.</AlertTitle>
            <AlertDescription>The AI couldn't generate specific recommendations based on the input. Please try adjusting your input data.</AlertDescription>
        </Alert>
      )}

      {categorySuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><CheckCircle2 className="mr-2 h-6 w-6 text-green-500" /> Suggested Budget Limits</CardTitle>
            <CardDescription>AI-powered recommendations for your spending categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {categorySuggestions.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-base hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-2">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-primary font-semibold">
                            ₹{item.suggestedLimit.toLocaleString('en-IN')}
                        </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.justification}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}

      {overspendingAreas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><AlertTriangle className="mr-2 h-6 w-6 text-destructive" /> Potential Overspending Areas</CardTitle>
            <CardDescription>Categories where you might be spending more than optimal.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {overspendingAreas.map((item, index) => (
                <li key={index} className="p-3 border rounded-md bg-muted/50">
                  <p className="font-semibold text-destructive">{item.category}</p>
                  <p className="text-sm text-muted-foreground">{item.explanation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
