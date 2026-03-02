import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://adiportofolio.fun";
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adik Soleh",
  url: siteUrl,
  jobTitle: "Full Stack Developer",
  image: "https://adiportofolio.fun/me_photo.jpeg",
  sameAs: [
    "https://linkedin.com/in/adik-soleh",
    "https://github.com/adik-soleh",
    "mailto:adiksoleh4@gmail.com",
    "https://wa.me/62895360103563",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance / Remote",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "PT DumbWays Indonesia Teknologi",
  },
  knowsAbout: [
    "NestJS",
    "Vue.js",
    "React",
    "Express.js",
    "PostgreSQL",
    "Prisma",
    "Next.js",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "adiksoleh4@gmail.com",
    availableLanguage: ["id", "en"],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Adik Soleh — Full Stack Developer",
  description:
    "Portofolio resmi Adik Soleh, full stack developer fokus NestJS, Vue, React, dan Express untuk produk performa tinggi.",
  keywords: [
    "Adik Soleh",
    "Full Stack Developer",
    "NestJS developer",
    "Vue.js developer Indonesia",
    "React engineer",
    "Express developer",
    "Portfolio developer Indonesia",
    "Javascript engineer",
    "TypeScript engineer",
    "PostgreSQL developer",
    "Prisma ORM",
    "Next.js portfolio",
    "Software engineer Tangerang",
    "Freelance developer Indonesia",
    "Developer Indonesia",
    "Engineer Tangerang Selatan",
    "Backend NestJS",
    "Frontend Vue",
    "React TypeScript",
    "Full stack JavaScript",
    "Engineer Jakarta",
    "Web developer Indonesia",
    "Pengembang aplikasi web",
    "Konsultan IT Indonesia",
    "Jasa pembuatan website",
  ],
  authors: [{ name: "Adik Soleh", url: siteUrl }],
  creator: "Adik Soleh",
  publisher: "Adik Soleh",
  applicationName: "Adik Soleh Portfolio",
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "application/json": `${siteUrl}/api/cv`,
    },
    languages: {
      "id-ID": siteUrl,
      "en-US": `${siteUrl}/en`,
    },
  },
  openGraph: {
    title: "Adik Soleh · Full Stack Developer",
    description:
      "Menangani proyek HR enterprise, e-commerce, dan platform komunitas dengan stack JavaScript/TypeScript modern.",
    url: siteUrl,
    siteName: "Adik Soleh Portfolio",
    images: [
      {
        url: "https://adiportofolio.fun/me_photo.jpeg",
        width: 1200,
        height: 1600,
        alt: "Adik Soleh headshot",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adik Soleh — Full Stack Developer",
    description:
      "Portofolio proyek Adik Soleh: NestJS, Vue.js, React, Express, PostgreSQL, dan Prisma.",
    images: [
      "https://adiportofolio.fun/me_photo.jpeg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  other: {
    "google-site-verification": "replace-with-google-code",
    "bingbot": "index, follow",
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: "/web_icon.png",
    shortcut: "/web_icon.png",
    apple: "/web_icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "nUJSObGv_-CmURG9EHWu__BADlyxPxHcvZUihFACegM",
    other: {
      "pinterest": "pinterest-verification-code",
      "msvalidate.01": "FD3B3973E1E1A715B214DEB094638F63",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="theme-dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
