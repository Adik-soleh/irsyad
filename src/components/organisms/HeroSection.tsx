"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { HeroContent, SocialLink } from "@/types/content";
import { RevealText } from "@/components/atoms/RevealText";
import { ArrowRight } from "lucide-react";

type Props = {
  content: HeroContent;
  socialLinks: SocialLink[];
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

function splitName(name: string) {
  const match = name.trim().match(/^(.*?\bI['’]m)\s+(.+)$/i);
  const intro = match ? match[1] : "";
  const fullName = match ? match[2] : name.trim();
  const [first, ...rest] = fullName.split(" ");
  const firstLine = [intro, first].filter(Boolean).join(" ");
  const accent = rest.length > 0 ? rest[rest.length - 1] : "";
  const secondLine = rest.slice(0, -1).join(" ");
  return { fullName, firstLine, secondLine, accent };
}

export function HeroSection({ content, socialLinks }: Props) {
  const { fullName, firstLine, secondLine, accent } = splitName(content.name);

  return (
    <section id="home" className="relative pt-10 sm:pt-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20"
      >
        <div className="space-y-10">
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-[15px] text-ash">
              {content.greeting} · {content.tagline}
              {content.roles?.map((role) => (
                <span key={role} className="block">
                  {role}
                </span>
              ))}
            </p>
            <RevealText
              as="h1"
              className="font-display font-display-xl pb-2 text-[length:14vw] text-ink sm:text-[length:min(14vw,90px)] lg:text-[length:min(7vw,90px)]"
            >
              <span className="block whitespace-nowrap">{firstLine}</span>
              {accent && (
                <span className="block whitespace-nowrap">
                  {secondLine} <em className="italic">{accent}</em>
                </span>
              )}
            </RevealText>
            {content.headline && (
              <RevealText
                as="p"
                delay={0.1}
                className="max-w-xl text-[22px] font-[430] leading-[1.35] tracking-[-0.009em] text-ink sm:text-[26px]"
              >
                {content.headline}
              </RevealText>
            )}
            <p className="max-w-xl text-[17px] leading-[1.5] text-muted">
              {content.summary}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Button href={content.primaryCta.href} variant="primary" className="group justify-center">
              {content.primaryCta.label}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href={content.secondaryCta.href} variant="ghost" className="justify-center">
              {content.secondaryCta.label}
            </Button>
            {content.cvCta && (
              <Button href={content.cvCta.href} variant="link" className="justify-center sm:ml-2" download>
                {content.cvCta.label} →
              </Button>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const iconPath = iconMap[link.label];
                const isInternal = link.href.startsWith("/");
                const classes =
                  "group inline-flex h-10 w-10 items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-line";

                const iconContent = iconPath ? (
                  <Image
                    src={iconPath}
                    alt={link.label}
                    width={18}
                    height={18}
                    className="opacity-80 transition-opacity group-hover:opacity-100"
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
          className="relative order-first mx-auto flex w-full max-w-md items-center justify-center lg:order-last lg:max-w-full"
        >
          <div className="group relative rounded-float bg-paper p-2 shadow-float">
            <div className="relative aspect-[3/4] w-[260px] overflow-hidden rounded-image bg-mist sm:w-[320px] lg:w-[360px]">
              <Image
                src={content.photo}
                alt={fullName}
                fill
                priority
                className="object-cover object-top grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0"
                sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
