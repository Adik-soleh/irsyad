import Link from "next/link";
import { NewsEntry } from "@/types/content";

export function NewsCard({ entry }: { entry: NewsEntry }) {
  return (
    <Link
      href={`/news/${entry.slug}`}
      className="flex min-w-[280px] flex-1 flex-col justify-between rounded-2xl border border-white/10 bg-white/10 p-5 text-white shadow-lg shadow-slate-900/40 backdrop-blur transition-transform hover:-translate-y-1"
    >
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-white/70">
          {entry.category}
        </p>
        <h4 className="text-lg font-semibold leading-tight">{entry.title}</h4>
        <p className="text-sm text-white/80">{entry.excerpt}</p>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-white/70">
        <span>{entry.date}</span>
      </div>
    </Link>
  );
}
