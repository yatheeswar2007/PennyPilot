
import type { NavItem } from '@/types';
import { Landmark, ListChecks, Lightbulb, SettingsIcon as Settings, Info, Users, MessageSquare, ShieldCheck, TrendingUp, BellDot, Goal, Sparkles, Zap, CheckCircle, LayoutDashboard, Bot, HomeIcon } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/home', 
    icon: HomeIcon, 
  },
  {
    title: 'AI Budgeting',
    href: '/ai-budgeting',
    icon: Bot,
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
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

// Icons for homepage sections (can be moved to page.tsx if preferred)
export const sectionIcons = {
  AboutUs: Info,
  Features: Sparkles,
  HowItWorks: Zap,
  WhyChoose: CheckCircle,
  GetStarted: Goal,
  Contact: MessageSquare,
  Team: Users,
  SecureBank: ShieldCheck,
  CustomCategories: ListChecks,
  FlexibleLimits: TrendingUp,
  InstantAlerts: BellDot,
};
