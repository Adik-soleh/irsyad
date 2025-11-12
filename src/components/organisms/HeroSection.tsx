import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { HeroContent, SocialLink, Stat } from "@/types/content";
import { StatHighlight } from "@/components/molecules/StatHighlight";

type Props = {
  content: HeroContent;
  stats: Stat[];
  socialLinks: SocialLink[];
};

const socialIconMap: Record<
  string,
  {
    src: string;
    alt: string;
  }
> = {
  Email: {
    src: "/email.svg",
    alt: "Email icon",
  },
  WhatsApp: {
    src: "/wa.svg",
    alt: "WhatsApp icon",
  },
  GitHub: {
    src: "/github.svg",
    alt: "GitHub icon",
  },
  LinkedIn: {
    src: "/linkedin.svg",
    alt: "LinkedIn icon",
  },
};

export function HeroSection({ content, stats, socialLinks }: Props) {
  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#081b32] via-[#071427] to-[#050b18] p-8 shadow-[0_30px_120px_rgba(5,10,25,0.75)]"
    >
      <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute bottom-10 right-6 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-400">
              {content.greeting}
            </p>
            <div>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                <span className="text-sky-400">{content.name}</span> — {content.tagline}
              </h1>
              <p className="mt-4 text-base text-slate-200">{content.summary}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href={content.primaryCta.href} variant="primary">
              {content.primaryCta.label}
            </Button>
            <Button
              href={content.secondaryCta.href}
              variant="secondary"
              className="border-white/30 text-white"
            >
              {content.secondaryCta.label}
            </Button>
            {content.cvCta && (
              <Button
                href={content.cvCta.href}
                variant="ghost"
                className="border-white/30 text-white"
                download
              >
                {content.cvCta.label}
              </Button>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Fokus kemampuan
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-1 text-sm text-white/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
              Check out
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const icon = socialIconMap[link.label];
                const content = icon ? (
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={20}
                    height={20}
                    className="invert brightness-200"
                  />
                ) : (
                  <span className="text-sm font-semibold text-white">
                    {link.label.slice(0, 2).toUpperCase()}
                  </span>
                );

                const isInternal = link.href.startsWith("/");

                const classes =
                  "inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10";

                if (isInternal) {
                  return (
                    <Link key={link.label} href={link.href} className={classes} aria-label={link.label}>
                      {content}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className={classes}
                    aria-label={link.label}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {content}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatHighlight key={stat.label} {...stat} />
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex h-[360px] w-[360px] max-w-full items-center justify-center rounded-[160px] bg-gradient-to-br from-sky-500/40 to-indigo-600/30 p-6 shadow-[0_40px_80px_rgba(2,6,23,0.8)]">
          <div className="relative h-full w-full overflow-hidden rounded-[140px] border border-white/15 bg-white/5">
            <Image
              src={content.photo}
              alt={content.name}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 30vw, 80vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
