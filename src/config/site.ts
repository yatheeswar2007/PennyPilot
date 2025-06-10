
import type { NavItem } from '@/types';
import { Home as HomeIcon, Landmark, ListChecks, Lightbulb, SettingsIcon as Settings, Info, Users, MessageSquare, ShieldCheck, TrendingUp, BellDot, Goal, Sparkles, Zap, CheckCircle } from 'lucide-react'; // Added more icons

export const navItems: NavItem[] = [
  {
    title: 'Home', // Changed from 'Dashboard'
    href: '/',
    icon: HomeIcon,
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
