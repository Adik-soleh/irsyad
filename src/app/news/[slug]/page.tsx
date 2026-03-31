import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/atoms/Button";
import { getNewsEntry, newsEntries } from "@/data/content";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getNewsEntry(slug);

  if (!entry) {
    return {
      title: "Adi News",
      description: "Catatan harian Adi tentang eksperimen produk dan proses shipping.",
    };
  }

  return {
    title: `${entry.title} — Adi News`,
    description: entry.excerpt,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getNewsEntry(slug);

  if (!entry) {
    redirect("/#news");
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <Link
          href="/#news"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-white/70 transition hover:text-black dark:hover:text-white font-medium"
        >
          <span aria-hidden>←</span> Kembali ke news
        </Link>

        <article className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-[#060606] p-8 sm:p-10 shadow-xl dark:shadow-[0_20px_60px_rgba(255,255,255,0.02)]">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 opacity-90">
              {entry.category} · {entry.date}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-slate-900 dark:text-white">
              {entry.title}
            </h1>
            <p className="text-lg text-slate-600 dark:text-white/80">{entry.excerpt}</p>
          </div>

          <div className="mt-10 space-y-6 text-base text-slate-700 dark:text-slate-100">
            {entry.content.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-slate-700 dark:text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-slate-200 dark:border-white/10 pt-8 sm:flex-row flex-col items-start sm:items-center">
            <p className="font-medium text-slate-800 dark:text-white/80">Butuh bantuan membangun sistem serupa?</p>
            <Button href="/#contact" variant="primary">
              Diskusikan Project
            </Button>
          </div>
        </article>

        <div className="space-y-6 mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-white/50">
            Artikel lainnya
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {newsEntries
              .filter((item) => item.slug !== entry.slug)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-black/40 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 opacity-90">
                    {item.category}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white group-hover:underline transition-colors">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 dark:text-white/70 line-clamp-2">{item.excerpt}</p>
                  {/* <p className="mt-6 text-xs font-medium text-slate-400 dark:text-white/50">
                    {item.date} · {item.readingTime}
                  </p> */}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
