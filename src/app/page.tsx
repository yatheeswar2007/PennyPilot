"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { DollarSign, TrendingUp, AlertCircle, Activity, Users, CreditCard } from 'lucide-react';
import type { Transaction, Category } from '@/types';
import Link from 'next/link';

const mockTransactions: Transaction[] = [
  { id: '1', date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), description: 'Groceries', amount: -75.50, category: 'Food', accountId: 'acc1' },
  { id: '2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), description: 'Gasoline', amount: -40.00, category: 'Transportation', accountId: 'acc1' },
  { id: '3', date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), description: 'Movie Tickets', amount: -30.00, category: 'Entertainment', accountId: 'acc2' },
  { id: '4', date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), description: 'Salary Deposit', amount: 2500.00, category: 'Income', accountId: 'acc1' },
  { id: '5', date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), description: 'Restaurant', amount: -55.20, category: 'Food', accountId: 'acc2' },
];

const mockCategories: Category[] = [
  { id: '1', name: 'Food', icon: 'Utensils', limit: 500, limitType: 'monthly', spent: 250, color: 'hsl(var(--chart-1))' },
  { id: '2', name: 'Transportation', icon: 'Car', limit: 200, limitType: 'monthly', spent: 150, color: 'hsl(var(--chart-2))' },
  { id: '3', name: 'Entertainment', icon: 'Ticket', limit: 150, limitType: 'monthly', spent: 100, color: 'hsl(var(--chart-3))' },
  { id: '4', name: 'Utilities', icon: 'Home', limit: 300, limitType: 'monthly', spent: 280, color: 'hsl(var(--chart-4))' },
  { id: '5', name: 'Shopping', icon: 'ShoppingBag', limit: 400, limitType: 'monthly', spent: 100, color: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  spent: { label: "Spent", color: "hsl(var(--chart-1))" },
  food: { label: "Food", color: "hsl(var(--chart-1))" },
  transportation: { label: "Transportation", color: "hsl(var(--chart-2))" },
  entertainment: { label: "Entertainment", color: "hsl(var(--chart-3))" },
  utilities: { label: "Utilities", color: "hsl(var(--chart-4))" },
  shopping: { label: "Shopping", color: "hsl(var(--chart-5))" },
};


export default function DashboardPage() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [monthlySpending, setMonthlySpending] = useState(0);

  useEffect(() => {
    // Simulate fetching data
    setTotalBalance(5830.25); // Mocked
    const spending = mockTransactions
      .filter(t => t.amount < 0 && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    setMonthlySpending(spending);
  }, []);

  const spendingData = mockCategories.map(cat => ({
    name: cat.name,
    value: cat.spent,
    fill: cat.color,
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 font-headline">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlySpending.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground">Compared to $1,200 budget</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75% Utilized</div>
            <p className="text-xs text-muted-foreground">3 of 5 categories near limit</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Spending by Category</CardTitle>
            <CardDescription>Your spending distribution for this month.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ChartContainer config={chartConfig} className="aspect-square h-full w-full">
              <PieChart>
                <RechartsTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />} />
                <Pie data={spendingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Budget Progress</CardTitle>
            <CardDescription>Your progress towards monthly category limits.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCategories.slice(0,4).map(category => (
              <div key={category.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">${category.spent} / ${category.limit}</span>
                </div>
                <Progress value={(category.spent / category.limit) * 100} className="h-3" />
              </div>
            ))}
            <div className="pt-2">
              <Link href="/budget">
                <Button variant="outline" className="w-full">View All Budgets</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className={`text-right ${transaction.amount < 0 ? 'text-destructive' : 'text-green-600'}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </TableCell>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <div className="pt-4 text-center">
              <Link href="/accounts">
                <Button variant="outline">View All Transactions</Button>
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
