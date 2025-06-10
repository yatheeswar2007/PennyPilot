
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-background to-blue-50">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <div className="mb-8">
          <Image
            src="/images/penny-pilot-logo.png"
            alt="PennyPilot Logo"
            width={240}
            height={60}
            className="shadow-lg"
            data-ai-hint="compass finance"
            
          />
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold font-headline text-primary">
          Welcome to PennyPilot Tracker
        </h1>

        <p className="mt-6 text-xl sm:text-2xl text-foreground/80 max-w-2xl">
          Your smart companion for managing finances, tracking expenses, and achieving your budget goals with ease.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/accounts" passHref>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View Accounts
            </Button>
          </Link>
          <Link href="/budget" passHref>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Manage Budget
            </Button>
          </Link>
        </div>

        <section className="mt-16 w-full max-w-4xl">
          <h2 className="text-3xl font-semibold font-headline mb-6 text-foreground">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Bank Linking</h3>
              <p className="text-sm text-card-foreground/70">Securely connect your bank accounts to automatically track transactions.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Smart Budgeting</h3>
              <p className="text-sm text-card-foreground/70">Create custom categories, set limits, and get AI-powered suggestions.</p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-2">Visual Insights</h3>
              <p className="text-sm text-card-foreground/70">Visualize your spending patterns and budget status with clear charts.</p>
            </div>
          </div>
        </section>
        
        <div className="mt-12">
          <Button>New Button Text</Button>
        </div>

      </main>

      <footer className="w-full h-20 flex justify-center items-center border-t mt-12">
        <p className="text-muted-foreground">
          {currentYear !== null ? `© ${currentYear} PennyPilot Tracker. All rights reserved.` : 'Loading year...'}
        </p>
      </footer>
    </div>
  );
}
