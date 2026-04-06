"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { HeroContent, SocialLink } from "@/types/content";
import { ArrowRight, Download } from "lucide-react";

type Props = {
  content: HeroContent;
  socialLinks: SocialLink[];
};

const iconMap: Record<string, string> = {
  Email: "/email.svg",
  WhatsApp: "/wa.svg",
  LinkedIn: "/linkedin.svg",
  GitHub: "/github.svg",
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

export function HeroSection({ content, socialLinks }: Props) {
  return (
    <section id="home" className="relative pt-8 pb-32">
      {/* Decorative Grayscale Bubbles */}
      <div className="absolute -left-10 top-10 h-64 w-64 rounded-full bg-slate-200/50 dark:bg-zinc-800/50 blur-[80px]" />
      <div className="absolute bottom-10 right-6 h-64 w-64 rounded-full bg-slate-200/50 dark:bg-zinc-800/50 blur-[80px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative grid items-center gap-12 lg:grid-cols-[1.1fr,0.9fr]"
      >
        <div className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">
              {content.greeting}
            </p>
            <div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
                <span className="text-slate-900 dark:text-white">{content.name}</span>
                <br className="hidden sm:block" />
                <span className="text-slate-500 dark:text-slate-400">
                  {content.tagline}
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                "Membangun Pengalaman Web yang Mulus dan Sistem yang Tangguh"
                <br />
                {content.summary}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button href="#projects" variant="primary" className="group flex items-center gap-2">
              Lihat Karya
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="#contact" variant="ghost" className="border-slate-300 dark:border-white/30 text-slate-700 dark:text-white flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10">
              Hubungi Saya
            </Button>
            {content.cvCta && (
              <Button href={content.cvCta.href} variant="ghost" className="border-slate-300 dark:border-white/30 text-slate-700 dark:text-white flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/10" download>
                <Download size={18} />
                {content.cvCta.label}
              </Button>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3">
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => {
                const iconPath = iconMap[link.label];
                const isInternal = link.href.startsWith("/");
                const classes = "inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/80 transition-all hover:scale-110 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white hover:shadow-lg dark:hover:shadow-white/5";

                const iconContent = iconPath ? (
                  <Image src={iconPath} alt={link.label} width={20} height={20} className="dark:invert opacity-70 transition-opacity group-hover:opacity-100" />
                ) : (
                  <span>{link.label}</span>
                );

                return isInternal ? (
                  <Link key={link.label} href={link.href} className={classes} aria-label={link.label}>
                    {iconContent}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} className={classes} aria-label={link.label} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {iconContent}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative mx-auto flex items-center justify-center w-full max-w-md lg:max-w-full lg:order-last order-first mb-8 lg:mb-0"
        >
          <motion.div
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "60% 40% 30% 70% / 60% 30% 70% 40%"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="group relative flex items-center justify-center bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-white/10 p-4 shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(255,255,255,0.03)] overflow-hidden aspect-square w-[280px] sm:w-[360px] lg:w-[420px]"
          >
            <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: "inherit" }}>
              <Image
                src={content.photo}
                alt={content.name}
                fill
                priority
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 420px"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
