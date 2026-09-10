"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Work } from "@/types/content";
import { RevealText } from "@/components/atoms/RevealText";
import { cn } from "@/lib/utils";

type Props = {
  work: Work;
  index: number;
  /** The first case runs full width; the rest sit in the mosaic. */
  lead?: boolean;
};

const SPEC_ROWS = [
  { key: "objective", label: "Objective" },
  { key: "audience", label: "Audience" },
  { key: "channel", label: "Channel" },
  { key: "format", label: "Format" },
  { key: "result", label: "Result" },
] as const;

export function CaseSheet({ work, index, lead = false }: Props) {
  return (
    <motion.article
      id={`case-${index}`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group scroll-mt-32 overflow-hidden rounded-[28px] border border-slate-200 bg-white",
        lead && "sm:rounded-[36px]",
      )}
    >
      <div className={cn("relative overflow-hidden", lead ? "aspect-[16/7]" : "aspect-[4/3]")}>
        <Image
          src={work.cover}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          sizes={lead ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 1024px) 100vw, 33vw"}
        />
        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700">
          {String(index + 1).padStart(2, "0")} · {work.year}
        </span>
      </div>

      <div className={cn("flex flex-col gap-6 p-6", lead && "sm:p-10")}>
        <div className="space-y-4">
          <RevealText
            as="h3"
            className={cn("font-display text-slate-900", lead ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl")}
          >
            {work.title}
          </RevealText>
          <p className={cn("leading-relaxed text-slate-600", lead ? "max-w-2xl text-lg" : "text-sm")}>
            {work.description}
          </p>
        </div>

        {/* Campaign sheet — reads like the spec block on an agency one-pager */}
        <dl className="divide-y divide-slate-200 border-y border-slate-200">
          {SPEC_ROWS.map(({ key, label }) => (
            <div
              key={key}
              className="grid gap-1 py-3 sm:grid-cols-[128px_1fr] sm:items-baseline sm:gap-6"
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                {label}
              </dt>
              <dd
                className={cn(
                  "text-sm text-slate-700",
                  key === "result" && "font-semibold text-slate-900",
                )}
              >
                {work.spec[key]}
              </dd>
            </div>
          ))}
        </dl>

        {work.note && (
          <p className="text-sm leading-relaxed text-slate-500">{work.note}</p>
        )}

        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
