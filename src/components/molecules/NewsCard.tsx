"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NewsEntry } from "@/types/content";
import { ArrowRight } from "lucide-react";

export function NewsCard({ entry, index = 0 }: { entry: NewsEntry; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/news/${entry.slug}`}
        className="group flex h-full flex-col justify-between rounded-3xl border border-zinc-200 bg-zinc-50/50 p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white hover:border-zinc-300 hover:shadow-xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center rounded-full border border-black/5 bg-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              {entry.category}
            </span>
            <span className="text-xs font-medium text-zinc-500">
              {entry.date}
            </span>
          </div>
          <h4 className="text-xl font-bold leading-tight text-zinc-900 transition-colors group-hover:text-black">
            {entry.title}
          </h4>
          <p className="text-sm leading-relaxed text-zinc-600">
            {entry.excerpt}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-zinc-200 pt-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-900 transition-transform group-hover:scale-110 group-hover:bg-black group-hover:text-white">
            <ArrowRight size={14} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
