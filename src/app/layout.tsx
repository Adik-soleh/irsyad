import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://portofolio-web-umber-chi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Adik Soleh — Full Stack Developer",
  description:
    "Portfolio resmi Adik Soleh, full stack developer yang membangun aplikasi NestJS, Vue, React, dan Express end-to-end dengan fokus pada performa, keamanan, dan kesiapan produksi.",
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
  },
  openGraph: {
    title: "Adik Soleh · Full Stack Developer",
    description:
      "Menangani proyek HR enterprise, e-commerce, dan platform komunitas dengan stack JavaScript/TypeScript modern.",
    url: siteUrl,
    siteName: "Adik Soleh Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
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
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
