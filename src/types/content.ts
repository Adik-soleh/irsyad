import type { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
  helper?: string;
  countTo?: number;
  suffix?: string;
  decimals?: number;
};

export type WorkSpec = {
  objective: string;
  audience: string;
  channel: string;
  format: string;
  result: string;
};

export type Work = {
  title: string;
  shortTitle: string;
  description: string;
  tags: string[];
  year: string;
  cover: StaticImageData;
  spec: WorkSpec;
  note?: string;
  objective?: string;
  execution?: string;
  performance?: string;
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export type NewsEntry = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  category: string;
  readingTime: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  icon: string;
};

export type HeroContent = {
  greeting: string;
  name: string;
  tagline: string;
  roles?: string[];
  headline?: string;
  summary: string;
  skills: string[];
  photo: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  cvCta?: {
    label: string;
    href: string;
  };
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type Credential = {
  title: string;
  issuer?: string;
};

export type Capability = {
  title: string;
  description: string;
};
