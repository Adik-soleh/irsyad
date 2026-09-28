"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Work } from "@/types/content";
import { Lightbulb, Target, TrendingUp } from "lucide-react";

type Props = {
  work: Work;
  index: number;
};

export function ClassicWorkCard({ work, index }: Props) {
  const isEven = index % 2 === 0;
  const { objective, execution, performance } = work;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-8 lg:gap-16 lg:flex-row lg:items-center ${
        isEven ? "" : "lg:flex-row-reverse"
      }`}
    >
      <div className="group relative w-full rounded-float bg-paper p-2 shadow-float lg:w-1/2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-image bg-mist">
          <Image
            src={work.cover}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="absolute left-6 top-6 z-20 flex gap-2">
          <span className="rounded-full bg-paper/90 px-3 py-1 text-sm text-ink backdrop-blur">
            {work.year}
          </span>
        </div>
      </div>

      <div className="w-full space-y-8 lg:w-1/2">
        <div>
          <h3 className="font-display text-[34px] text-ink sm:text-[44px]">
            {work.title}
          </h3>
          <p className="mt-3 text-sm text-ash">{work.tags.join(" · ")}</p>
        </div>

        <div className="space-y-4 border-t border-line pt-6 text-muted">
          {objective && (
            <div className="flex gap-3">
              <Target className="mt-0.5 shrink-0 text-ink" size={18} strokeWidth={1.5} />
              <div>
                <strong className="mb-1 block text-[15px] font-medium text-ink">Objective</strong>
                <span className="text-[15px] leading-[1.5]">{objective}</span>
              </div>
            </div>
          )}
          {execution && (
            <div className="flex gap-3">
              <Lightbulb className="mt-0.5 shrink-0 text-ink" size={18} strokeWidth={1.5} />
              <div>
                <strong className="mb-1 block text-[15px] font-medium text-ink">Execution</strong>
                <span className="text-[15px] leading-[1.5]">{execution}</span>
              </div>
            </div>
          )}
          {performance && (
            <div className="flex gap-3">
              <TrendingUp className="mt-0.5 shrink-0 text-ink" size={18} strokeWidth={1.5} />
              <div>
                <strong className="mb-1 block text-[15px] font-medium text-ink">Performance</strong>
                <span className="text-[15px] leading-[1.5]">{performance}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
