import type { NavItem } from '@/types';
import { Home, Landmark, ListChecks, Lightbulb, SettingsIcon as Settings } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Accounts',
    href: '/accounts',
    icon: Landmark,
  },
  {
    title: 'Budget',
    href: '/budget',
    icon: ListChecks,
  },
  {
    title: 'AI Budgeting',
    href: '/budgeting-tool',
    icon: Lightbulb,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];
