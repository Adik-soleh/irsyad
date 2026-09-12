"use client";

import { useState } from "react";
import { CaseSheet } from "@/components/molecules/CaseSheet";
import { RevealText } from "@/components/atoms/RevealText";
import { Work } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProjectsShowcase({ works }: { works: Work[] }) {
  const [lead, ...rest] = works;
  const [active, setActive] = useState(0);

  const goToCase = (index: number) => {
    setActive(index);
    document.getElementById(`case-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="work" className="scroll-mt-28 space-y-12">
      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">Selected Work</p>
        <RevealText as="h2" className="font-display text-4xl text-slate-900 sm:text-5xl lg:text-6xl">
          Apa yang Saya Kerjakan
        </RevealText>
        <p className="max-w-2xl text-base text-slate-600">
          Enam bidang kerja yang saya pegang sehari-hari, ditulis seperti lembar kampanye — objective,
          audiens, kanal, format, dan hasilnya.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)] lg:gap-14">
        <nav aria-label="Daftar karya" className="hidden lg:block">
          <ol className="sticky top-28 space-y-1 border-l border-slate-200">
            {works.map((work, index) => (
              <li key={work.title}>
                <button
                  type="button"
                  onClick={() => goToCase(index)}
                  className={cn(
                    "group flex w-full items-baseline gap-3 border-l-2 py-2 pl-4 text-left text-sm transition-colors",
                    active === index
                      ? "-ml-px border-slate-900 font-semibold text-slate-900"
                      : "-ml-px border-transparent text-slate-500 hover:text-slate-900",
                  )}
                >
                  <span className="font-display text-xs text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {work.shortTitle}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-8">
          <CaseSheet work={lead} index={0} lead />

          <div className="grid gap-8 sm:grid-cols-2">
            {rest.map((work, i) => (
              <div
                key={work.title}
                className={cn(i % 3 === 0 && "sm:col-span-2 lg:col-span-1")}
              >
                <CaseSheet work={work} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
