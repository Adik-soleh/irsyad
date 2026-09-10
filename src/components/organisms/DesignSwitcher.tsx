"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { DesignVariant } from "@/components/templates/DesignShell";

type Props = {
  value: DesignVariant;
  onChange: (next: DesignVariant) => void;
};

const OPTIONS: { id: DesignVariant; label: string; hint: string }[] = [
  { id: "classic", label: "Versi 1", hint: "Klasik" },
  { id: "editorial", label: "Versi 2", hint: "Editorial" },
];

/**
 * Floating switch so the client can compare both layouts in one sitting.
 * The choice is mirrored into `?design=` so a specific version can be linked.
 */
export function DesignSwitcher({ value, onChange }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 print:hidden">
      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/90 p-1 shadow-lg backdrop-blur-xl">
        <span className="hidden pl-3 pr-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">
          Tampilan
        </span>
        {OPTIONS.map((option) => {
          const isActive = option.id === value;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={isActive}
              className="relative rounded-full px-4 py-2 text-sm transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="design-switch"
                  className="absolute inset-0 z-0 rounded-full bg-slate-900"
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex items-baseline gap-1.5 whitespace-nowrap",
                  isActive ? "font-semibold text-white" : "text-slate-600",
                )}
              >
                {option.label}
                <span className={cn("text-[10px] uppercase tracking-wider", isActive ? "text-white/70" : "text-slate-400")}>
                  {option.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
