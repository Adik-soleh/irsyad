import {
  Experience,
  HeroContent,
  NavItem,
  NewsEntry,
  Project,
  Service,
  SocialLink,
  Stat,
} from "@/types/content";

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:adiksoleh4@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/62895360103563" },
  { label: "LinkedIn", href: "https://linkedin.com/in/adik-soleh" },
  { label: "GitHub", href: "https://github.com/adik-soleh" },
];

export const stats: Stat[] = [
  { value: "4 produk", label: "Live apps", helper: "HR, commerce, sosial" },
  { value: "3+ thn", label: "Pengalaman", helper: "full stack" },
  { value: "24 jam", label: "Response time", helper: "WhatsApp first" },
];

export const heroContent: HeroContent = {
  greeting: "Halo, saya",
  name: "Adik Soleh",
  tagline: "Full Stack Developer",
  summary:
    "Full stack developer yang fokus pada JavaScript/TypeScript stack. Berpengalaman membangun aplikasi NestJS + Vue untuk kementerian, React + Express untuk commerce, dan Laravel CMS untuk operasi internal.",
  skills: ["NestJS", "Vue.js", "React", "Express.js", "PostgreSQL", "Prisma", "Laravel", "TypeScript", "Tailwind", "Git", "Php", "MySQL"],
  photo: "/me_photo.jpeg",
  primaryCta: {
    label: "Hubungi via WhatsApp",
    href: "https://wa.me/62895360103563",
  },
  secondaryCta: {
    label: "Kirim email",
    href: "adiksoleh4@gmail.com",
  },
  cvCta: {
    label: "Download CV",
    href: "/api/cv",
  },
};

export const services: Service[] = [
  {
    title: "Enterprise HR Platform",
    description:
      "Pengembangan module E-HRM untuk kementerian memakai NestJS + Vue dengan standar keamanan pemerintahan.",
    icon: "🏢",
    items: ["NestJS REST API", "Vue.js admin micro-frontend", "Docker + Redis caching"],
  },
  {
    title: "Commerce & Product Apps",
    description:
      "Membangun e-commerce, social media, dan SaaS ringan berbasis React/Next serta Express/Prisma.",
    icon: "🛒",
    items: ["React/Next storefront", "Express + Prisma backend", "Midtrans & Biteship integrasi"],
  },
  {
    title: "Data & Ops Enablement",
    description:
      "Menata database PostgreSQL/MySQL, migrasi Prisma, serta dokumentasi handover agar tim mudah scale.",
    icon: "🗂️",
    items: ["Schema & migration", "Monitoring & logging", "Knowledge base & SOP"],
  },
];

export const projects: Project[] = [
  {
    title: "E-HRM Kementerian PUPR",
    description:
      "Membangun dan memelihara sistem kepegawaian digital berskala nasional memakai NestJS, Vue.js, Docker, dan Redis untuk caching data pegawai.",
    tags: ["NestJS", "Vue.js", "Docker"],
    year: "2025",
    link: "https://ehrm.pu.go.id/dev/authentication/signin/form",
    cover:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Lakoe Store",
    description:
      "Aplikasi e-commerce modern dengan React + Chakra UI di front-end, Express + Prisma untuk API, serta Midtrans/Biteship sebagai pembayaran dan logistik.",
    tags: ["React", "Express", "PostgreSQL"],
    year: "2024",
    link: "https://lakoe-frontend-beta.vercel.app/",
    cover:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Circle App",
    description:
      "Platform komunitas mini dengan autentikasi, posting, dan interaksi real-time berbasis TypeScript, React, Express, dan PostgreSQL/Prisma.",
    tags: ["React", "Express", "Chakra UI"],
    year: "2024",
    link: "https://cirle-app-type-script.vercel.app/",
    cover:
      "https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "SkyBook Admin",
    description:
      "CMS untuk mengatur data pemesanan tiket maskapai menggunakan Laravel, Filament, dan autentikasi Sanctum dengan antarmuka yang mudah dipakai admin.",
    tags: ["Laravel", "Filament", "MySQL"],
    year: "2023",
    link: "https://github.com/Adik-soleh/SkyBook-App",
    cover:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80",
  },
];

export const experiences: Experience[] = [
  {
    title: "Fullstack Developer",
    company: "PT. Eka Abhipraya Semesta",
    period: "Jul 2024 — Now",
    description:
      "Mengembangkan E-HRM Kementerian PUPR dengan NestJS (backend) dan Vue.js (frontend), mengelola Docker, Redis, dan integrasi API agar performa dan keamanan terpenuhi.",
    skills: ["NestJS", "Vue.js", "Docker", "Redis"],
  },
  {
    title: "Fullstack Developer",
    company: "PT. Rimba Ananta Vikasa",
    period: "Jan 2024 — Apr 2024",
    description:
      "Membangun berbagai aplikasi web memakai JavaScript/TypeScript, Nuxt, NestJS, Vue, dan Laravel; terbiasa kolaborasi lintas tim untuk solusi yang scalable.",
    skills: ["Nuxt", "NestJS", "Vue.js", "Laravel"],
  },
  {
    title: "Sales Associate",
    company: "PT. Matahari Tbk",
    period: "Feb 2022 — Aug 2023",
    description:
      "Mempromosikan produk Crocodile kids, menjaga display, dan mengejar target penjualan dengan pendekatan customer-first.",
    skills: ["Sales", "Visual merchandising", "Customer care"],
  },
  {
    title: "Full Stack Developer Trainee",
    company: "PT DumbWays Indonesia Teknologi",
    period: "2023",
    description:
      "Bootcamp intensif membangun aplikasi end-to-end menggunakan React, Node.js, Express, NestJS, dan UI libraries seperti Chakra UI serta Tailwind.",
    skills: ["React", "Express.js", "Tailwind", "Team project"],
  },
];

export const newsEntries: NewsEntry[] = [
  {
    slug: "ehrm-docker-rollout",
    title: "Docker rollout untuk E-HRM PUPR",
    excerpt:
      "Memaketkan service NestJS dan Vue ke Docker + Redis sehingga dashboard pegawai kementerian lebih stabil.",
    content: [
      "Minggu ini kami men-deploy versi containerized dari E-HRM. NestJS API, worker queue, dan front-end Vue kini berjalan di cluster Docker yang sama sehingga proses rilis jauh lebih terprediksi.",
      "Redis dipakai untuk caching data pegawai yang sering diakses. Latency pencarian turun dari 1.2 detik menjadi 320 ms, cukup signifikan untuk pengguna internal yang membuka ratusan record per jam.",
      "Selanjutnya saya sedang menyusun playbook scaling agar tim infra PUPR bisa mengambil alih ketika traffic memuncak saat periode audit tahunan.",
    ],
    date: "18 Nov 2024",
    category: "Build log",
    readingTime: "4 menit",
  },
  {
    slug: "lakoe-midtrans-checkout",
    title: "Lakoe Store resmi terima Midtrans",
    excerpt:
      "Integrasi Midtrans dan Biteship selesai sehingga checkout React + Express berjalan end-to-end.",
    content: [
      "Lakoe Store awalnya hanya mendukung pembayaran dummy. Setelah menambahkan Midtrans Snap API, order bisa langsung diverifikasi lewat webhook Express.",
      "Saya memasangkan Prisma untuk merekam status pembayaran per transaksi serta sinkron Biteship agar label pengiriman otomatis muncul di dashboard admin.",
      "Testing regresi dilakukan lewat Vitest + Thunder Client collection sehingga setiap rilis tetap aman walau tim kecil.",
    ],
    date: "05 Nov 2024",
    category: "Release",
    readingTime: "3 menit",
  },
  {
    slug: "circle-realtime-update",
    title: "Realtime comment di Circle App",
    excerpt:
      "Menambahkan channel komentar hidup menggunakan Socket.IO agar komunitas mini terasa responsif.",
    content: [
      "Circle App kini mendukung komentar real-time. Socket.IO berjalan di Express server dan memanfaatkan namespace berbeda untuk feed publik.",
      "Untuk menjaga keamanan, setiap koneksi divalidasi JWT yang dikeluarkan API, sementara payload disimpan di PostgreSQL lewat Prisma agar tetap konsisten.",
      "Hasilnya, durasi percakapan di cohort privat meningkat karena setiap notifikasi datang detik itu juga, bukan lagi pooling 30 detik.",
    ],
    date: "24 Okt 2024",
    category: "Feature",
    readingTime: "3 menit",
  },
  {
    slug: "skybook-filament-handover",
    title: "SkyBook Admin siap di-handover",
    excerpt:
      "Melengkapi CMS Laravel + Filament dengan dokumentasi deployment agar tim ops bisa lanjut mandiri.",
    content: [
      "SkyBook Admin kini memiliki modul pelacakan booking baru. Filament memudahkan pembuatan form dinamis untuk jadwal penerbangan.",
      "Saya menambahkan Sanctum guard khusus admin sehingga akses antar peran bisa dipisah tanpa menulis ulang middleware.",
      "Dokumentasi deployment di XAMPP + MySQL selesai, termasuk skrip seed agar tim ops dapat mengisi data awal hanya dengan sekali jalan.",
    ],
    date: "10 Okt 2024",
    category: "Ops note",
    readingTime: "4 menit",
  },
];

export function getNewsEntry(slug: string) {
  return newsEntries.find((entry) => entry.slug === slug);
}
