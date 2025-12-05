import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  solution: string;
  result: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  client: string;
  content: string;
  role: string;
}

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  ceo: string;
}

export interface Inquiry {
  id: string;
  date: string;
  name: string;
  company: string;
  phone: string;
  category: string;
  message: string;
  status: 'new' | 'read' | 'contacted';
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  bgImage: string;
}

export interface WhyUsItem {
  iconName: string;
  title: string;
  description: string;
}

export interface WhyUsContent {
  title: string;
  subtitle: string;
  items: WhyUsItem[];
}

export interface AboutContent {
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  philosophyTitle: string;
  philosophyDesc1: string;
  philosophyDesc2: string;
  philosophyImage: string;
  statYears: string;
  statProjects: string;
  statSafeRate: string;
  expertiseText: string;
}