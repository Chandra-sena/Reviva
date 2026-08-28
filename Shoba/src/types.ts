export type PropertyType = 'Apartment' | 'Villa' | 'Row House' | 'Plot' | 'Commercial';
export type ProjectStatus = 'Ready to Move' | 'Under Construction' | 'Upcoming' | 'Delivered' | 'New Launch' | 'Yet to be Launched' | 'Launched';

export interface Property {
  id: string;
  name: string;
  location: string;
  subLocation: string;
  type: PropertyType;
  status: ProjectStatus;
  price: number;
  priceDisplay: string;
  bhk: string[];
  areaSqFt: string;
  image: string;
  gallery: string[];
  amenities: string[];
  reraNumber: string;
  possessionDate: string;
  description: string;
  featured: boolean;
  highlightTag?: string;
  brochureUrl?: string;
  masterPlanUrl?: string;
  floorPlanUrl?: string;
}

export interface DeliveredProject {
  id: string;
  name: string;
  location: string;
  yearDelivered: string;
  totalUnits: string;
  type: 'Residential' | 'Commercial';
  image: string;
  tagline: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  snippet: string;
  content: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'RERA & Buying' | 'Pricing & Loans' | 'Reviva Way' | 'Location';
}

export interface ThemeConfig {
  id: string;
  name: string;
  primaryAccent: string;
  primaryAccentHover: string;
  primaryAccentGradient: string;
  bgDark: string;
  surfaceDark: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  borderSubtle: string;
  glassBg: string;
  fontHeading: string;
  fontBody: string;
}

export interface CityInfo {
  cityName: string;
  stateName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  developerName: string;
  developerLogoText: string;
  stats: {
    legacyYears: number;
    deliveredSqFt: string;
    projectsDelivered: number;
    happyFamilies: string;
  };
}

export interface FilterState {
  searchQuery: string;
  status: string;
  type: string;
  location: string;
  bhk: string;
  maxPrice: number;
}
