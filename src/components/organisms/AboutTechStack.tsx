"use client";

import { motion } from "framer-motion";
import { Capability, SkillCategory, Tool } from "@/types/content";
import { SectionHeading } from "@/components/atoms/SectionHeading";

type Props = {
  categories: SkillCategory[];
  capabilities: Capability[];
  tools: Tool[];
};

export function AboutTechStack({ categories, capabilities, tools }: Props) {
  return (
    <section id="about" className="space-y-12 pt-10">
      <SectionHeading
        eyebrow="About Me"
        title="Strategi Kreatif, Hasil Terukur"
        description="Kampanye yang bagus tidak berhenti di visual yang rapi. Saya menggabungkan strategi konten, eksekusi kreatif, dan pembacaan data agar setiap aktivitas punya dampak yang bisa dihitung."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col rounded-[32px] border border-slate-200 bg-white/50 p-8 shadow-sm backdrop-blur"
          >
            <h3 className="mb-6 text-sm font-bold tracking-[0.2em] text-slate-800">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* The eight roles carried over from the printed "My Performance" spread */}
      <div className="space-y-6 pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
          Peran yang Saya Pegang
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, idx) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/60 p-6 transition-colors hover:border-slate-300"
            >
              <span className="font-display text-2xl text-slate-300 transition-colors group-hover:text-slate-400">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-3 text-base font-bold text-slate-900">
                {capability.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tools Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 mt-12 overflow-hidden"
      >
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
          Tools & Workflow
        </p>
        <div className="marquee">
          <div className="marquee-track">
            {/* Tripled so the loop reads as seamless at any viewport width */}
            {[...tools, ...tools, ...tools].map((tool, i) => (
              <span
                key={`${tool.name}-${i}`}
                className="whitespace-nowrap rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-700 border border-slate-200 shadow-sm"
              >
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
