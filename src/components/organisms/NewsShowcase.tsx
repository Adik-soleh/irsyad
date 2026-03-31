import { NewsCard } from "@/components/molecules/NewsCard";
import { NewsEntry } from "@/types/content";

export function NewsShowcase({ entries }: { entries: NewsEntry[] }) {
  return (
    <section id="news" className="space-y-12 pt-10">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 mb-4">
          Daily Notes
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
          News & Catatan Harian
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Rangkuman pendek tentang eksperimen, micro-essay, dan insight yang saya tulis setiap hari.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, idx) => (
          <NewsCard key={entry.slug} entry={entry} index={idx} />
        ))}
      </div>
    </section>
  );
}
