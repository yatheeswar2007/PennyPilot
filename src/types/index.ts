
import type { LucideIcon } from 'lucide-react';

export interface BankAccount {
  id: string;
  name: string; // Changed from "Account Nickname" concept
  accountNumber: string; // Changed from last4
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

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  label?: string;
  disabled?: boolean;
}
