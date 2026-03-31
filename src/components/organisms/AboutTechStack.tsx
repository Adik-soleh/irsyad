"use client";

import { motion } from "framer-motion";
import { SkillCategory, Tool } from "@/types/content";
import { SectionHeading } from "@/components/atoms/SectionHeading";

type Props = {
  categories: SkillCategory[];
  tools: Tool[];
};

export function AboutTechStack({ categories, tools }: Props) {
  return (
    <section id="about" className="space-y-12 pt-10">
      <SectionHeading
        eyebrow="Tentang Saya"
        title="Arsitektur Solid, Tampilan Cantik"
        description="Saya percaya bahwa UI yang indah harus ditopang oleh backend yang solid. Berikut adalah stack teknologi yang saya kuasai."
      />

      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category, idx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-8 shadow-sm backdrop-blur"
          >
            <h3 className="mb-6 text-sm font-bold tracking-[0.2em] text-slate-800 dark:text-white">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-transparent px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
            {/* Decorative progress bars just to suggest 'levels' visually */}
            <div className="mt-auto pt-8">
               <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                 <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: idx === 0 ? "85%" : "90%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-slate-900 dark:bg-white rounded-full" 
                  />
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tools Marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/40 p-8 mt-12 overflow-hidden"
      >
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          🛠️ Tools & Workflow
        </p>
        <div className="marquee">
          <div className="marquee-track">
            {/* Double the list to make seamless scrolling */}
            {[...tools, ...tools, ...tools].map((tool, i) => (
              <span
                key={`${tool.name}-${i}`}
                className="whitespace-nowrap rounded-xl bg-white dark:bg-white/5 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 shadow-sm"
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
