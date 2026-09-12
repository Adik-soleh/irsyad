import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import InitialLoader from "@/components/molecules/InitialLoader";
import { CursorFollower } from "@/components/atoms/CursorFollower";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const siteUrl = "https://irsyadportfolio.vercel.app";
const ogImage = `${siteUrl}/irsyad_photo.jpg`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Irsyad Rafly Wahyudi",
  url: siteUrl,
  jobTitle: "Digital Marketing Specialist",
  image: ogImage,
  sameAs: [
    "https://www.linkedin.com/in/irsyad-rafly-1509932b5",
    "mailto:irsyad.rafly.wahyudi@gmail.com",
    "https://wa.me/628111118355",
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Asia e University Malaysia",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "CCIT — Faculty of Engineering, University of Indonesia",
    },
  ],
  knowsAbout: [
    "Digital Marketing",
    "Social Media Management",
    "Meta Ads",
    "Google Ads",
    "Content Strategy",
    "Corporate Communication",
    "Graphic Design",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "business",
    email: "irsyad.rafly.wahyudi@gmail.com",
    availableLanguage: ["id", "en"],
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Irsyad Rafly Wahyudi — Digital Marketing Specialist",
  description:
    "Portofolio Irsyad Rafly Wahyudi — Digital Marketing Specialist dengan fokus social media management, paid advertising (Meta Ads), content strategy, dan corporate communication.",
  keywords: [
    "Irsyad Rafly Wahyudi",
    "Digital Marketing Specialist",
    "Social Media Specialist Indonesia",
    "Meta Ads Specialist",
    "Google Ads",
    "Content Strategist",
    "Social Media Management",
    "Corporate Communication",
    "Graphic Designer Indonesia",
    "Performance Marketing",
    "Portfolio digital marketing",
    "Digital marketing Jakarta",
  ],
  authors: [{ name: "Irsyad Rafly Wahyudi", url: siteUrl }],
  creator: "Irsyad Rafly Wahyudi",
  publisher: "Irsyad Rafly Wahyudi",
  applicationName: "Irsyad Rafly Portfolio",
  category: "marketing",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Irsyad Rafly Wahyudi · Digital Marketing Specialist",
    description:
      "Social media management, paid advertising, dan content strategy untuk brand awareness dan pertumbuhan bisnis yang terukur.",
    url: siteUrl,
    siteName: "Irsyad Rafly Portfolio",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 1800,
        alt: "Irsyad Rafly Wahyudi",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irsyad Rafly Wahyudi — Digital Marketing Specialist",
    description:
      "Portofolio digital marketing: Meta Ads, social media strategy, content creation, dan corporate communication.",
    images: [ogImage],
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
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  icons: {
    icon: "/irsyad_icon.png",
    shortcut: "/irsyad_icon.png",
    apple: "/irsyad_icon_apple.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${anton.variable} font-sans antialiased`}>
        <InitialLoader />
        <CursorFollower />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
