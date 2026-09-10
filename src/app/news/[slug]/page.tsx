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

const siteUrl = "https://irsyadportfolio.vercel.app";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getNewsEntry(slug);

  if (!entry) {
    return {
      title: "Insight",
      description: "Catatan Irsyad Rafly tentang kampanye digital, konten, dan performa iklan.",
    };
  }

  const pageTitle = `${entry.title} — Insight`;
  const pageUrl = `${siteUrl}/news/${entry.slug}`;

  return {
    title: pageTitle,
    description: entry.excerpt,
    openGraph: {
      title: pageTitle,
      description: entry.excerpt,
      url: pageUrl,
      siteName: "Irsyad Rafly Portfolio",
      type: "article",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: entry.excerpt,
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getNewsEntry(slug);

  if (!entry) {
    redirect("/#insights");
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <Link
          href="/#insights"
          className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-black font-medium"
        >
          <span aria-hidden>←</span> Kembali ke insight
        </Link>

        <article className="rounded-[32px] border border-slate-200 bg-white p-8 sm:p-10 shadow-xl">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 opacity-90">
              {entry.category} · {entry.date}
            </p>
            <h1 className="font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
              {entry.title}
            </h1>
            <p className="text-lg text-slate-600">{entry.excerpt}</p>
          </div>

          <div className="mt-10 space-y-6 text-base text-slate-700">
            {entry.content.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
            <p className="font-medium text-slate-800">Punya kebutuhan kampanye serupa?</p>
            <Button href="/#contact" variant="primary">
              Diskusikan Kebutuhan
            </Button>
          </div>
        </article>

        <div className="space-y-6 mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
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
                  className="group rounded-[24px] border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 opacity-90">
                    {item.category}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:underline transition-colors">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 line-clamp-2">{item.excerpt}</p>
                  {/* <p className="mt-6 text-xs font-medium text-slate-400">
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
