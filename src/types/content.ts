export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
  helper?: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  link: string;
  cover: string;
  problem?: string;
  uiSolution?: string;
  systemSolution?: string;
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
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

export type HeroContent = {
  greeting: string;
  name: string;
  tagline: string;
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

export type Tool = {
  name: string;
};
