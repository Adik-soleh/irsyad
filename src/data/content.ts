import {
  Experience,
  HeroContent,
  NavItem,
  NewsEntry,
  Project,
  SkillCategory,
  SocialLink,
  Stat,
  Tool,
} from "@/types/content";
import { images } from "@/constants/images";

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:adiksoleh4@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/62895360103563?text=Halo%20Mas%20Adik%2C%20saya%20tertarik%20untuk%20diskusi%20mengenai%20project%20%2F%20penawaran%20kerja%20sama%20nih." },
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
    href: "https://wa.me/62895360103563?text=Halo%20Mas%20Adik%2C%20saya%20tertarik%20untuk%20diskusi%20mengenai%20project%20%2F%20penawaran%20kerja%20sama%20nih.",
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

export const skillCategories: SkillCategory[] = [
  {
    title: "WEB / TAMPILAN",
    skills: ["React", "Vue.js", "Next.js", "TailwindCSS", "ChakraUI", "Framer Motion"],
  },
  {
    title: "SISTEM & DATABASE",
    skills: ["NestJS", "Express.js", "Prisma", "PostgreSQL", "MySQL", "Docker", "Redis"],
  },
];

export const tools: Tool[] = [
  { name: "Git" },
  { name: "GitHub Actions" },
  { name: "Docker" },
  { name: "Redis" },
  { name: "Vercel" },
  { name: "Fly.io" },
  { name: "Figma" },
  { name: "Postman" },
];

export const projects: Project[] = [
  {
    title: "E-HRM Kementerian PUPR",
    description:
      "Membangun dan memelihara sistem kepegawaian digital berskala nasional memakai NestJS, Vue.js, Docker, dan Redis untuk caching data pegawai.",
    tags: ["NestJS", "Vue.js", "Docker", "Redis"],
    year: "2025",
    link: "https://ehrm.abhipraya.co/authentication/signin/cover",
    cover: images.projects.pupr,
    problem: "Sistem kepegawaian manual, data tersebar di banyak spreadsheet yang menyebabkan inkonsistensi dan lambatnya proses audit internal.",
    uiSolution: "Membangun Vue.js micro-frontend yang responsif dan sangat dioptimasi untuk admin dashboard dengan complex data grids yang intuitif.",
    systemSolution: "Merancang NestJS REST API dengan Docker container dan Redis caching, yang mampu menurunkan query latency hingga 75% saat load tinggi.",
  },
  {
    title: "Lakoe Store",
    description:
      "Aplikasi e-commerce modern dengan React + Chakra UI di front-end, Express + Prisma untuk API, serta Midtrans/Biteship.",
    tags: ["React", "Express", "PostgreSQL"],
    year: "2024",
    link: "https://lakoe-frontend-beta.vercel.app/",
    cover: images.projects.lakoe,
    problem: "Banyak UMKM kesulitan menerima sistem pembayaran digital dan melakukan tracking pengiriman otomatis lewat logistik lokal.",
    uiSolution: "Checkout flow instan dari sisi klien dengan state management berbasis Redux, mengurangi cart abandon rate.",
    systemSolution: "Implementasi Express backend webhook untuk mendengar callback sukses dari Midtrans, lalu memanggil Biteship untuk mencetak resi.",
  },
  {
    title: "Circle App",
    description:
      "Platform komunitas mini dengan autentikasi, posting, dan interaksi real-time berbasis TypeScript, React, Express, dan PostgreSQL/Prisma.",
    tags: ["React", "Express", "Chakra UI"],
    year: "2024",
    link: "https://cirle-app-type-script.vercel.app/",
    cover: images.projects.circleApp,
    problem: "Forum komunitas konvensional kurang engaging karena membutuhkan refresh manual untuk melihat komentar/balasan baru.",
    uiSolution: "Tampilan timeline endless-scroll layaknya X/Twitter yang memfokuskan user pada konten secara instan dengan Dark Mode default.",
    systemSolution: "Integrasi Socket.IO namespace pada Express API + Prisma untuk siaran notifikasi komentar baru ke klien secara real-time.",
  },
  {
    title: "SkyBook Admin",
    description:
      "CMS untuk mengatur data pemesanan tiket maskapai menggunakan Laravel, Filament, dan autentikasi Sanctum dengan antarmuka yang mudah dipakai admin.",
    tags: ["Laravel", "Filament", "MySQL"],
    year: "2023",
    link: "https://github.com/Adik-soleh/SkyBook-App",
    cover: images.projects.airlane,
    problem: "Tingginya kesalahan input jadwal maskapai saat dilakukan secara manual atau tanpa validasi form yang kuat dari sisi panel.",
    uiSolution: "Menggunakan Laravel Filament untuk menghasilkan form TALL Stack (Tailwind, Alpine, Livewire) yang dinamis, auto-validasi, dan mudah dipahami staf.",
    systemSolution: "Membatasi endpoint API dengan middleware Sanctum JWT Auth. Penanganan role-base access (Admin vs Agen).",
  },
  {
    title: "Notion Mini",
    description:
      "Platform workspace dan manajemen catatan terstruktur bergaya Notion untuk pengelolaan blok konten secara dinamis dan real-time.",
    tags: ["Vue.js", "Express.js", "Prisma", "Tailwind CSS", "PostgreSQL"],
    year: "2024",
    link: "https://notion-mini.vercel.app",
    cover: images.projects.notion,
    problem: "Aplikasi pencatatan konvensional yang terlalu hierarkis dan statis, sehingga membatasi fleksibilitas penambahan berbagai media (teks, kode, gambar, checklist) secara seragam.",
    uiSolution: "Membangun antarmuka SPA interaktif menggunakan Vue.js dan Tiptap editor dengan fitur drag-and-drop, memberikan pengalaman memformat catatan yang seamless bagi user.",
    systemSolution: "Merancang REST API terukur dengan arsitektur penyimpanan otomatis berbasis block (node-tree) menggunakan Node.js/Express, Prisma ORM, dan Vercel Serverless Functions.",
  },
  {
    title: "Company Profile",
    description:
      "Website company profile interaktif untuk agensi digital (Lunatic Foundry) yang berfokus pada konversi, menampilkan portofolio karya, serta layanan UI/UX dan Web/Mobile Development.",
    tags: ["Next.js", "Tailwind CSS", "Docker",],
    year: "2026",
    link: "https://anywareagency.vercel.app/",
    cover: images.projects.compro,
    problem: "Kebutuhan agensi digital modern untuk memiliki identitas online yang solid dan responsif, mampu meyakinkan calon klien melalui presentasi portofolio yang bersih tanpa membingungkan alur navigasi.",
    uiSolution: "Merancang desain antarmuka dengan prinsip 'conversion-first design'. Menerapkan tata letak minimalis, tipografi yang tegas, serta kemudahan navigasi agar user mudah menjelajahi alur layanan dari tahap Discovery, Build, hingga Launch.",
    systemSolution: "Membangun arsitektur frontend dengan fokus pada 'speed-obsessed engineering' menggunakan optimasi aset dan Lazy Loading, kemudian di-deploy melalui otomatisasi Vercel agar memastikan performa website yang cepat dan SEO-friendly.",
  },
  {
    title: "Gading New Town Dashboard",
    description:
      "Sistem informasi manajemen perumahan berbasis web untuk memudahkan interaksi antara Pengurus RT dan Warga dalam mengelola data warga, pembayaran IPL bulanan, pengaduan, hingga perizinan.",
    tags: ["React", "NestJS", "PostgreSQL", "Prisma"],
    year: "2024",
    link: "https://github.com/Adik-soleh/Gading_New_Town",
    cover: images.projects.dashboard,
    problem: "Proses administrasi tingkat RT yang masih manual, yang seringkali menyulitkan pelacakan pembayaran bukti IPL yang valid, penanganan keluhan warga, serta pendataan mutasi warga.",
    uiSolution: "Membangun antarmuka dashboard Single Page Application (SPA) yang responsif menggunakan React (Vite) dan Tailwind CSS, dengan pemisahan tampilan spesifik antara hak akses pengurus RT dan warga.",
    systemSolution: "Menerapkan arsitektur decoupled menggunakan framework NestJS dan database PostgreSQL dengan Prisma ORM, serta menerapkan Role-Based Access Control (RBAC) dan keamanan Better-Auth.",
  }
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
    "slug": "web3-beyond-crypto-infrastructure",
    "title": "Web3 Bukan Sekadar Crypto: Membangun Infrastruktur Aplikasi Terdesentralisasi",
    "excerpt": "Web3 berkembang jauh melampaui cryptocurrency, dengan fokus pada desentralisasi data, identitas digital, dan arsitektur aplikasi tanpa otoritas tunggal.",
    "content": [
      "Selama ini, Web3 seringkali diasosiasikan hanya dengan cryptocurrency dan trading aset digital. Padahal, esensi utama dari Web3 adalah desentralisasi, yaitu menghilangkan ketergantungan pada satu entitas pusat dalam mengelola data dan sistem.",
      "Teknologi seperti blockchain, smart contract, dan decentralized storage memungkinkan developer untuk membangun aplikasi yang transparan, trustless, dan lebih tahan terhadap single point of failure. Contohnya adalah penggunaan IPFS untuk penyimpanan file dan smart contract untuk mengatur logic bisnis secara otomatis tanpa backend tradisional.",
      "Bagi developer, Web3 menghadirkan paradigma baru dalam membangun aplikasi. Alih-alih menggunakan REST API konvensional, kita berinteraksi langsung dengan blockchain melalui RPC atau SDK tertentu. Hal ini membutuhkan pemahaman tambahan terkait wallet integration, gas fee, serta keamanan smart contract.",
      "Namun, tantangan terbesar Web3 saat ini bukan hanya dari sisi teknologi, tetapi juga dari sisi user experience. Proses seperti wallet connection, signing transaction, dan handling network seringkali masih terasa kompleks bagi user awam. Di sinilah peran developer sangat krusial untuk menyederhanakan experience tersebut.",
      "Ke depan, Web3 berpotensi menjadi fondasi bagi berbagai use case seperti digital identity, ownership data, hingga sistem voting yang transparan. Meski adopsinya masih bertahap, developer yang memahami konsep ini sejak awal akan memiliki keunggulan dalam membangun produk generasi berikutnya."
    ],
    "date": "06 Apr 2026",
    "category": "Tech & Opinion",
    "readingTime": "4 menit"
  },
  {
    slug: "ai-driven-development",
    title: "Evolusi Workflow: Integrasi AI Agent dalam Fullstack Development",
    excerpt:
      "Bagaimana pemanfaatan AI seperti Cursor, Copilot, dan Agentic Workflow mengubah total kecepatan shipping produk digital ke production.",
    content: [
      "Beberapa bulan terakhir, peran Artificial Intelligence di ranah software engineering bergeser sangat masif. AI tak lagi sebatas menebak sintaks auto-complete, melainkan sudah berevolusi menjadi partner pair-programming (AI Agent) yang cerdas.",
      "Dalam eksperimen di beberapa project freelance, saya memasukkan pendekatan 'AI-Driven Development' menggunakan berbagai tools mutakhir. Mulai dari boilerplating backend NestJS yang lebih efisien, deteksi bug lintas file yang jauh lebih akurat, sampai refactoring legacy code jadi code yang lebih clean dan scalable.",
      "Peran developer mulai bergeser dari sekadar 'mengetik kode' ke arah 'system designer/director'. Kemampuan memberi prompting dan review logic yang solid justru menjadi jauh lebih krusial. Kombinasi insting kita sebagai engineer ditambah kecepatan asisten AI menghasilkan delivery time luar biasa yang hemat hingga 40%."
    ],
    date: "02 Apr 2026",
    category: "Tech & Opinion",
    readingTime: "3 menit",
  },
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
