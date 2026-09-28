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
      description: "Irsyad Rafly’s notes on digital campaigns, content, and ad performance.",
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
      locale: "en_US",
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
    redirect("/");
  }

  return (
    <div className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          <span aria-hidden>←</span> Back to home
        </Link>

        <article>
          <div className="space-y-6">
            <p className="text-sm text-ash">
              {entry.category} · {entry.date}
            </p>
            <h1 className="font-display text-[44px] text-ink sm:text-[64px]">
              {entry.title}
            </h1>
            <p className="text-xl font-[430] leading-[1.35] text-muted">{entry.excerpt}</p>
          </div>

          <div className="mt-12 space-y-6 border-t border-line pt-12">
            {entry.content.map((paragraph, i) => (
              <p key={i} className="text-lg leading-[1.6] text-ink">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-card bg-peach p-8 text-sienna sm:flex-row sm:items-center sm:p-10">
            <p className="text-[26px] font-[450] leading-[1.18] tracking-[-0.009em]">
              Have a similar campaign in mind?
            </p>
            <Button href="/#contact" variant="primary">
              Discuss Your Needs
            </Button>
          </div>
        </article>

        <div className="space-y-6">
          <p className="text-sm text-ash">More articles</p>
          <div className="grid gap-6 md:grid-cols-2">
            {newsEntries
              .filter((item) => item.slug !== entry.slug)
              .slice(0, 2)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="group rounded-card bg-mist p-6 transition-colors hover:bg-line/60"
                >
                  <p className="text-sm text-ash">{item.category}</p>
                  <h3 className="mt-3 text-xl font-[450] leading-[1.25] text-ink underline-offset-4 group-hover:underline">
                    {item.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-[15px] leading-[1.5] text-muted">{item.excerpt}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
