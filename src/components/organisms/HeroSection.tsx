"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { HeroContent, SocialLink, Stat } from "@/types/content";
import { RevealText } from "@/components/atoms/RevealText";
import { ArrowRight, Download } from "lucide-react";

type Props = {
  content: HeroContent;
  socialLinks: SocialLink[];
  /** Classic layout shows the numbers here; the editorial one gives them their own board. */
  stats?: Stat[];
};

const iconMap: Record<string, string> = {
  Email: "/email.svg",
  WhatsApp: "/wa.svg",
  LinkedIn: "/linkedin.svg",
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export function HeroSection({ content, socialLinks, stats }: Props) {
  return (
    <section id="home" className="relative pt-6 pb-20">
      {/* Grey field with the cube lattice ornament — the print portfolio's cover treatment */}
      <div className="relative overflow-hidden rounded-[36px] bg-brand px-6 py-14 text-white sm:px-10 sm:py-16 lg:px-14">
        <div className="pointer-events-none absolute -left-16 -top-20 h-[440px] w-[560px] cube-lattice cube-lattice-light [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-24 bottom-[-120px] h-[380px] w-[420px] cube-lattice cube-lattice-light [mask-image:radial-gradient(circle_at_bottom_right,black,transparent_68%)]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative grid items-center gap-12 lg:grid-cols-[1.15fr,0.85fr]"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
                {content.greeting}
              </p>
              <div>
                <RevealText as="h1" className="font-display text-5xl text-white sm:text-6xl lg:text-7xl">
                  {content.name}
                </RevealText>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.35em] text-white/75">
                  {content.tagline}
                </p>
                <RevealText
                  as="p"
                  delay={0.1}
                  className="mt-6 max-w-2xl text-xl font-medium leading-snug text-white"
                >
                  {content.headline}
                </RevealText>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">
                  {content.summary}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                href={content.primaryCta.href}
                variant="inverse"
                className="group flex items-center gap-2"
              >
                {content.primaryCta.label}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                href={content.secondaryCta.href}
                variant="outlineLight"
                className="flex items-center gap-2"
              >
                {content.secondaryCta.label}
              </Button>
              {content.cvCta && (
                <Button
                  href={content.cvCta.href}
                  variant="outlineLight"
                  className="flex items-center gap-2"
                  download
                >
                  <Download size={18} />
                  {content.cvCta.label}
                </Button>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  const iconPath = iconMap[link.label];
                  const isInternal = link.href.startsWith("/");
                  const classes =
                    "group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition-all hover:scale-110 hover:bg-white hover:text-slate-900";

                  const iconContent = iconPath ? (
                    <Image
                      src={iconPath}
                      alt={link.label}
                      width={20}
                      height={20}
                      className="opacity-90 transition-all invert group-hover:invert-0"
                    />
                  ) : (
                    <span>{link.label}</span>
                  );

                  return isInternal ? (
                    <Link key={link.label} href={link.href} className={classes} aria-label={link.label}>
                      {iconContent}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className={classes}
                      aria-label={link.label}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                    >
                      {iconContent}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative mx-auto order-first mb-4 flex w-full max-w-md items-center justify-center lg:order-last lg:mb-0 lg:max-w-full"
          >
            {/* Offset backing card, as on the printed cover */}
            <div className="absolute right-2 top-4 hidden h-full w-[88%] rounded-[36px] bg-white/15 lg:block" />
            <div className="group relative aspect-[3/4] w-[260px] overflow-hidden rounded-[36px] bg-slate-100 shadow-2xl sm:w-[320px] lg:w-[380px]">
              <Image
                src={content.photo}
                alt={content.name}
                fill
                priority
                className="object-cover object-top grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0"
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid gap-4 sm:grid-cols-3"
        >
          {stats.slice(0, 3).map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="font-display text-4xl text-slate-900 sm:text-5xl">{stat.value}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                {stat.label}
              </p>
              {stat.helper && <p className="mt-2 text-sm text-slate-600">{stat.helper}</p>}
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
