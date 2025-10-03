
import type { NavItem } from '@/types';
import { Landmark, ListChecks, Lightbulb, SettingsIcon as Settings, Info, Users, MessageSquare, ShieldCheck, TrendingUp, BellDot, Goal, Sparkles, Zap, CheckCircle, LayoutDashboard } from 'lucide-react'; // Added LayoutDashboard, removed HomeIcon

export const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/accounts', // Changed from '/' to '/accounts'
    icon: LayoutDashboard, // Changed to LayoutDashboard for an "app home" feel
  },
  {
    title: 'AI Budgeting',
    href: '/budgeting-tool',
    icon: Lightbulb,
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
