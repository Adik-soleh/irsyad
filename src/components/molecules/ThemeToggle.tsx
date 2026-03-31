"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Read from localStorage without trying to access DOM directly in render
    const stored = window.localStorage.getItem("adisoleh-theme") as "dark" | "light" | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    
    // Apply changes
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(nextTheme);
    root.style.setProperty("color-scheme", nextTheme);
    window.localStorage.setItem("adisoleh-theme", nextTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "group relative flex h-10 w-20 items-center justify-between rounded-full border border-slate-200 dark:border-white/20 bg-slate-100 dark:bg-[#071329] p-1 shadow-inner",
        className
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div
        className={cn(
          "absolute left-1 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out dark:bg-[#1a2b4b]",
          theme === "dark" ? "translate-x-10" : "translate-x-0"
        )}
      />
      
      <div className="relative z-10 ml-1.5 flex h-full items-center text-amber-500">
        <Sun size={14} className={cn("transition-opacity", theme === "light" ? "opacity-100" : "opacity-0")} />
      </div>

      <div className="relative z-10 mr-1.5 flex h-full items-center text-slate-400">
        <Moon size={14} className={cn("transition-opacity", theme === "dark" ? "opacity-100" : "opacity-0")} />
      </div>
    </button>
  );
}
