"use client";

import { motion } from "framer-motion";
import { Capability, Credential, SkillCategory } from "@/types/content";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { cn } from "@/lib/utils";

type Props = {
  categories: SkillCategory[];
  capabilities: Capability[];
  credentials: Credential[];
};

export function AboutTechStack({ categories, capabilities, credentials }: Props) {
  return (
    <section id="about" className="space-y-12">
      <SectionHeading
        title="About Me"
        description="I’m skilled at developing data-driven campaigns, managing paid advertising, and crafting strategic content to increase brand awareness, drive audience engagement, and strengthen corporate reputation. I’m also experienced in collaborating with executive stakeholders to deliver communication initiatives that translate into measurable business growth."
      />

      <div className={cn("grid gap-8", categories.length > 1 && "md:grid-cols-2")}>
        {categories.map((category, idx) => (
      <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col rounded-card bg-mist p-6 sm:p-8"
          >
            <h3 className="mb-6 text-xl font-medium text-ink">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-paper px-4 py-2 text-[15px] text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6 pt-4">
        <h3 className="text-[26px] font-[450] leading-[1.18] tracking-[-0.009em] text-ink">
          Areas of Expertise
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((capability, idx) => (
      <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 4) * 0.08 }}
              className="group relative overflow-hidden rounded-card bg-mist p-6"
            >
              <span className="font-display text-3xl italic text-ash transition-colors group-hover:text-ink">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-4 text-lg font-medium text-ink">
                {capability.title}
              </h4>
              <p className="mt-2 text-[15px] leading-[1.5] text-muted">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <h3 className="text-[26px] font-[450] leading-[1.18] tracking-[-0.009em] text-ink">
          Professional Credentials
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {credentials.map((credential, idx) => (
            <motion.div
              key={credential.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.08 }}
              className="flex flex-col rounded-card bg-mist p-6"
            >
              {credential.issuer && (
                <span className="text-sm text-ash">{credential.issuer}</span>
              )}
              <h4 className={cn("text-lg font-medium leading-[1.35] text-ink", credential.issuer && "mt-2")}>
                {credential.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
