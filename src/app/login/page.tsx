"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); 

    if (email === 'nytr2007@gmail.com') {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push('/accounts'); 
    } else {
      setError('Invalid email address. Please use nytr2007@gmail.com to log in.');
    }
  };

  return (
    <div className="container mx-auto py-12 flex flex-col justify-center items-center min-h-screen bg-background">
       <Link href="/" className="mb-8">
          <Image src="/logo.svg" alt="PennyPilot Logo" width={200} height={50} />
      </Link>
      <Card className="w-full max-w-md shadow-xl bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold font-headline">Welcome Back!</CardTitle>
          <CardDescription>Log in to access your PennyPilot dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            {error && (
              <div className="flex items-center p-3 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-md">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              Log In
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-accent hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
