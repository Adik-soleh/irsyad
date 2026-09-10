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
      {/* Cover */}
      <div className="relative w-full lg:w-1/2 rounded-[32px] overflow-hidden group border border-slate-200 shadow-xl bg-slate-50">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={work.cover}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="absolute top-6 left-6 z-20 flex gap-2">
          <span className="rounded-full bg-slate-900/90 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white shadow">
            {work.year}
          </span>
        </div>
      </div>

      {/* Detail */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div>
          <h3 className="font-display text-3xl text-slate-900 sm:text-4xl">
            {work.title}
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            {work.tags.map((tag) => (
              <span key={tag} className="border border-slate-200 rounded-full px-3 py-1 bg-slate-50">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 text-slate-700">
          <p className="text-lg leading-relaxed">{work.description}</p>

          {(work.challenge || work.approach || work.impact) && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              {work.challenge && (
                <div className="flex gap-3">
                  <Target className="mt-1 text-slate-900 shrink-0" size={20} />
                  <div>
                    <strong className="text-slate-900 block mb-1">Tantangan</strong>
                    <span className="text-sm">{work.challenge}</span>
                  </div>
                </div>
              )}
              {work.approach && (
                <div className="flex gap-3">
                  <Lightbulb className="mt-1 text-slate-900 shrink-0" size={20} />
                  <div>
                    <strong className="text-slate-900 block mb-1">Pendekatan</strong>
                    <span className="text-sm">{work.approach}</span>
                  </div>
                </div>
              )}
              {work.impact && (
                <div className="flex gap-3">
                  <TrendingUp className="mt-1 text-slate-900 shrink-0" size={20} />
                  <div>
                    <strong className="text-slate-900 block mb-1">Hasil</strong>
                    <span className="text-sm">{work.impact}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
