import type { StaticImageData } from "next/image";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  /** Rendered as-is before the count-up runs, and as the fallback without JS. */
  value: string;
  label: string;
  helper?: string;
  /** Numeric target for the count-up. Omit to skip the animation. */
  countTo?: number;
  suffix?: string;
  decimals?: number;
};

/** The labelled rows of a campaign sheet, in the order an agency one-pager reads. */
export type WorkSpec = {
  objective: string;
  audience: string;
  channel: string;
  format: string;
  result: string;
};

export type Work = {
  title: string;
  /** Short label for the sticky case index. */
  shortTitle: string;
  description: string;
  tags: string[];
  year: string;
  cover: StaticImageData;
  /** Campaign-sheet rows — used by the editorial layout. */
  spec: WorkSpec;
  /** Longer narrative, shown under the spec table. */
  note?: string;
  /* The narrative trio below is what the classic layout renders instead. */
  challenge?: string;
  approach?: string;
  impact?: string;
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
  headline: string;
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

export type Capability = {
  title: string;
  description: string;
};
