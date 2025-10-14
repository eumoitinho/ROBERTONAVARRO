import type { PortableTextBlock } from '@portabletext/react';
import type { Image } from 'sanity';

// Tipos de Imagem
export interface SanityImage extends Image {
  alt?: string;
  caption?: string;
}

// Hero Section
export interface HeroButton {
  text?: string;
  link?: string;
  openInNewTab?: boolean;
}

export interface HeroSection {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: SanityImage;
  backgroundColor?: string;
  textColor?: string;
  primaryButton?: HeroButton;
  secondaryButton?: HeroButton;
}

// Content Sections
export interface TextSection {
  _type: 'textSection';
  _key: string;
  title?: string;
  subtitle?: string;
  content?: string;
  backgroundColor?: string;
}

export interface ImageSection {
  _type: 'imageSection';
  _key: string;
  title?: string;
  image?: SanityImage;
  caption?: string;
  layout?: 'left' | 'right' | 'center' | 'full';
}

export interface CTASection {
  _type: 'ctaSection';
  _key: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  style?: 'gold' | 'dark' | 'light';
}

export interface Feature {
  _key: string;
  icon?: string;
  title?: string;
  description?: string;
}

export interface FeaturesSection {
  _type: 'featuresSection';
  _key: string;
  title?: string;
  features?: Feature[];
}

export interface VideoSection {
  _type: 'videoSection';
  _key: string;
  title?: string;
  videoUrl?: string;
  description?: string;
}

export type ContentSection = TextSection | ImageSection | CTASection | FeaturesSection | VideoSection;

// Testimonials
export interface Testimonial {
  _key: string;
  name?: string;
  role?: string;
  content?: string;
  image?: SanityImage;
  rating?: number;
}

// FAQ
export interface FAQItem {
  _key: string;
  question?: string;
  answer?: string;
}

// SEO
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  noIndex?: boolean;
}

// Page Settings
export interface PageSettings {
  showHeader?: boolean;
  showFooter?: boolean;
  showWhatsAppButton?: boolean;
  customCSS?: string;
}

// Main Page Type
export interface Page {
  _id: string;
  _type: 'page';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  isActive?: boolean;
  heroSection?: HeroSection;
  mainContent?: PortableTextBlock[];
  contentSections?: ContentSection[];
  gallery?: SanityImage[];
  testimonials?: Testimonial[];
  faq?: FAQItem[];
  seo?: SEO;
  settings?: PageSettings;
  pageType?: 'homepage' | 'event' | 'formation' | 'book' | 'landing' | 'institutional' | 'blog' | 'other';
  order?: number;
}

// Site Settings Types
export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export interface Contact {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
}

export interface NavigationItem {
  _key: string;
  title?: string;
  href?: string;
  isButton?: boolean;
  openInNewTab?: boolean;
}

export interface FooterLink {
  _key: string;
  title?: string;
  href?: string;
}

export interface Footer {
  copyrightText?: string;
  footerLinks?: FooterLink[];
  showSocialMedia?: boolean;
}

export interface GlobalSEO {
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  defaultOgImage?: SanityImage;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export interface Scripts {
  headerScripts?: string;
  bodyScripts?: string;
  customCSS?: string;
}

export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  siteName: string;
  siteUrl: string;
  logo?: SanityImage;
  tagline?: string;
  contact?: Contact;
  socialMedia?: SocialMedia;
  mainNavigation?: NavigationItem[];
  footer?: Footer;
  seo?: GlobalSEO;
  scripts?: Scripts;
}
