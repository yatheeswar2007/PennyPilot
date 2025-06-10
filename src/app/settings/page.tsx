
"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Removed AvatarImage
import { User, Bell, Palette, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">Settings</h1>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><User className="mr-2 h-5 w-5" /> Profile</CardTitle>
              <CardDescription>Manage your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Avatar className="h-24 w-24 mx-auto mb-4">
                {/* Removed AvatarImage as no logo is available. Using fallback. */}
                <AvatarFallback className="text-3xl">PP</AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Penny Pilot" />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="user@pennypilot.com" />
              </div>
              <Button className="w-full">Update Profile</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5" /> Notifications</CardTitle>
              <CardDescription>Configure your notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="budgetAlerts">Budget Alerts</Label>
                <Button variant="outline" size="sm">Toggle</Button>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="transactionAlerts">Transaction Notifications</Label>
                <Button variant="outline" size="sm">Toggle</Button>
              </div>
              <Separator />
               <p className="text-sm text-muted-foreground">More notification settings coming soon.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5" /> Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the app.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="theme">Theme</Label>
                <Button variant="outline">Toggle Dark Mode</Button>
              </div>
               <p className="text-sm text-muted-foreground mt-4">Theme customization options will be available here.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5" /> Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent>
               <Button variant="outline">Change Password</Button>
               <p className="text-sm text-muted-foreground mt-4">Two-factor authentication and other security features will be managed here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

    