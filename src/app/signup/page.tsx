"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Signup Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Signup Submitted (Demo)",
      description: "Account creation is for demo purposes. Please log in with the allowed email.",
    });
    
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="container mx-auto py-12 flex flex-col justify-center items-center min-h-screen bg-background">
       <Link href="/" className="mb-8">
         <Image src="/logo.svg" alt="PennyPilot Logo" width={200} height={50} />
      </Link>
      <Card className="w-full max-w-md shadow-xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Create Your Account</CardTitle>
          <CardDescription>Join PennyPilot and take control of your finances.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                type="text" 
                placeholder="Enter your full name" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a strong password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Re-enter your password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Sign Up
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
