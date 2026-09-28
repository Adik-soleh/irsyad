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
    <div className={`relative flex items-center justify-between md:odd:flex-row-reverse group`}>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="absolute left-[17px] md:left-1/2 w-3.5 h-3.5 rounded-full bg-ink border-2 border-paper transform -translate-x-1/2 z-10"
      />

      <div className="hidden md:block w-[calc(50%-2rem)] p-10" />

      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] ml-auto md:ml-0 rounded-card bg-mist p-6"
      >
        <div className="flex flex-col gap-1 mb-4">
          <span className="text-sm text-ash">
            {experience.period}
          </span>
          <h3 className="text-xl font-medium text-ink">{experience.title}</h3>
          <p className="text-[15px] text-muted">
            {experience.company}
          </p>
        </div>

        <p className="mt-4 text-[15px] leading-[1.5] text-ink">{experience.description}</p>

        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-paper px-3 py-1 text-ink"
            >
              {skill}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
