
'use client';

import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChatOutput } from '@/ai/flows/chat-flow';

interface ChatMessageProps {
  message: {
    role: 'user' | 'bot';
    text: string;
    data?: ChatOutput['transactions'];
  };
}

const chartConfig = {
  amount: {
    label: 'Amount (₹)',
    color: 'hsl(var(--primary))',
  },
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'bot';

  return (
    <div
      className={cn(
        'flex items-start gap-3 my-4',
        isBot ? 'justify-start' : 'justify-end'
      )}
    >
      {isBot && (
        <Avatar className="w-8 h-8 border-2 border-primary">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          'max-w-sm md:max-w-md lg:max-w-lg rounded-xl px-4 py-3 shadow',
          isBot
            ? 'bg-card text-card-foreground rounded-tl-none'
            : 'bg-primary text-primary-foreground rounded-br-none'
        )}
      >
        <p className="text-sm">{message.text}</p>
        {isBot && message.data && message.data.length > 0 && (
          <div className="mt-4 p-2 bg-background rounded-lg">
            <h4 className="text-sm font-semibold mb-2 text-foreground">Transaction Summary</h4>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <BarChart data={message.data} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="category"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                  width={80}
                />
                <XAxis dataKey="amount" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </div>

      {!isBot && (
        <Avatar className="w-8 h-8 border-2 border-muted">
          <AvatarFallback className="bg-muted text-muted-foreground">
            <User className="w-5 h-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
