"use client";

import { motion } from "framer-motion";
import { Experience } from "@/types/content";

type Props = {
  experience: Experience;
  index: number;
};

export function ExperienceCard({ experience, index }: Props) {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`}>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="absolute left-[11px] md:left-1/2 w-3.5 h-3.5 rounded-full bg-slate-400 dark:bg-white border-2 border-white dark:border-[#030b17] transform -translate-x-1/2 z-10"
      />

      <div className="hidden md:block w-[calc(50%-2rem)] p-10" />

      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-auto md:ml-0 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 p-6 shadow-sm backdrop-blur hover:shadow-md transition-shadow"
      >
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {experience.period}
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{experience.title}</h3>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {experience.company}
          </p>
        </div>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{experience.description}</p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 dark:bg-white/10 px-3 py-1 font-medium text-slate-700 dark:text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
