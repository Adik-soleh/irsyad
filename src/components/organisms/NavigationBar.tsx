 "use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/Button";
import { ThemeToggle } from "@/components/molecules/ThemeToggle";
import { cn } from "@/lib/utils";
import { NavItem, SocialLink } from "@/types/content";

interface Props {
  items: NavItem[];
  socialLinks: SocialLink[];
}

export function NavigationBar({ items, socialLinks }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-2 z-40 sm:top-6">
      <div className="relative">
        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#0b1d38]/90 px-6 py-4 text-white shadow-[0_20px_60px_rgba(4,10,25,0.65)] backdrop-blur-xl">
          <div className="flex items-center gap-10 text-sm font-medium">
            <span className="text-base font-semibold tracking-tight">Adik · Fullstack Dev</span>
            <nav className="hidden gap-6 md:flex">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/70 transition hover:text-white"
                  onClick={handleNavigate}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="hidden items-center gap-3 text-white/60 lg:flex">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            {/* <Button href="#contact" variant="secondary" className="hidden sm:flex">
              Let&apos;s Talk
            </Button> */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle navigation menu"
                className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 text-white transition hover:bg-white/10"
              >
                <span
                  className={cn(
                    "block h-0.5 w-6 bg-white transition-all duration-300",
                    isOpen && "translate-y-2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-6 bg-white transition-all duration-300",
                    isOpen && "-translate-y-2 -rotate-45",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className="absolute left-0 right-0 translate-y-4 rounded-3xl border border-white/10 bg-[#040a18]/95 p-6 text-white shadow-[0_15px_50px_rgba(4,8,18,0.8)] transition-all duration-300 md:hidden"
            style={{ top: "calc(100% + 0.75rem)" }}
          >
            <nav className="flex flex-col gap-4 text-base">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/80 transition hover:text-white"
                  onClick={handleNavigate}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/60">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 px-4 py-1 transition hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <ThemeToggle className="w-full" />
            </div>
            <Button href="#contact" className="mt-6 w-full">
              Let&apos;s Talk
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
