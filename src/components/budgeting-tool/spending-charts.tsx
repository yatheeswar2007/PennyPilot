
"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell, Legend, Tooltip as RechartsTooltip } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PieChart as PieChartIcon, BarChart3, Info } from 'lucide-react';
import type { CategorizedSpending } from "@/types";

interface SpendingChartsProps {
  data: CategorizedSpending[];
  isLoading: boolean;
}

const chartConfig = {
  amount: {
    label: "Amount (₹)",
  },
} satisfies React.ComponentProps<typeof BarChart>["margin"];

const PIE_COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--primary))",
    "hsl(var(--accent))",
];

export default function SpendingCharts({ data, isLoading }: SpendingChartsProps) {
  const chartData = data.map(item => ({ ...item, fill: 'var(--color-amount)' }));

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        <Skeleton className="h-[350px] w-full" />
        <Skeleton className="h-[350px] w-full" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
       <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Awaiting Analysis</AlertTitle>
        <AlertDescription>Your spending charts will appear here after the AI analyzes your transaction history.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><PieChartIcon className="mr-2 h-5 w-5" /> Spending Distribution</CardTitle>
          <CardDescription>A look at where your money goes.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <RechartsTooltip content={<ChartTooltipContent nameKey="category" hideLabel />} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5" />Category Totals</CardTitle>
          <CardDescription>Total spending per category.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={100}
                tick={{ fontSize: 12 }}
              />
              <XAxis dataKey="amount" type="number" hide />
              <RechartsTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
              <Bar dataKey="amount" radius={5}>
                 {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

