
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, ListChecks as ListChecksIcon, BellDot, BarChart3, Users, MapPin, Mail, Edit2, Search, Percent, Zap, CircleDollarSign, Eye, TrendingUp, Goal as GoalIcon, AlertTriangle, Settings2 } from 'lucide-react';

const teamMembers = [
  { name: "Nimmagadda Yatheeswar", dataAiHint: "person portrait" },
  { name: "Nishanam Pranuthi Raj", dataAiHint: "person portrait" },
  { name: "Hrudhay", dataAiHint: "person portrait" },
  { name: "Devyansh", dataAiHint: "person portrait" },
  { name: "Havisha", dataAiHint: "person portrait" },
  { name: "Fragnya", dataAiHint: "person portrait" },
];

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const featureList = [
    {
      title: "Secure Bank Account Linking",
      description: "We partner with trusted banking APIs to import transaction data automatically. All data is encrypted end-to-end. Your privacy and security are our top priorities.",
      icon: ShieldCheck
    },
    {
      title: "Custom Categories & Subcategories",
      description: "Create, rename, or rearrange categories (e.g., “Food,” “Shopping,” “Subscriptions,” “Transport”). Add subcategories (for example, under “Food” you could have “Dining Out” vs. “Groceries”). Tag each transaction with a category and see at a glance how much you’ve spent.",
      icon: ListChecksIcon
    },
    {
      title: "Flexible Budget Limits",
      description: "Assign a monthly or yearly limit to each category—then watch your progress in real time. Change a limit any time, whether you need to tighten up mid-month or loosen it for a special occasion. Multiple budgets at once: keep one limit for “Essentials” and a separate one for “Leisure.”",
      icon: TrendingUp
    },
    {
      title: "Instant Notifications & Alerts",
      description: "Get a notification when you’ve used, say, 75% of your “Entertainment” budget. Receive an alert the second you exceed a category limit so you can adjust right away. Notifications come via in-app push, email, or SMS—your choice.",
      icon: BellDot
    },
    {
      title: "Monthly & Yearly Overview Dashboards",
      description: "Visual breakdowns (pie charts, bar graphs) show which categories consumed the largest share of your money. Historical comparisons let you see whether you’re spending more or less versus the previous month or last year. Quickly identify trends.",
      icon: BarChart3
    },
    {
      title: "Automated Expense Tagging",
      description: "Rules-based categorization: if you pay at “ABC Restaurant,” PennyPilot can auto-tag that as “Dining Out.” Over time, the app learns your preferences and becomes even more accurate.",
      icon: Edit2 // Using Edit2 as a proxy for tagging/rules
    },
    {
      title: "Goals & Reminders",
      description: "Optionally set saving goals (for example, “Save ₹20,000 by December for a vacation”). Receive gentle reminders if your spending habits threaten to derail a goal. Visual progress bar shows how close you are to hitting each goal.",
      icon: GoalIcon
    }
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Sign Up & Securely Link",
      description: "Create an account with your email or mobile number. Authorize PennyPilot to import transactions from your bank. No passwords are ever stored on our servers."
    },
    {
      step: 2,
      title: "Create Your Budget Categories",
      description: "Think of spending “buckets”: Food, Utilities, Entertainment, Transportation, and so on. For each bucket, decide on a monthly or yearly limit."
    },
    {
      step: 3,
      title: "Track & Adjust",
      description: "Every transaction automatically appears under its category. PennyPilot sends you an alert once you hit 80% of any category so you can pause or reassign funds. If needed, tweak your category limits mid-cycle."
    },
    {
      step: 4,
      title: "Review & Reflect",
      description: "At the end of each month, glance at the dashboard to see where you overspent (if anywhere) and where you underspent. Adjust your next month’s limits based on actual data. Build stronger saving habits over time."
    }
  ];

  const whyChooseReasons = [
    { title: "Simplicity Meets Power", description: "You don’t need to be a finance expert—our step-by-step setup walks you through everything.", icon: Zap },
    { title: "Real-Time Control", description: "No more waiting until month-end to realize you blew your budget. PennyPilot’s notifications keep you informed every day.", icon: Eye },
    { title: "Fully Customizable", description: "Whether you run your own small business or live on a student stipend, PennyPilot adapts to your unique financial reality.", icon: Settings2 },
    { title: "Data-Driven Decisions", description: "Smart charts and spending insights show you exactly where you can cut back and where you have wiggle room.", icon: Search }, // Using Search for insights
    { title: "Absolute Security", description: "Bank-grade encryption, two-factor authentication, and zero-knowledge policies mean your data stays yours.", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 inline-block">
            <Image
              src="/images/penny-pilot-logo.png"
              alt="PennyPilot Logo"
              width={280}
              height={70}
              data-ai-hint="compass finance"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary mb-6">
            Navigate Your Wallet. Master Your Budget.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
            Welcome to PennyPilot, the app that keeps you in control of every rupee you spend. By securely linking your bank account, PennyPilot becomes your financial co-pilot—guiding you toward better decisions, smarter spending, and real-time peace of mind. Whether you’re a student juggling monthly expenses or building long­term savings goals, PennyPilot helps you track, categorize, and stay on top of your money 24/7.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12 text-left">
            {[
              { title: "Secure Bank Connection", icon: ShieldCheck, text: "All your transactions are imported via bank-level encryption." },
              { title: "Customizable Categories", icon: ListChecksIcon, text: "Create categories like “Groceries,” “Entertainment,” or “Travel”—whatever fits your lifestyle." },
              { title: "Flexible Limits", icon: TrendingUp, text: "Set spending limits on a monthly or yearly basis, tailored to each category." },
              { title: "Instant Alerts", icon: BellDot, text: "Receive notifications the moment you approach or exceed a limit—no more surprises." }
            ].map(highlight => {
              const Icon = highlight.icon;
              return (
                <div key={highlight.title} className="p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <Icon className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-semibold text-primary mb-1">{highlight.title}</h3>
                  <p className="text-sm text-card-foreground/70">{highlight.text}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" passHref>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Sign up free in under a minute
              </Button>
            </Link>
            <Link href="#features" passHref>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-4 text-primary">About Us</h2>
          <p className="text-center text-lg text-foreground/80 max-w-3xl mx-auto mb-12">
            At PennyPilot, we understand that managing money can feel overwhelming. We’re a team of finance enthusiasts, university toppers, and software developers who experienced firsthand how easy it is to lose track of spending—especially when life is busy with classes, projects, and everyday expenses.
            Our mission is simple: make budgeting effortless. By combining intuitive design with robust security, we give you a clear, real-time picture of where your money goes. No confusing spreadsheets, no hours spent reconciling bank statements—just actionable insights that empower you to make smarter financial choices. Whether you’re saving for a dream trip, covering tuition costs, or simply trying to curb impulsive shopping, PennyPilot is here to guide you.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Key Aspects We Focus On:</h3>
              <ul className="space-y-3">
                {["Securely linking bank accounts", "Creating custom spending categories", "Setting flexible budget limits", "Receiving instant notifications for spending"].map(item => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/signup" passHref>
                   <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started with PennyPilot</Button>
                </Link>
              </div>
            </div>
            <div>
              <Image src="https://placehold.co/600x400.png" alt="Team working on PennyPilot" width={600} height={400} className="rounded-lg shadow-xl" data-ai-hint="team collaboration finance app" />
            </div>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-bold font-headline text-center my-12 text-primary">Meet the Team</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-2 border-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <Image src={`https://placehold.co/150x150.png`} alt={member.name} layout="fill" objectFit="cover" data-ai-hint={member.dataAiHint} />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs sm:text-sm p-1 text-center">Class 12 Student</p>
                  </div>
                </div>
                <h4 className="font-semibold text-sm sm:text-base text-foreground">{member.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12 text-primary">Powerful Features, Simple Control</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature) => {
              const Icon = feature.icon;
              return (
              <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <Icon className="h-8 w-8 text-accent mr-3" />
                    <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-card-foreground/80">{feature.description}</p>
                </CardContent>
              </Card>
            );
           })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12 text-primary">Get Started in Minutes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step) => (
              <Card key={step.step} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                    <span className="text-xl font-bold">{step.step}</span>
                  </div>
                  <CardTitle className="text-lg text-primary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-card-foreground/80">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose PennyPilot Section */}
       <section id="why-choose" className="py-16 sm:py-20 bg-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12 text-primary">Why Choose PennyPilot?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseReasons.map((reason) => {
              const Icon = reason.icon;
              return (
              <div key={reason.title} className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow">
                 <Icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">{reason.title}</h3>
                <p className="text-sm text-card-foreground/80">{reason.description}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Get Started Today Section */}
      <section className="py-16 sm:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-6">Ready to transform how you handle money?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            It takes less than a minute. No credit card required.
            All major Indian banks are supported.
            Customize categories and limits to match your personal goals.
          </p>
          <Link href="/signup" passHref>
            <Button size="lg" variant="outline" className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 border-accent-foreground">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12 text-primary">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-primary mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Location:</h4>
                    <p className="text-foreground/80">Bharatiya Vidya Bhavan's Atmakuri Rama Rao School,</p>
                    <p className="text-foreground/80">Survey No.62, Cable Bridge Rd,</p>
                    <p className="text-foreground/80">Guttala Begumpet, CBI Colony, Jubilee Hills,</p>
                    <p className="text-foreground/80">Hyderabad, Telangana 500033</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Support Email:</h4>
                    <a href="mailto:support@pennypilot.com" className="text-primary hover:underline">support@pennypilot.com</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-8 rounded-lg shadow-lg h-full flex flex-col items-center justify-center">
                <h3 className="text-2xl font-semibold text-primary mb-4">Our Location</h3>
                 {/* Placeholder for a map */}
                <div className="w-full h-64 bg-slate-200 rounded-md flex items-center justify-center text-muted-foreground">
                    <MapPin className="h-16 w-16" />
                    <p className="ml-2">Map Placeholder</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Interactive map coming soon!</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-8 flex justify-center items-center border-t bg-slate-50">
        <p className="text-muted-foreground">
          {currentYear !== null ? `© ${currentYear} PennyPilot Tracker. All rights reserved.` : 'Loading year...'}
        </p>
      </footer>
    </div>
  );
}
