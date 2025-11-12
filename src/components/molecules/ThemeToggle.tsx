"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function ThemeToggle({ className }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isLight}
      className={cn(
        "group relative flex h-11 w-28 items-center justify-between rounded-full border border-white/20 bg-slate-900/40 px-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-500",
        isLight && "bg-white/80 text-slate-900",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 opacity-0 transition-opacity duration-500",
          isLight && "opacity-70",
        )}
        aria-hidden
      />
      <span className="relative z-10 flex items-center gap-1">Dark</span>
      <span className="relative z-10 flex items-center gap-1 text-slate-900 transition-colors duration-500 group-hover:text-slate-700">
        Light
      </span>
      <span
        className={cn(
          "absolute left-1 top-1 h-9 w-9 rounded-full bg-slate-900/80 text-lg text-white shadow-lg transition-all duration-500",
          isLight && "left-16 bg-white text-slate-900",
        )}
      >
        {isLight ? "☀" : "☾"}
      </span>
    </button>
  );
}
