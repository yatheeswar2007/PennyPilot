
"use client";

import React from 'react';
import { CardDescription } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';
import Chatbot from '@/components/chatbot/chatbot';

export default function AIBudgetingToolPage() {
  return (
    <div className="container mx-auto py-8 h-full flex flex-col">
      <div className="flex items-center mb-4">
        <Lightbulb className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Penny Assistant</h1>
      </div>
      <CardDescription className="mb-6 max-w-3xl text-lg">
        Your personal AI for financial analysis. Upload a screenshot of your transactions, and Penny will automatically categorize your spending and create a visual summary for you. You can also ask any finance-related questions.
      </CardDescription>
      
      {/* The chatbot is now the main feature of this page */}
      <div className="flex-grow flex items-center justify-center">
         <Chatbot />
      </div>

    </div>
  );
}
