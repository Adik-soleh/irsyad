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
  Tool,
  Work,
} from "@/types/content";
import { images } from "@/constants/images";

const WHATSAPP_NUMBER = "628111118355";
const WHATSAPP_MESSAGE =
  "Halo Irsyad, saya tertarik untuk diskusi mengenai kerja sama digital marketing.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
export const EMAIL = "irsyad.rafly.wahyudi@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/irsyad-rafly-1509932b5";

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Karya", href: "#work" },
  { label: "Karier", href: "#experience" },
  { label: "Insight", href: "#insights" },
  { label: "Kontak", href: "#contact" },
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
    helper: "72.4K organik · 38.2K ads",
    countTo: 110.7,
    suffix: "K",
    decimals: 1,
  },
  {
    value: "94.6K",
    label: "Accounts reached",
    helper: "naik 2.4x dari periode sebelumnya",
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
    helper: "1.608 klik dari kampanye berbayar",
    countTo: 1.6,
    suffix: "K",
    decimals: 1,
  },
];

export const heroContent: HeroContent = {
  greeting: "Portfolio",
  name: "Irsyad Rafly Wahyudi",
  tagline: "Digital Marketing Specialist",
  headline: "Kampanye yang Dibaca Data, Bukan Tebakan",
  summary:
    "Digital Marketing Specialist dengan pengalaman kuat di social media management, paid advertising, dan content strategy. Merancang kampanye kreatif untuk mendorong brand awareness, engagement audiens, dan pertumbuhan bisnis yang terukur.",
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
    label: "Lihat Karya",
    href: "#work",
  },
  secondaryCta: {
    label: "Hubungi Saya",
    href: "#contact",
  },
  cvCta: {
    label: "Download Portfolio",
    href: "/api/cv",
  },
};

export const skillCategories: SkillCategory[] = [
  {
    title: "MARKETING & PERFORMANCE",
    skills: [
      "Meta for Business",
      "Google Ads",
      "Campaign Optimization",
      "Audience Targeting",
      "Content Strategy",
      "Analytics & Reporting",
    ],
  },
  {
    title: "CREATIVE & COMMUNICATION",
    skills: [
      "Canva",
      "Adobe Creative Suite",
      "Figma",
      "Copywriting",
      "Corporate Communication",
      "Media Relations",
    ],
  },
];

export const tools: Tool[] = [
  { name: "Meta Business Suite" },
  { name: "Instagram Insights" },
  { name: "Google Ads" },
  { name: "Canva" },
  { name: "Adobe Photoshop" },
  { name: "Adobe Illustrator" },
  { name: "Adobe Premiere Pro" },
  { name: "Figma" },
  { name: "Content Calendar" },
];

export const capabilities: Capability[] = [
  {
    title: "Performance Marketing Analyst",
    description: "Menganalisis data marketing, algoritma iklan, dan tren konsumen.",
  },
  {
    title: "Digital Advertising Specialist",
    description: "Mengelola dan mengoptimasi paid ads lewat Meta for Business.",
  },
  {
    title: "Social Media Strategist",
    description: "Menyusun strategi konten dan iklan untuk mendorong brand awareness.",
  },
  {
    title: "Media Relations",
    description: "Mengelola komunikasi media untuk memperkuat reputasi brand.",
  },
  {
    title: "Corporate Communication",
    description: "Membuat company profile — booklet, PPT, looping video, dan profile video.",
  },
  {
    title: "Corporate Content Creator",
    description: "Memproduksi feed post dan reels Instagram untuk menggaet audiens.",
  },
  {
    title: "Graphic Designer",
    description: "Mendesain banner, brosur, poster, dan sertifikat.",
  },
  {
    title: "Business Development",
    description: "Mendukung kemitraan strategis untuk mendorong pertumbuhan bisnis.",
  },
];

export const works: Work[] = [
  {
    title: "Performance Marketing Analyst",
    shortTitle: "Performance Analyst",
    description:
      "Membaca data kampanye digital untuk mengukur performa, menemukan peluang optimasi, lalu mendorong reach, engagement, dan konversi.",
    tags: ["Meta Business Suite", "Instagram Insights", "Reporting"],
    year: "2024 — 2026",
    cover: images.work.performance,
    challenge:
      "Aktivitas konten dan iklan berjalan tanpa pembacaan data yang konsisten, sehingga sulit menilai kanal mana yang benar-benar menghasilkan.",
    approach:
      "Menyusun pelacakan rutin di Meta Business Suite dan Instagram Insights — memisahkan performa organik dan berbayar, lalu membandingkan tren views, reach, dan interaksi antar periode.",
    impact:
      "Total 110.736 views dalam satu periode pelaporan: 72.460 dari organik dan 38.276 dari ads, dengan reach 94.595 (naik 2,4x) dan 2.026 content interactions.",
    spec: {
      objective: "Ukur performa kampanye dan temukan peluang optimasi",
      audience: "Manajemen dan stakeholder internal",
      channel: "Meta Business Suite · Instagram Insights",
      format: "Laporan performa berkala",
      result: "110.736 views · reach 94.595 · 2.026 interaksi",
    },
    note:
      "Dengan memisahkan performa organik dan berbayar sejak awal, terlihat bahwa dari total 110.736 views, 72.460 datang dari organik dan 38.276 dari ads — dasar yang dipakai untuk memutuskan alokasi berikutnya.",
  },
  {
    title: "Digital Advertising Specialist (Meta Ads)",
    shortTitle: "Meta Ads",
    description:
      "Mengelola dan mengoptimasi kampanye berbayar di Meta for Business dengan strategi berbasis data agar setiap rupiah budget bekerja maksimal.",
    tags: ["Meta Ads", "Budget Optimization", "A/B Testing"],
    year: "2024 — 2026",
    cover: images.work.metaAds,
    challenge:
      "Budget iklan terbatas, sementara target audiens untuk layanan sertifikasi ISO sangat spesifik dan tidak bisa disasar secara umum.",
    approach:
      "Menjalankan boosted post dan campaign terjadwal dengan pengujian materi kreatif, lalu memangkas iklan berperforma rendah dan menambah budget ke set iklan dengan biaya per hasil terbaik.",
    impact:
      "Impressions 110.9K (naik 421,7%), reach 69.402 (naik 379,7%), 1.608 link clicks, dengan biaya per kampanye terjaga di kisaran Rp130 ribu – Rp330 ribu.",
    spec: {
      objective: "Naikkan reach dan link clicks dengan budget terbatas",
      audience: "Pelaku bisnis yang mencari sertifikasi ISO",
      channel: "Meta Ads — Instagram & Facebook",
      format: "Boosted post · campaign terjadwal",
      result: "Impressions 110.9K (+421,7%) · 1.608 link clicks",
    },
    note:
      "Materi kreatif diuji berpasangan, lalu iklan dengan biaya per hasil tertinggi dihentikan dan anggarannya dialihkan ke set yang sudah terbukti.",
  },
  {
    title: "Social Media Strategist",
    shortTitle: "Social Strategy",
    description:
      "Merancang dan mengelola strategi konten lintas platform: content calendar terstruktur, perencanaan berbasis tren, serta optimasi waktu dan format posting.",
    tags: ["Content Calendar", "Instagram", "Facebook"],
    year: "2024 — 2026",
    cover: images.work.social,
    challenge:
      "Posting berjalan sporadis tanpa kalender, sehingga frekuensi tidak stabil dan momentum audiens gampang hilang.",
    approach:
      "Membangun content calendar bulanan yang memetakan tema, format, dan jam tayang per platform — lalu menyesuaikan slot posting berdasarkan jam aktif audiens dan tren yang sedang berjalan.",
    impact:
      "Ritme publikasi konsisten setiap minggu di Instagram dan Facebook, dengan content interactions naik 100% dibanding periode sebelumnya.",
    spec: {
      objective: "Jaga konsistensi publikasi dan naikkan engagement",
      audience: "Followers Instagram dan Facebook brand",
      channel: "Instagram · Facebook",
      format: "Content calendar bulanan",
      result: "Content interactions naik 100%",
    },
    note:
      "Jumlah slot per minggu ditentukan lebih dulu dari kapasitas tim, baru temanya diisi. Jam tayang diambil dari jam aktif audiens di Insights, bukan ditebak.",
  },
  {
    title: "Corporate Communication Materials",
    shortTitle: "Corporate Comms",
    description:
      "Mengelola dan mengembangkan materi komunikasi korporat: annual report, company profile, dan presentasi perusahaan dengan konsistensi brand yang terjaga.",
    tags: ["Annual Report", "Company Profile", "Presentation"],
    year: "2024 — 2026",
    cover: images.work.corporateComm,
    challenge:
      "Materi korporat tersebar dalam berbagai gaya visual, membuat identitas perusahaan terbaca tidak konsisten di mata stakeholder.",
    approach:
      "Menyusun ulang company profile (booklet, PPT, looping video, dan profile video) serta annual report dengan sistem visual dan tata pesan yang seragam.",
    impact:
      "Satu set materi korporat yang siap pakai untuk kebutuhan klien, mitra, dan presentasi internal — dengan brand consistency yang terjaga di setiap format.",
    spec: {
      objective: "Samakan identitas visual seluruh materi korporat",
      audience: "Klien, mitra, dan stakeholder internal",
      channel: "Cetak dan presentasi",
      format: "Company profile · annual report · profile video",
      result: "Satu set materi korporat siap pakai",
    },
    note:
      "Company profile disusun ulang sebagai satu paket — booklet, PPT, looping video, dan profile video — dengan sistem visual dan tata pesan yang seragam.",
  },
  {
    title: "Corporate Content Creator",
    shortTitle: "Content Creator",
    description:
      "Merancang, mengelola, dan mempublikasikan konten digital perusahaan — dari feed post edukatif hingga reels yang mengangkat momen dan isu terkini.",
    tags: ["Feed Post", "Reels", "Copywriting"],
    year: "2024 — 2026",
    cover: images.work.content,
    challenge:
      "Topik sertifikasi dan standar mutu terasa teknis dan berat, sehingga sulit menarik perhatian audiens di feed sosial media.",
    approach:
      "Menerjemahkan topik teknis menjadi konten yang mudah dicerna — carousel edukatif, reels bertema momen nasional, dan caption dengan hook yang memancing diskusi.",
    impact:
      "Satu unggahan menembus 33.128 views dengan 16.446 reach dan 268 interaksi, jauh di atas rata-rata post reguler.",
    spec: {
      objective: "Bikin topik teknis mudah dicerna di feed",
      audience: "Audiens umum dan calon klien",
      channel: "Instagram feed & reels",
      format: "Carousel · reels · caption",
      result: "33.128 views · 16.446 reach · 268 interaksi",
    },
    note:
      "Konten dibuka dari kekhawatiran yang sudah ada di kepala audiens — reputasi, biaya, proses — dan standar teknisnya masuk sebagai jawaban, bukan sebagai pembuka.",
  },
  {
    title: "Graphic Designer",
    shortTitle: "Graphic Design",
    description:
      "Membuat beragam materi desain: sertifikat, brosur, banner, poster promosi, dan aset visual untuk kebutuhan korporat maupun acara resmi.",
    tags: ["Canva", "Adobe Creative Suite", "Print & Digital"],
    year: "2023 — 2026",
    cover: images.work.graphic,
    challenge:
      "Kebutuhan desain datang dari banyak divisi sekaligus, dengan format yang berbeda-beda antara cetak dan digital.",
    approach:
      "Menyiapkan template dan sistem desain yang bisa dipakai ulang untuk sertifikat, roll banner, brosur, dan voucher promosi, sehingga produksi cepat tanpa mengorbankan konsistensi.",
    impact:
      "Materi visual untuk sertifikasi, pelatihan, dan event resmi diproduksi dengan identitas brand yang seragam di seluruh kanal.",
    spec: {
      objective: "Penuhi kebutuhan desain lintas divisi tanpa antre",
      audience: "Peserta pelatihan, klien, dan tamu event",
      channel: "Cetak dan digital",
      format: "Sertifikat · roll banner · brosur · voucher",
      result: "Identitas brand seragam di seluruh materi",
    },
    note:
      "Permintaan datang dari banyak divisi dengan format berbeda-beda. Template yang bisa dipakai ulang disiapkan lebih dulu, sehingga produksi cepat tanpa mengorbankan konsistensi.",
  },
];

export const experiences: Experience[] = [
  {
    title: "Corporate Communications & Brand Management",
    company: "—",
    period: "Jan 2026 — Jun 2026",
    description:
      "Mengelola komunikasi korporat dan brand management: menjaga konsistensi pesan, memproduksi materi komunikasi, dan mendukung hubungan dengan media.",
    skills: ["Brand Management", "Corporate Communication", "Media Relations"],
  },
  {
    title: "Digital Marketing — Social Media Management",
    company: "PT MSA Certification",
    period: "Nov 2024 — Mar 2026",
    description:
      "Mengelola seluruh kanal sosial media perusahaan: strategi konten, produksi feed dan reels, kampanye Meta Ads, hingga pelaporan performa bulanan.",
    skills: ["Meta Ads", "Content Strategy", "Analytics", "Copywriting"],
  },
  {
    title: "Digital Marketing — Social Media Management",
    company: "PT Mutu International Tbk.",
    period: "May 2024 — Feb 2025",
    description:
      "Menjalankan pengelolaan sosial media dan produksi konten digital untuk mendukung brand awareness perusahaan.",
    skills: ["Social Media", "Content Production", "Design"],
  },
  {
    title: "Scriptwriter — Cinematography Podcast",
    company: "Podcast CCIT FTUI, Universitas Indonesia",
    period: "Nov 2023 — Jan 2024",
    description:
      "Menulis naskah dan menyusun alur episode podcast bertema sinematografi untuk kanal resmi CCIT FTUI.",
    skills: ["Scriptwriting", "Storytelling", "Podcast"],
  },
  {
    title: "Event Division",
    company: "Convocation CCIT FTUI, Universitas Indonesia",
    period: "Oct 2023 — Nov 2023",
    description:
      "Bagian dari divisi acara untuk penyelenggaraan wisuda CCIT FTUI, menangani perencanaan dan eksekusi di hari pelaksanaan.",
    skills: ["Event Management", "Koordinasi Tim"],
  },
  {
    title: "Design and Documentation",
    company: "Induction Days CCIT FTUI, Universitas Indonesia",
    period: "Jul 2023 — Sep 2023",
    description:
      "Menangani kebutuhan desain dan dokumentasi visual untuk rangkaian acara induction days mahasiswa baru.",
    skills: ["Graphic Design", "Dokumentasi"],
  },
];

export const educations: Education[] = [
  {
    school: "Asia e University Malaysia",
    degree: "Bachelor of Information and Communication Technology",
    period: "2022 — Present",
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
    title: "Membaca Angka Dulu, Baru Tambah Budget",
    excerpt:
      "Kenaikan impressions 421% bukan datang dari budget yang dibesarkan, tapi dari memutuskan iklan mana yang layak dilanjutkan.",
    content: [
      "Godaan paling umum saat sebuah kampanye mulai menunjukkan hasil adalah langsung menaikkan budget. Padahal yang perlu dilihat lebih dulu adalah dari mana hasil itu datang: set iklan mana yang biayanya paling efisien per hasil, dan mana yang sebenarnya hanya menghabiskan anggaran.",
      "Dalam satu periode pengelolaan, saya memisahkan performa organik dan berbayar sejak awal. Dari total 110.736 views, 72.460 datang dari organik dan 38.276 dari ads. Pemisahan sederhana ini penting: tanpa itu, kita gampang mengira iklan bekerja padahal yang naik adalah konten organik, atau sebaliknya.",
      "Setelah pola terbaca, langkahnya jadi lebih jelas — hentikan materi yang biaya per klik-nya jauh di atas rata-rata, lalu alihkan anggarannya ke kreatif yang sudah terbukti. Hasilnya impressions naik 421,7% dan reach naik 379,7%, dengan struktur biaya yang tetap terkendali.",
      "Intinya: data bukan laporan yang dibuat di akhir bulan untuk formalitas. Data adalah dasar keputusan mingguan.",
    ],
    date: "12 Mar 2026",
    category: "Paid Ads",
    readingTime: "3 menit",
  },
  {
    slug: "content-calendar-yang-benar-benar-dipakai",
    title: "Content Calendar yang Benar-Benar Dipakai",
    excerpt:
      "Kalender konten gagal bukan karena kurang rapi, tapi karena dibuat tanpa memikirkan siapa yang mengeksekusinya.",
    content: [
      "Banyak brand punya content calendar, tapi berhenti dipakai di minggu ketiga. Penyebabnya jarang soal template — biasanya karena kalender itu disusun terlalu ambisius untuk kapasitas tim yang ada.",
      "Pendekatan yang saya pakai: tentukan dulu jumlah slot realistis per minggu, baru isi temanya. Bukan sebaliknya. Setiap slot punya tiga informasi minimum — format (feed, carousel, atau reels), tema, dan jam tayang. Sisanya menyusul saat produksi.",
      "Jam tayang tidak ditebak. Diambil dari jam aktif audiens di Insights, lalu diuji beberapa minggu. Kalau satu slot konsisten berperforma rendah, slot itu dipindah, bukan kontennya yang disalahkan.",
      "Dengan ritme yang bisa dijaga, frekuensi posting jadi stabil dan interaksi konten naik 100% dibanding periode sebelumnya — tanpa menambah orang di tim.",
    ],
    date: "28 Feb 2026",
    category: "Content Strategy",
    readingTime: "3 menit",
  },
  {
    slug: "menjual-topik-teknis-di-media-sosial",
    title: "Cara Menjual Topik Teknis di Media Sosial",
    excerpt:
      "Sertifikasi ISO bukan topik yang menghentikan scroll. Kecuali cara menyampaikannya diubah.",
    content: [
      "Standar mutu, audit, dan sertifikasi adalah topik yang penting bagi bisnis tapi terdengar berat di feed sosial media. Konten yang menjelaskan klausul apa adanya hampir pasti dilewati.",
      "Yang berhasil justru konten yang berangkat dari pertanyaan yang sudah ada di kepala audiens — kekhawatiran soal reputasi, biaya, atau proses yang dianggap ribet. Standar teknisnya tetap disampaikan, tapi masuk sebagai jawaban, bukan sebagai pembuka.",
      "Format juga menentukan. Carousel cocok untuk penjelasan bertahap, sementara reels lebih kuat untuk mengangkat momen dan isu yang sedang ramai. Satu unggahan dengan pendekatan ini menembus 33.128 views, 16.446 reach, dan 268 interaksi — jauh di atas rata-rata post reguler.",
      "Topik teknis tidak perlu disederhanakan sampai kehilangan isi. Yang perlu diubah adalah urutan penyampaiannya.",
    ],
    date: "14 Feb 2026",
    category: "Social Media",
    readingTime: "3 menit",
  },
];

export function getNewsEntry(slug: string) {
  return newsEntries.find((entry) => entry.slug === slug);
}
