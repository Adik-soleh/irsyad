"use client";

import { motion } from "framer-motion";
import { Stat } from "@/types/content";
import { useCountUp } from "@/hooks/useCountUp";

function Metric({ stat, index }: { stat: Stat; index: number }) {
  const { ref, display } = useCountUp<HTMLParagraphElement>({
    to: stat.countTo ?? 0,
    decimals: stat.decimals ?? 0,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="flex flex-col gap-2 border-t border-white/25 pt-6"
    >
      <p ref={ref} className="font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
        {stat.countTo === undefined ? stat.value : `${display}${stat.suffix ?? ""}`}
      </p>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/80">{stat.label}</p>
      {stat.helper && <p className="text-sm leading-relaxed text-white/65">{stat.helper}</p>}
    </motion.div>
  );
}

export function ResultsBoard({ stats }: { stats: Stat[] }) {
  return (
    <section id="results" className="relative">
      <div className="relative overflow-hidden rounded-[36px] bg-brand px-6 py-14 sm:px-10 sm:py-16 lg:px-14">
        <div className="pointer-events-none absolute -right-20 -top-24 h-[360px] w-[440px] cube-lattice cube-lattice-light [mask-image:radial-gradient(circle_at_top_right,black,transparent_70%)]" />

        <div className="relative flex flex-col gap-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/70">
              Results Board
            </p>
            <p className="max-w-md text-sm leading-relaxed text-white/70">
              Meta Business Suite &amp; Instagram Insights, Nov 2024 – Aug 2025 period.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Metric key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
