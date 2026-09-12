"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function RevealText({ children, className, delay = 0, as = "span" }: Props) {
  const Tag = motion[as];
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.2 });

  return (
    <span ref={wrapperRef} className={cn("block overflow-hidden", className)}>
      <Tag
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
        className="block"
      >
        {children}
      </Tag>
    </span>
  );
}
