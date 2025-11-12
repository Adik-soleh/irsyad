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
    <div className="min-h-screen bg-slate-950 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <Link
          href="/#news"
          className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <span aria-hidden>←</span> Kembali ke news
        </Link>

        <article className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#081b32] via-[#071427] to-[#050b18] p-10 shadow-[0_30px_90px_rgba(6,10,25,0.8)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              {entry.category} · {entry.date}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-white">
              {entry.title}
            </h1>
            <p className="text-base text-white/80">{entry.excerpt}</p>
          </div>

          <div className="mt-10 space-y-6 text-base text-slate-100">
            {entry.content.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/70">
            <p>Butuh bantuan membangun hal serupa?</p>
            <Button href="/#contact" variant="secondary">
              Diskusikan project
            </Button>
          </div>
        </article>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
            Artikel lainnya
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {newsEntries
              .filter((item) => item.slug !== entry.slug)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 transition hover:-translate-y-1"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-white/70">{item.excerpt}</p>
                  <p className="mt-4 text-xs text-white/50">
                    {item.date}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
