import {
  Capability,
  ContactChannel,
  Education,
  Experience,
  HeroContent,
  NavItem,
  NewsEntry,
  SkillCategory,
  SocialLink,
  Stat,
  Credential,
  Work,
} from "@/types/content";
import { images } from "@/constants/images";

const WHATSAPP_NUMBER = "628111118355";
const WHATSAPP_MESSAGE =
  "Hi Irsyad, I’m interested in discussing a digital marketing collaboration.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const EMAIL = "irsyad.rafly.wahyudi@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/irsyad-rafly-1509932b5";

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Email", href: `mailto:${EMAIL}` },
  { label: "WhatsApp", href: WHATSAPP_LINK },
  { label: "LinkedIn", href: LINKEDIN },
];

export const contactChannels: ContactChannel[] = [
  { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: "/email.svg" },
  { label: "WhatsApp", value: "+62 811 1118 355", href: WHATSAPP_LINK, icon: "/wa.svg" },
  { label: "LinkedIn", value: "Irsyad Rafly", href: LINKEDIN, icon: "/linkedin.svg" },
];

export const stats: Stat[] = [
  {
    value: "110.7K",
    label: "Total views",
    helper: "72.4K organic · 38.2K ads",
    countTo: 110.7,
    suffix: "K",
    decimals: 1,
  },
  {
    value: "94.6K",
    label: "Accounts reached",
    helper: "up 2.4x from the previous period",
    countTo: 94.6,
    suffix: "K",
    decimals: 1,
  },
  {
    value: "421%",
    label: "Impressions growth",
    helper: "110.9K impressions",
    countTo: 421,
    suffix: "%",
    decimals: 0,
  },
  {
    value: "1.6K",
    label: "Link clicks",
    helper: "1,608 clicks from paid campaigns",
    countTo: 1.6,
    suffix: "K",
    decimals: 1,
  },
];

export const heroContent: HeroContent = {
  name: "Hi, I'm Irsyad Rafly Wahyudi",
  summary:
    "I’m a results-driven and versatile Digital Marketing & Corporate Communications Specialist with proven experience in end-to-end brand management, performance marketing, and media relations across Indonesia and Malaysia.",
  skills: [
    "Meta for Business",
    "Google Ads",
    "Social Media Strategy",
    "Content Planning",
    "Canva",
    "Adobe Creative Suite",
    "Figma",
    "Copywriting",
  ],
  photo: "/irsyad_photo.jpg",
  primaryCta: {
    label: "View My Work",
    href: "#work",
  },
  secondaryCta: {
    label: "Contact Me",
    href: "#contact",
  },
  cvCta: {
    label: "Download Portfolio",
    href: "/api/cv",
  },
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Tools & Platforms",
    skills: [
      "Meta Business Suite",
      "Google Ads",
      "Google Analytics",
      "Instagram Insights",
      "Brandwatch",
      "Social Media Advertising",
      "Canva",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe Premiere Pro",
      "After Effects",
      "Figma",
      "CapCut",
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft PowerPoint",
      "Microsoft Outlook",
      "Microsoft Teams",
      "SharePoint / OneDrive",
    ],
  },
];

export const credentials: Credential[] = [
  { issuer: "Robert Bosch Malaysia", title: "Internship Completion Certificate", year: "2026" },
  { issuer: "HRD Corp Malaysia", title: "Media Training", year: "2026" },
  {
    issuer: "Indonesian Professional Certification Authority (IPCA)",
    title: "Certified Digital Marketing Specialist",
    year: "2026",
  },
  { issuer: "PT MSA Certification", title: "Certificate of Recommendation", year: "2026" },
  {
    issuer: "Malaysia Examinations Council",
    title: "Malaysian University English Test (MUET)",
    year: "2025",
  },
  { issuer: "PT Mutu International Tbk", title: "Certificate of Recommendation", year: "2025" },
  {
    issuer: "National Institute of Information Technology",
    title: "Professional Diploma in Information Technology (DNIIT)",
    year: "2024",
  },
  {
    issuer: "University of Indonesia",
    title: "Professional Certificate in Digital Marketing",
    year: "2024",
  },
  { issuer: "KOPASSUS", title: "Leadership Training Certificate", year: "2021" },
];

export const capabilities: Capability[] = [
  {
    title: "Performance Marketing Analyst",
    description: "Analysing marketing data, ad algorithms, and consumer trends.",
  },
  {
    title: "Digital Advertising Specialist",
    description: "Managing and optimising paid ads through Meta for Business.",
  },
  {
    title: "Social Media Strategist",
    description: "Building content and ad strategies that drive brand awareness.",
  },
  {
    title: "Media Relations",
    description: "Managing media communications to strengthen brand reputation.",
  },
  {
    title: "Corporate Communication",
    description: "Creating company profiles — booklets, presentations, looping videos, and profile videos.",
  },
  {
    title: "Corporate Content Creator",
    description: "Producing Instagram feed posts and reels that attract audiences.",
  },
  {
    title: "Graphic Designer",
    description: "Designing banners, brochures, posters, and certificates.",
  },
  {
    title: "Business Development",
    description: "Supporting strategic partnerships that drive business growth.",
  },
];

export const works: Work[] = [
  {
    title: "Performance Marketing Analyst",
    shortTitle: "Performance Analyst",
    description:
      "Reading digital campaign data to measure performance, uncover optimisation opportunities, and drive reach, engagement, and conversions.",
    tags: ["Meta Business Suite", "Instagram Insights", "Reporting"],
    year: "2024 — 2026",
    cover: images.work.performance,
    objective:
      "To evaluate digital marketing performance through data and identify opportunities to improve campaign effectiveness, audience reach, engagement, and conversions.",
    execution:
      "Analyse campaign data across organic and paid channels, monitor key performance indicators, compare results across reporting periods, and identify trends and optimisation opportunities.",
    performance:
      "Translate campaign data into actionable insights that support more informed marketing decisions, improve content and campaign performance, and maximise digital impact.",
    spec: {
      objective: "Measure campaign performance and find optimisation opportunities",
      audience: "Management and internal stakeholders",
      channel: "Meta Business Suite · Instagram Insights",
      format: "Periodic performance reports",
      result: "110,736 views · 94,595 reach · 2,026 interactions",
    },
    note:
      "Separating organic and paid performance from the start showed that of 110,736 total views, 72,460 came from organic and 38,276 from ads — the basis for deciding the next budget allocation.",
  },
  {
    title: "Digital Advertising Specialist (Meta Ads)",
    shortTitle: "Meta Ads",
    description:
      "Managing and optimising paid campaigns on Meta for Business with a data-driven strategy so every rupiah of budget works as hard as possible.",
    tags: ["Meta Ads", "Budget Optimization", "A/B Testing"],
    year: "2024 — 2026",
    cover: images.work.metaAds,
    objective:
      "To maximise the effectiveness of paid digital campaigns by reaching the right audience and achieving campaign objectives efficiently.",
    execution:
      "Set up and manage Meta Ads campaigns, define audience targeting, monitor campaign performance, analyse key metrics, and optimise campaigns based on data and audience response.",
    performance:
      "Improve campaign efficiency and audience reach through continuous optimisation, while using performance insights to support stronger engagement, conversions, and return on advertising spend.",
    spec: {
      objective: "Increase reach and link clicks on a limited budget",
      audience: "Businesses seeking ISO certification",
      channel: "Meta Ads — Instagram & Facebook",
      format: "Boosted posts · scheduled campaigns",
      result: "Impressions 110.9K (+421.7%) · 1,608 link clicks",
    },
    note:
      "Creatives were tested in pairs, then the ads with the highest cost per result were paused and their budget shifted to proven ad sets.",
  },
  {
    title: "Social Media Strategist",
    shortTitle: "Social Strategy",
    description:
      "Designing and managing cross-platform content strategy: structured content calendars, trend-based planning, and optimised posting times and formats.",
    tags: ["Content Calendar", "Instagram", "Facebook"],
    year: "2024 — 2026",
    cover: images.work.social,
    objective:
      "To build a consistent and engaging social media presence that strengthens brand visibility, audience engagement, and communication across digital platforms.",
    execution:
      "Develop content strategies and structured content calendars, plan content around relevant trends and audience behaviour, and optimise posting formats, timing, and messaging across social media channels.",
    performance:
      "Strengthen content consistency and audience engagement while using social media insights to refine content strategies and improve reach and overall platform performance.",
    spec: {
      objective: "Keep publishing consistent and increase engagement",
      audience: "The brand’s Instagram and Facebook followers",
      channel: "Instagram · Facebook",
      format: "Monthly content calendar",
      result: "Content interactions up 100%",
    },
    note:
      "The number of weekly slots was set first based on team capacity, then filled with themes. Posting times came from audience activity in Insights, not guesswork.",
  },
  {
    title: "Corporate Communication",
    shortTitle: "Corporate Comms",
    description:
      "Managing and developing corporate communication materials — annual reports, company profiles, and corporate presentations — with consistent branding.",
    tags: ["Annual Report", "Company Profile", "Presentation"],
    year: "2024 — 2026",
    cover: images.work.corporateComm,
    objective:
      "To communicate corporate messages clearly and consistently while maintaining a professional brand identity across internal and external communication materials.",
    execution:
      "Develop corporate communication materials including company profiles, corporate presentations, reports, and official communication assets, ensuring alignment with brand guidelines, messaging, and stakeholder requirements.",
    performance:
      "Deliver clear, consistent, and professional communication materials that strengthen corporate identity, support stakeholder communication, and enhance the overall presentation of the organisation.",
    spec: {
      objective: "Unify the visual identity of all corporate materials",
      audience: "Clients, partners, and internal stakeholders",
      channel: "Print and presentation",
      format: "Company profile · annual report · profile video",
      result: "A ready-to-use set of corporate materials",
    },
    note:
      "The company profile was rebuilt as a single package — booklet, presentation, looping video, and profile video — with a unified visual system and messaging.",
  },
  {
    title: "Corporate Content Creator",
    shortTitle: "Content Creator",
    description:
      "Designing, managing, and publishing the company’s digital content — from educational feed posts to reels that highlight current moments and issues.",
    tags: ["Feed Post", "Reels", "Copywriting"],
    year: "2024 — 2026",
    cover: images.work.content,
    objective:
      "To create engaging corporate content that strengthens brand visibility, communicates key messages effectively, and maintains a consistent brand identity across digital channels.",
    execution:
      "Develop, design, manage, and publish corporate content across social media and digital platforms, while applying brand guidelines, visual identity, tone of voice, and messaging to ensure consistency across communications.",
    performance:
      "Strengthen brand consistency and audience engagement through relevant and visually compelling content, while supporting broader corporate communication and brand management objectives.",
    spec: {
      objective: "Make technical topics easy to digest in the feed",
      audience: "General audience and prospective clients",
      channel: "Instagram feed & reels",
      format: "Carousel · reels · caption",
      result: "33,128 views · 16,446 reach · 268 interactions",
    },
    note:
      "Content opens with concerns already on the audience’s mind — reputation, cost, process — and the technical standards come in as the answer, not the opener.",
  },
];

export const experiences: Experience[] = [
  {
    title: "Corporate Communications & Brand Management",
    company: "Robert Bosch Malaysia",
    period: "Jan 2026 — Jun 2026",
    description:
      "Managed corporate communications and brand management activities across Bosch Malaysia, including social media, internal and external communications, and cross-business alignment. Supported the Bosch Malaysia × Bosch Rexroth × MIDA collaboration during Semiconductor Southeast Asia by developing the concept, script, and production plan and coordinating with senior stakeholders.",
    skills: ["Brand Management", "Corporate Communication", "Media Relations"],
  },
  {
    title: "Digital Marketing — Social Media Management",
    company: "PT MSA Certification",
    period: "Nov 2024 — Mar 2026",
    description:
      "Managed social media and Meta Ads campaigns to strengthen brand visibility and engagement. Produced corporate profiles and branded event content from concept to final production, ensuring consistent brand execution.",
    skills: ["Meta Ads", "Content Strategy", "Analytics", "Copywriting"],
  },
  {
    title: "Digital Marketing — Social Media Management",
    company: "PT Mutu International Tbk.",
    period: "May 2024 — Feb 2025",
    description:
      "Developed and managed end-to-end social media strategies, from content planning and creation to publishing and scheduling, aligned with audience behaviour and brand objectives. Managed monthly Meta Ads campaigns, using performance analytics and audience insights to optimise targeting, improve campaign efficiency, and strengthen brand awareness.",
    skills: ["Social Media", "Content Production", "Design"],
  },
  {
    title: "Scriptwriter — Cinematography Podcast",
    company: "Podcast CCIT FTUI, Universitas Indonesia",
    period: "Nov 2023 — Jan 2024",
    description:
      "Wrote scripts and structured episode flows for a cinematography-themed podcast on CCIT FTUI’s official channel.",
    skills: ["Scriptwriting", "Storytelling", "Podcast"],
  },
  {
    title: "Event Division",
    company: "Convocation CCIT FTUI, Universitas Indonesia",
    period: "Oct 2023 — Nov 2023",
    description:
      "Managed event equipment, venue decorations, and photography/videography documentation to ensure smooth event operations, a professional presentation, and comprehensive coverage of key moments throughout the graduation ceremony.",
    skills: ["Event Management", "Team Coordination"],
  },
  {
    title: "Design and Documentation",
    company: "Induction Days CCIT FTUI, Universitas Indonesia",
    period: "Jul 2023 — Sep 2023",
    description:
      "Developed and designed branding materials, including the event logo, social media content, posters, banners, apparel, and event accessories, while editing and producing documentary videos covering the entire event lifecycle, from pre-event preparation to post-event execution, to maintain a cohesive visual identity and capture the event comprehensively.",
    skills: ["Graphic Design", "Documentation"],
  },
];

export const educations: Education[] = [
  {
    school: "Asia e University Malaysia",
    degree: "Bachelor of Information and Communication Technology",
    period: "2022 — 2026",
  },
  {
    school: "CCIT — Faculty of Engineering, University of Indonesia",
    degree: "Professional Diploma in Information Technology / DNIIT Digital Marketing",
    period: "2022 — 2024",
  },
];

export const newsEntries: NewsEntry[] = [
  {
    slug: "membaca-angka-sebelum-menambah-budget",
    title: "Read the Numbers Before Adding Budget",
    excerpt:
      "A 421% jump in impressions didn’t come from a bigger budget — it came from deciding which ads deserved to keep running.",
    content: [
      "The most common temptation when a campaign starts showing results is to raise the budget straight away. What needs to be checked first is where those results are coming from: which ad sets deliver the most efficient cost per result, and which ones are simply burning through the budget.",
      "In one management period, I separated organic and paid performance from the very beginning. Of 110,736 total views, 72,460 came from organic and 38,276 from ads. That simple split matters: without it, it is easy to assume the ads are working when organic content is doing the lifting, or the other way around.",
      "Once the pattern was clear, the next steps became obvious — pause creatives whose cost per click sat far above average, then shift that budget to creatives that had already proven themselves. Impressions rose 421.7% and reach rose 379.7%, while the cost structure stayed under control.",
      "The point: data isn’t a report produced at the end of the month for formality’s sake. Data is the basis for weekly decisions.",
    ],
    date: "12 Mar 2026",
    category: "Paid Ads",
    readingTime: "3 min read",
  },
  {
    slug: "content-calendar-yang-benar-benar-dipakai",
    title: "A Content Calendar That Actually Gets Used",
    excerpt:
      "Content calendars fail not because they aren’t tidy enough, but because they are built without thinking about who has to execute them.",
    content: [
      "Many brands have a content calendar, but stop using it by the third week. The cause is rarely the template — it is usually because the calendar was planned too ambitiously for the team’s actual capacity.",
      "My approach: decide the realistic number of weekly slots first, then fill in the themes. Not the other way around. Every slot carries three minimum details — format (feed, carousel, or reels), theme, and posting time. Everything else follows during production.",
      "Posting times aren’t guessed. They come from the audience’s active hours in Insights, then get tested over several weeks. If a slot consistently underperforms, the slot moves — the content doesn’t get the blame.",
      "With a rhythm the team can sustain, posting frequency became stable and content interactions rose 100% compared with the previous period — without adding anyone to the team.",
    ],
    date: "28 Feb 2026",
    category: "Content Strategy",
    readingTime: "3 min read",
  },
  {
    slug: "menjual-topik-teknis-di-media-sosial",
    title: "How to Sell Technical Topics on Social Media",
    excerpt:
      "ISO certification isn’t a topic that stops the scroll. Unless you change the way it’s told.",
    content: [
      "Quality standards, audits, and certification are important topics for businesses, but they sound heavy in a social media feed. Content that explains the clauses as they are will almost certainly be skipped.",
      "What works is content that starts from questions already on the audience’s mind — worries about reputation, cost, or a process that seems complicated. The technical standards are still delivered, but they come in as the answer, not as the opener.",
      "Format matters too. Carousels suit step-by-step explanations, while reels are stronger for picking up moments and trending issues. One post using this approach reached 33,128 views, 16,446 reach, and 268 interactions — well above the average regular post.",
      "Technical topics don’t need to be simplified until they lose their substance. What needs to change is the order in which they’re told.",
    ],
    date: "14 Feb 2026",
    category: "Social Media",
    readingTime: "3 min read",
  },
];

export function getNewsEntry(slug: string) {
  return newsEntries.find((entry) => entry.slug === slug);
}
