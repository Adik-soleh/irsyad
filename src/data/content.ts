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
  },
  {
    title: "Sistem Absensi Sekolah Dashboard",
    description:
      "Platform manajemen absensi digital berbasis web dengan arsitektur multi-tenant, QR Code scanner, dan Role-Based Access Control (RBAC) untuk efisiensi pengelolaan kehadiran di berbagai sekolah.",
    tags: ["React", "NestJS", "PostgreSQL", "Prisma"],
    year: "2024",
    link: "https://absensi-app-xeoc.vercel.app",
    cover: images.projects.absensi,
    problem: "Pencatatan kehadiran manual yang tidak efisien, sulitnya monitoring data secara real-time, serta kebutuhan akan sistem yang mampu mengelola banyak sekolah dalam satu platform dengan data yang terisolasi.",
    uiSolution: "Membangun dashboard Single Page Application (SPA) yang responsif menggunakan React (Vite) dan Tailwind CSS, menghadirkan fitur QR Code Scanner untuk presensi instan serta visualisasi statistik kehadiran yang informatif.",
    systemSolution: "Mengimplementasikan arsitektur Multi-Tenant dengan framework NestJS dan Prisma ORM pada database PostgreSQL, yang memastikan isolasi data antar sekolah serta keamanan akses menggunakan sistem autentikasi JWT.",
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
    slug: "modern-framework-2026-meta-framework-era",
    title: "Framework 2026: Era Meta-Framework, Fullstack Gak Pake Ribet!",
    excerpt:
      "Framework jaman sekarang udah bukan cuma tools doang — udah kayak ekosistem lengkap yang nyatuin frontend, backend, sampe deployment dalam satu stack. Gila sih.",
    content: [
      "Tahun 2026 ini, dunia framework berubah drastis banget. Developer udah gak perlu lagi rakit stack dari nol. Sekarang tinggal pake meta-framework yang udah nyediain semuanya: routing, data fetching, API, sampe deployment — semua dalam satu paket. Enak banget kan?",
      "Next.js sama Nuxt sekarang udah jadi standar baru buat bikin web modern. Dua-duanya support hybrid rendering (SSR, SSG, CSR) sekaligus, jadi kita bisa pilih strategi rendering sesuka hati tanpa harus ganti-ganti tools.",
      "Terus muncul juga framework baru kayak SvelteKit sama Qwik yang fokusnya di performa ekstrem. Pake pendekatan compile-time dan lazy loading granular, aplikasi jadi super ringan dan ngebut bahkan di jaringan yang lemot sekalipun.",
      "Di sisi backend, NestJS makin nge-hype karena arsitekturnya modular dan full TypeScript. Jadinya developer bisa bangun sistem yang scalable dengan struktur yang rapi dan gampang di-maintain.",
      "Tren gede lainnya itu edge runtime. Banyak framework sekarang by default jalan di edge (kayak Vercel Edge atau Cloudflare Workers), jadi latency bisa ditekan abis dan performa naik drastis.",
      "Intinya, framework modern itu udah bukan sekadar library UI lagi — udah jadi semacam 'operating system' buat web app. Kita tinggal fokus ke logic bisnis aja, urusan infra biar framework yang handle. Auto chill."
    ],
    date: "07 Apr 2026",
    category: "Tech Stack",
    readingTime: "4 menit",
  },
  {
    slug: "web3-beyond-crypto-infrastructure",
    title: "Web3 Itu Bukan Cuma Crypto Doang, Bro",
    excerpt:
      "Web3 udah berkembang jauh banget dari sekadar crypto. Sekarang fokusnya ke desentralisasi data, identitas digital, dan arsitektur app tanpa bos tunggal.",
    content: [
      "Selama ini Web3 sering banget dikaitinnya cuma sama cryptocurrency dan trading aset digital. Padahal inti dari Web3 itu desentralisasi — ngilangin ketergantungan sama satu pihak yang pegang semua data dan sistem.",
      "Teknologi kayak blockchain, smart contract, dan decentralized storage bikin developer bisa bangun aplikasi yang transparan, trustless, dan lebih tahan banting dari single point of failure. Contohnya pake IPFS buat nyimpen file dan smart contract buat ngatur logic bisnis otomatis tanpa backend tradisional. Keren sih konsepnya.",
      "Buat developer, Web3 ini bawa paradigma baru. Kalo biasanya kita pake REST API, di sini kita langsung interaksi sama blockchain lewat RPC atau SDK tertentu. Butuh pemahaman ekstra soal wallet integration, gas fee, dan keamanan smart contract.",
      "Tapi tantangan paling gede Web3 sekarang itu bukan di teknologinya — lebih ke user experience-nya. Proses kayak wallet connection, signing transaction, handling network itu masih ribet banget buat user awam. Nah di sinilah peran kita sebagai developer penting banget buat nyederhain semua itu.",
      "Ke depannya, Web3 punya potensi jadi fondasi buat banyak hal — digital identity, ownership data, sampe sistem voting yang transparan. Emang adopsinya masih pelan-pelan, tapi developer yang udah paham dari sekarang bakal punya advantage gede buat bikin produk generasi selanjutnya."
    ],
    date: "06 Apr 2026",
    category: "Tech & Opinion",
    readingTime: "4 menit",
  },
  {
    slug: "ai-driven-development",
    title: "AI Sekarang Jadi Temen Ngoding, Bukan Cuma Auto-Complete",
    excerpt:
      "Gimana AI kayak Cursor, Copilot, dan Agentic Workflow literally ngubah kecepatan shipping produk ke production. Spoiler: hemat waktu gila-gilaan.",
    content: [
      "Beberapa bulan terakhir ini, peran AI di dunia software engineering bergeser masif banget. AI udah bukan sekadar nebak-nebak sintaks auto-complete lagi — sekarang udah jadi partner pair-programming alias AI Agent yang beneran pinter.",
      "Di beberapa project freelance, gue coba masukin pendekatan 'AI-Driven Development' pake berbagai tools canggih. Mulai dari boilerplating backend NestJS yang jauh lebih cepet, deteksi bug lintas file yang akurasinya ngeri, sampe refactoring legacy code jadi lebih clean dan scalable. Literally game changer.",
      "Peran developer sekarang mulai bergeser dari 'ngetik kode' ke arah 'system designer/director'. Skill prompting dan review logic yang solid justru jadi jauh lebih penting. Kombinasi insting kita sebagai engineer plus kecepatan AI bikin delivery time bisa hemat sampe 40%. Gokil sih."
    ],
    date: "02 Apr 2026",
    category: "Tech & Opinion",
    readingTime: "3 menit",
  },
  {
    slug: "ehrm-docker-rollout",
    title: "Akhirnya E-HRM PUPR Naik Docker, Auto Stabil!",
    excerpt:
      "Service NestJS sama Vue udah di-wrap ke Docker + Redis. Dashboard pegawai kementerian jadi jauh lebih stabil dan gak drama lagi pas deploy.",
    content: [
      "Minggu ini kita berhasil deploy versi containerized dari E-HRM. NestJS API, worker queue, sama front-end Vue sekarang jalan di cluster Docker yang sama — proses rilis jadi jauh lebih predictable dan gak bikin deg-degan lagi.",
      "Redis dipake buat caching data pegawai yang sering diakses. Latency pencarian turun dari 1.2 detik jadi 320 ms — lumayan signifikan buat pengguna internal yang buka ratusan record per jam. Mereka happy, kita juga happy.",
      "Sekarang lagi nyusun playbook scaling biar tim infra PUPR bisa handle sendiri kalo traffic lagi peak pas periode audit tahunan. Biar gak harus standby 24/7 terus haha."
    ],
    date: "18 Nov 2024",
    category: "Build log",
    readingTime: "4 menit",
  },
  {
    slug: "lakoe-midtrans-checkout",
    title: "Lakoe Store Akhirnya Bisa Terima Pembayaran Beneran!",
    excerpt:
      "Integrasi Midtrans sama Biteship kelar — checkout di React + Express udah jalan end-to-end. Gak pake dummy lagi!",
    content: [
      "Lakoe Store awalnya cuma support pembayaran dummy doang. Setelah nambahin Midtrans Snap API, order sekarang bisa langsung diverifikasi lewat webhook Express. Finally, pembayaran beneran!",
      "Gue pasangin juga Prisma buat nge-record status pembayaran per transaksi, plus sinkron sama Biteship biar label pengiriman otomatis muncul di dashboard admin. Satu flow, semua ke-handle.",
      "Testing regresi pake Vitest + Thunder Client collection, jadi setiap rilis tetap aman walaupun timnya kecil. Quality tetap nomor satu lah."
    ],
    date: "05 Nov 2024",
    category: "Release",
    readingTime: "3 menit",
  },
  {
    slug: "circle-realtime-update",
    title: "Circle App Sekarang Bisa Komentar Realtime, Cuy!",
    excerpt:
      "Nambahin channel komentar live pake Socket.IO biar komunitas mini-nya kerasa lebih hidup dan responsif.",
    content: [
      "Circle App sekarang udah support komentar real-time! Socket.IO jalan di Express server dan pake namespace berbeda buat feed publik. Jadi semua komentar langsung muncul tanpa harus refresh.",
      "Buat keamanan, setiap koneksi di-validasi pake JWT yang dikeluarin API. Payload-nya disimpen di PostgreSQL lewat Prisma biar data tetep konsisten. Aman terkendali.",
      "Hasilnya? Durasi percakapan di cohort privat naik karena notifikasi dateng detik itu juga — bukan lagi polling tiap 30 detik. User-nya langsung kerasa bedanya, mantap."
    ],
    date: "24 Okt 2024",
    category: "Feature",
    readingTime: "3 menit",
  },
  {
    slug: "skybook-filament-handover",
    title: "SkyBook Admin Siap Diserahin ke Tim Ops!",
    excerpt:
      "CMS Laravel + Filament udah dilengkapin dokumentasi deployment biar tim ops bisa jalan sendiri tanpa harus nanya-nanya lagi.",
    content: [
      "SkyBook Admin sekarang punya modul pelacakan booking baru. Filament bikin pembuatan form dinamis buat jadwal penerbangan jadi gampang banget — drag, config, done.",
      "Gue tambahin juga Sanctum guard khusus admin biar akses antar role bisa dipisah tanpa harus nulis ulang middleware. Clean dan efisien.",
      "Dokumentasi deployment di XAMPP + MySQL udah beres, termasuk skrip seed biar tim ops bisa isi data awal cukup satu kali jalan. Tinggal serahin, auto jalan. Bye-bye hand-holding!"
    ],
    date: "10 Okt 2024",
    category: "Ops note",
    readingTime: "4 menit",
  },
];

export function getNewsEntry(slug: string) {
  return newsEntries.find((entry) => entry.slug === slug);
}
