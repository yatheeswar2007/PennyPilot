"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Landmark, Trash2, Edit3 } from 'lucide-react';
import type { BankAccount } from '@/types';
import LinkAccountDialog from '@/components/accounts/link-account-dialog';

const initialMockAccounts: BankAccount[] = [
  { id: '1', name: 'Chase Checking', last4: '1234', balance: 2500.75, currency: 'USD', bankName: 'Chase Bank' },
  { id: '2', name: 'BoA Savings', last4: '5678', balance: 10500.50, currency: 'USD', bankName: 'Bank of America' },
  { id: '3', name: 'Amex Credit Card', last4: '9012', balance: -350.20, currency: 'USD', bankName: 'American Express' },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>(initialMockAccounts);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const handleAddAccount = (newAccount: Omit<BankAccount, 'id'>) => {
    setAccounts(prev => [...prev, { ...newAccount, id: String(Date.now()) }]);
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(prev => prev.filter(acc => acc.id !== accountId));
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Bank Accounts</h1>
        <Button onClick={() => setIsLinkDialogOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" /> Link New Account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <Landmark className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle>No Accounts Linked</CardTitle>
            <CardDescription>Link your bank accounts to start tracking your finances automatically.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsLinkDialogOpen(true)}>Link First Account</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card key={account.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Landmark className="mr-2 h-6 w-6 text-primary" />
                      {account.name}
                    </CardTitle>
                    <CardDescription>{account.bankName} - Ending in {account.last4}</CardDescription>
                  </div>
                  {/* Placeholder for account actions dropdown */}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-semibold">
                  {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  <span className="text-sm text-muted-foreground ml-1">{account.currency}</span>
                </p>
                {/* Add more account details if needed, like last sync time */}
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t pt-4">
                 <Button variant="ghost" size="sm" onClick={() => alert('Edit account ' + account.name)}>
                  <Edit3 className="mr-1 h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteAccount(account.id)}>
                  <Trash2 className="mr-1 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <LinkAccountDialog
        isOpen={isLinkDialogOpen}
        onClose={() => setIsLinkDialogOpen(false)}
        onAccountLinked={handleAddAccount}
      />
    </div>
  );
}
