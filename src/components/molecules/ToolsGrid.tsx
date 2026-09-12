"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tool } from "@/types/content";

type Props = {
  tools: Tool[];
};

export function ToolsGrid({ tools }: Props) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const field = fieldRef.current;
    if (!field) return;

    const bounds = field.getBoundingClientRect();
    field.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    field.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
  };

  const setSpotlight = (visible: boolean) => {
    fieldRef.current?.style.setProperty("--spot-opacity", visible ? "1" : "0");
  };

  return (
    <div
      ref={fieldRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setSpotlight(true)}
      onMouseLeave={() => setSpotlight(false)}
      className="spotlight-field relative px-6"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          visible: {
            transition: { staggerChildren: prefersReducedMotion ? 0 : 0.05 },
          },
        }}
        className="relative z-10 flex flex-wrap justify-center gap-3"
      >
        {tools.map((tool) => (
          <motion.span
            key={tool.name}
            variants={{
              hidden: prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, filter: "blur(6px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            data-cursor
            className="cursor-default whitespace-nowrap rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900 hover:shadow-md"
          >
            {tool.name}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
