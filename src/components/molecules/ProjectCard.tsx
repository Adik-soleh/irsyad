"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/types/content";
import { ArrowRight, LayoutTemplate, ServerCog, Target } from "lucide-react";
import { Button } from "@/components/atoms/Button";

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
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
      {/* Image Container */}
      <div className="relative w-full lg:w-1/2 rounded-[32px] overflow-hidden group border border-slate-200 dark:border-white/10 shadow-xl bg-slate-50 dark:bg-black">
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-square xl:aspect-[4/3] overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 grayscale group-hover:grayscale-0"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="absolute top-6 left-6 z-20 flex gap-2">
            <span className="rounded-full bg-slate-900/90 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white shadow">
              {project.year}
            </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full lg:w-1/2 space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {project.title}
          </h2>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {project.tags.map((tag) => (
              <span key={tag} className="border border-slate-200 dark:border-white/10 rounded-full px-3 py-1 bg-slate-50 dark:bg-white/5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <p className="text-lg leading-relaxed">{project.description}</p>

          {(project.problem || project.uiSolution || project.systemSolution) && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
              {project.problem && (
                <div className="flex gap-3">
                  <Target className="mt-1 text-slate-900 dark:text-white shrink-0" size={20} />
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-1">Masalah:</strong>
                    <span className="text-sm">{project.problem}</span>
                  </div>
                </div>
              )}
              {project.uiSolution && (
                <div className="flex gap-3">
                  <LayoutTemplate className="mt-1 text-slate-900 dark:text-white shrink-0" size={20} />
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-1">Solusi Tampilan:</strong>
                    <span className="text-sm">{project.uiSolution}</span>
                  </div>
                </div>
              )}
              {project.systemSolution && (
                <div className="flex gap-3">
                  <ServerCog className="mt-1 text-slate-900 dark:text-white shrink-0" size={20} />
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-1">Solusi Sistem:</strong>
                    <span className="text-sm">{project.systemSolution}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-2">
          <Button href={project.link} variant="outline" className="group border-slate-300 dark:border-white/30 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 px-8 disabled:opacity-50">
            <span className="flex items-center gap-2">
              Lihat Project
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
