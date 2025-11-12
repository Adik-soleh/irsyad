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

export const metadata: Metadata = {
  title: "Adi — Fullstack Developer",
  description:
    "Portfolio pribadi Adi, fullstack developer yang mengerjakan aplikasi Next.js + Node.js end-to-end dengan fokus performa dan kolaborasi remote.",
  openGraph: {
    title: "Adi · Fullstack Developer",
    description:
      "Membangun produk web modern memakai Next.js, Node.js, dan arsitektur cloud.",
    url: "https://adi-pratama-portfolio.com",
    siteName: "Adi Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
        width: 900,
        height: 1200,
        alt: "Adi fullstack portrait",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-950 text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
