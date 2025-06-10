import type { LucideIcon } from 'lucide-react';

export interface BankAccount {
  id: string;
  name: string;
  last4: string;
  balance: number;
  currency: string;
  bankName: string;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon | string; // LucideIcon for selection, string for storage/retrieval
  limit: number;
  limitType: 'monthly' | 'yearly';
  spent: number;
  color?: string; // Optional color for charts
}

export interface Transaction {
  id:string;
  date: string; // ISO string
  description: string;
  amount: number; // negative for expenses, positive for income
  category: string; // Category ID
  accountId: string;
}

export interface AISuggestion {
  category: string;
  suggestedLimit: number;
  justification: string;
}

export interface AIOverspendingArea {
  category: string;
  explanation: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
}
