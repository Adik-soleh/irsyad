import { NewsCard } from "@/components/molecules/NewsCard";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { NewsEntry } from "@/types/content";

export function NewsShowcase({ entries }: { entries: NewsEntry[] }) {
  return (
    <section id="insights" className="space-y-12 pt-10">
      <SectionHeading
        align="center"
        eyebrow="Insight"
        title="Catatan dari Lapangan"
        description="Hal-hal yang saya pelajari saat mengelola kampanye, menyusun konten, dan membaca laporan performa."
        className="mx-auto max-w-2xl"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry, idx) => (
          <NewsCard key={entry.slug} entry={entry} index={idx} />
        ))}
      </div>
    </section>
  );
}
