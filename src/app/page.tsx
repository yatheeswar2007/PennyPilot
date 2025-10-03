
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, ShieldCheck, ListChecks as ListChecksIcon, BellDot, BarChart3, Users, MapPin, Mail, Edit2, Search, Zap, Eye, Settings2, TrendingUp, Goal as GoalIcon, Briefcase, Building, MessageSquareQuote, Lightbulb, Sparkles, Rocket, Handshake, PackageCheck } from 'lucide-react';
import Image from "next/image";

type TeamMember = {
  name: string;
  dataAiHint: string;
  imageUrl?: string;
};

const teamMembers: TeamMember[] = [
  { name: "Nimmagadda Yatheeswar", dataAiHint: "person portrait" },
  { name: "Nishanam Pranuthi Raj", dataAiHint: "person portrait" },
  { name: "Hrudhay", dataAiHint: "person portrait" },
  { name: "Devyansh", dataAiHint: "person portrait" },
  { name: "Havisha", dataAiHint: "person portrait" },
  { name: "Pragnya", dataAiHint: "person portrait" },
];

const navLinks = [
  { title: "Features", href: "#features" },
  { title: "About Us", href: "#about-us" },
  { title: "Get Started", href: "#how-it-works" },
  { title: "Contact", href: "#contact" },
];

export default function HomePage() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featureList = [
    { title: "Secure Bank Account Linking", description: "We partner with trusted banking APIs to import transaction data automatically. All data is encrypted end-to-end. Your privacy and security are our top priorities.", icon: ShieldCheck },
    { title: "Custom Categories & Subcategories", description: "Create, rename, or rearrange categories (e.g., “Food,” “Shopping,” “Subscriptions,” “Transport”). Add subcategories (for example, under “Food” you could have “Dining Out” vs. “Groceries”). Tag each transaction with a category and see at a glance how much you’ve spent.", icon: ListChecksIcon },
    { title: "Flexible Budget Limits", description: "Assign a monthly or yearly limit to each category—then watch your progress in real time. Change a limit any time, whether you need to tighten up mid-month or loosen it for a special occasion. Multiple budgets at once: keep one limit for “Essentials” and a separate one for “Leisure.”", icon: TrendingUp },
    { title: "Instant Notifications & Alerts", description: "Get a notification when you’ve used, say, 75% of your “Entertainment” budget. Receive an alert the second you exceed a category limit so you can adjust right away. Notifications come via in-app push, email, or SMS—your choice.", icon: BellDot },
    { title: "Monthly & Yearly Overview Dashboards", description: "Visual breakdowns (pie charts, bar graphs) show which categories consumed the largest share of your money. Historical comparisons let you see whether you’re spending more or less versus the previous month or last year. Quickly identify trends.", icon: BarChart3 },
    { title: "Automated Expense Tagging", description: "Rules-based categorization: if you pay at “ABC Restaurant,” PennyPilot can auto-tag that as “Dining Out.” Over time, the app learns your preferences and becomes even more accurate.", icon: Edit2 },
    { title: "Goals & Reminders", description: "Optionally set saving goals (for example, “Save ₹20,000 by December for a vacation”). Receive gentle reminders if your spending habits threaten to derail a goal. Visual progress bar shows how close you are to hitting each goal.", icon: GoalIcon }
  ];

  const howItWorksSteps = [
    { step: 1, title: "Sign Up & Securely Link", description: "Create an account with your email or mobile number. Authorize PennyPilot to import transactions from your bank. No passwords are ever stored on our servers.", icon: Rocket },
    { step: 2, title: "Create Your Budget Categories", description: "Think of spending “buckets”: Food, Utilities, Entertainment, Transportation, and so on. For each bucket, decide on a monthly or yearly limit.", icon: ListChecksIcon },
    { step: 3, title: "Track & Adjust", description: "Every transaction automatically appears under its category. PennyPilot sends you an alert once you hit 80% of any category so you can pause or reassign funds. If needed, tweak your category limits mid-cycle.", icon: Settings2 },
    { step: 4, title: "Review & Reflect", description: "At the end of each month, glance at the dashboard to see where you overspent (if anywhere) and where you underspent. Adjust your next month’s limits based on actual data. Build stronger saving habits over time.", icon: Search }
  ];

  const keyAspects = [
      { title: "Secure Bank Linking", description: "Effortlessly connect your bank accounts with top-tier security.", icon: ShieldCheck, color: "text-green-500" },
      { title: "Custom Categories", description: "Tailor spending categories to your unique lifestyle and track expenses precisely.", icon: ListChecksIcon, color: "text-blue-500" },
      { title: "Flexible Budget Limits", description: "Set and adjust monthly or yearly limits for each category with ease.", icon: TrendingUp, color: "text-purple-500" },
      { title: "Instant Notifications", description: "Stay informed with real-time alerts about your spending and budget status.", icon: BellDot, color: "text-yellow-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Sticky Navigation Bar */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/90 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-3">
          <Link href="/" className="flex items-center text-2xl font-bold text-primary">
             PennyPilot
          </Link>
          <div className="flex items-center">
            <div className="hidden md:flex space-x-4 mr-4">
              {navLinks.map(link => (
                <Link key={link.title} href={link.href} passHref>
                  <Button variant="ghost" className="text-foreground/80 hover:text-primary hover:bg-primary/10 px-3 py-2 text-sm">
                    {link.title}
                  </Button>
                </Link>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-3">
                <Link href="/login" passHref>
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 hover:text-primary">Log In</Button>
                </Link>
                <Link href="/signup" passHref>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">Sign Up</Button>
                </Link>
            </div>
            <div className="md:hidden"> {/* Basic mobile menu toggle - can be enhanced */}
              {/* You could add a Sheet or DropdownMenu here for mobile nav */}
              <Button variant="ghost" size="icon">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-16 sm:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-primary mb-6">
            PennyPilot
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-headline text-foreground/80 mb-6">
            Navigate Your Wallet. Master Your Budget.
          </h2>
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
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign up free in under a minute
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12 text-primary">Powerful Features, Simple Control</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature) => {
              const Icon = feature.icon;
              return (
              <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card">
                <CardHeader>
                  <div className="flex items-center mb-3">
                    <Icon className="h-10 w-10 text-primary mr-4" />
                    <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
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
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-16 text-primary">Get Started in Minutes</h2>
          <div className="relative">
             {/* Connecting line (decorative) */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-primary/30 transform -translate-y-1/2" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
              {howItWorksSteps.map((step) => (
                <Card key={step.step} className="text-center hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary bg-card z-10">
                  <CardHeader className="pb-3">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mb-4 shadow-lg ring-4 ring-primary/20">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg text-primary font-semibold">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-card-foreground/80">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - Moved after Why Choose */}
      <section id="about-us" className="py-16 sm:py-20 bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-4 text-primary">About Us</h2>
          <p className="text-center text-lg text-foreground/80 max-w-3xl mx-auto mb-12">
            At PennyPilot, we understand that managing money can feel overwhelming. We’re a team of finance enthusiasts, university toppers, and software developers who experienced firsthand how easy it is to lose track of spending—especially when life is busy with classes, projects, and everyday expenses.
            Our mission is simple: make budgeting effortless. By combining intuitive design with robust security, we give you a clear, real-time picture of where your money goes. No confusing spreadsheets, no hours spent reconciling bank statements—just actionable insights that empower you to make smarter financial choices. Whether you’re saving for a dream trip, covering tuition costs, or simply trying to curb impulsive shopping, PennyPilot is here to guide you.
          </p>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8 text-primary">Key Aspects We Focus On</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyAspects.map((aspect, index) => {
                const Icon = aspect.icon;
                return (
                  <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow bg-card border-t-4 border-primary/50">
                    <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4 ring-4 ring-primary/20">
                       <Icon className={`h-7 w-7 ${aspect.color || 'text-primary'}`} />
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2">{aspect.title}</h4>
                    <p className="text-sm text-card-foreground/80">{aspect.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-headline text-center my-12 text-primary">Meet the Team</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group text-center">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-3 rounded-full overflow-hidden shadow-lg border-2 border-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl cursor-pointer">
                  {member.imageUrl ? (
                    <Image src={member.imageUrl} alt={member.name} width={128} height={128} className="w-full h-full object-cover" data-ai-hint={member.dataAiHint} />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Photo</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-xs sm:text-sm p-1 text-center">Class 12 Student</p>
                  </div>
                </div>
                <h4 className="font-semibold text-sm sm:text-base text-foreground">{member.name}</h4>
              </div>
            ))}
          </div>
           <div className="mt-12 text-center">
                <Link href="/signup" passHref>
                   <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started with PennyPilot</Button>
                </Link>
              </div>
        </div>
      </section>

      {/* Get Started Today Section (CTA) */}
      <section id="get-started-cta" className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-6 text-secondary-foreground">Ready to transform how you handle money?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8 text-secondary-foreground/80">
            It takes less than a minute. No credit card required. All major Indian banks are supported. Customize categories and limits to match your personal goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup" passHref>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Create Your Free Account
                </Button>
            </Link>
            <Link href="/login" passHref>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Log In to Your Account
                </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline text-center mb-12 text-primary">Get In Touch</h2>
          <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-xl">
            <div className="grid md:grid-cols-2 gap-10 items-start">
                <div>
                    <h3 className="text-2xl font-semibold text-primary mb-6">Contact Information</h3>
                    <div className="space-y-6">
                        <div className="flex items-start">
                        <MapPin className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-foreground mb-1">Our Location:</h4>
                            <p className="text-foreground/80"></p>
                        </div>
                        </div>
                        <div className="flex items-start">
                        <Mail className="h-7 w-7 text-primary mr-4 mt-1 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-foreground mb-1">Support Email:</h4>
                            <a href="mailto:support@pennypilot.com" className="text-primary hover:underline hover:text-accent-foreground transition-colors">support@pennypilot.com</a>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="bg-muted p-6 rounded-lg h-full flex flex-col items-center justify-center text-center">
                    <MessageSquareQuote className="h-16 w-16 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-primary mb-2">Have Questions?</h3>
                    <p className="text-sm text-muted-foreground mb-4">We're here to help! Reach out via email or connect with us on social media (links coming soon).</p>
                    <div className="w-full h-40 bg-muted-foreground/20 rounded-md flex items-center justify-center text-muted-foreground">
                        <MapPin className="h-12 w-12" />
                        <p className="ml-2">Map Placeholder</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full py-8 flex justify-center items-center border-t bg-background/50">
        <p className="text-muted-foreground">
          {currentYear !== null ? `© ${currentYear} PennyPilot Tracker. All rights reserved.` : '...'}
        </p>
      </footer>
    </div>
  );
}
