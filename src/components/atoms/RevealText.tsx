"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/**
 * Wipes a line of type into view from below a clipping mask — the reveal used
 * on brand films and title cards, rather than the generic fade-up.
 */
export function RevealText({ children, className, delay = 0, as = "span" }: Props) {
  const Tag = motion[as];

  return (
    <span className={cn("block overflow-hidden", className)}>
      <Tag
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        className="block"
      >
        {children}
      </Tag>
    </span>
  );
}
