
import type { NavItem } from '@/types';
import { Landmark, ListChecks, Lightbulb, SettingsIcon as Settings, Info, Users, MessageSquare, ShieldCheck, TrendingUp, BellDot, Goal, Sparkles, Zap, CheckCircle, LayoutDashboard, Bot } from 'lucide-react'; // Added LayoutDashboard, removed HomeIcon

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/accounts', 
    icon: LayoutDashboard, 
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
    href: '/ai-budgeting',
    icon: Bot,
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
