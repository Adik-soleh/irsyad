import Link from "next/link";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { NewsCard } from "@/components/molecules/NewsCard";
import { NewsEntry } from "@/types/content";

export function NewsShowcase({ entries }: { entries: NewsEntry[] }) {
  const marqueeItems = [...entries, ...entries];

  return (
    <section id="news" className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Daily notes"
          title="News & catatan harian"
          description="Rangkuman pendek tentang eksperimen, micro-essay, dan insight yang saya tulis setiap hari."
        />
        <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
          Klik untuk detail ↗
        </span>
      </div>
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-indigo-700/70 via-slate-900 to-slate-950 p-8 text-white shadow-[0_25px_80px_rgba(7,12,34,0.7)]">
        <span className="pointer-events-none absolute right-8 top-6 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold text-white/80 backdrop-blur">
          Klik kartu news untuk lihat detail
        </span>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent" />
        <div className="marquee" aria-hidden>
          <div className="marquee-track">
            {marqueeItems.map((entry, index) => (
              <NewsCard key={`${entry.slug}-${index}`} entry={entry} />
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 text-slate-200 md:grid-cols-2">
          {entries.slice(0, 2).map((entry) => (
            <Link
              key={entry.slug}
              href={`/news/${entry.slug}`}
              className="rounded-2xl border border-white/5 bg-white/5 p-5 text-sm text-white/80 transition-transform hover:-translate-y-1"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {entry.category}
              </p>
              <h4 className="mt-2 text-xl font-semibold text-white">
                {entry.title}
              </h4>
              <p className="mt-2 text-sm text-white/70">{entry.excerpt}</p>
              <p className="mt-4 text-xs text-white/70">
                {entry.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
