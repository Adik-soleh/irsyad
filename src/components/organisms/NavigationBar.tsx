"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { NavItem, SocialLink } from "@/types/content";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Menu, X } from "lucide-react";

interface Props {
  items: NavItem[];
  socialLinks: SocialLink[];
}

export function NavigationBar({ items, socialLinks }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const sectionIds = useMemo(() => {
    return items.map((item) => item.href.replace("#", ""));
  }, [items]);

  const activeId = useScrollSpy(sectionIds, 100);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState({}, "", href);
    }
  };

  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      if (!isOpen && !isHidden) setIsHidden(true);
    } else if (latest < previous) {
      if (isHidden) setIsHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      initial="visible"
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-2 z-50 sm:top-6"
    >
      <div className="relative">
        <div className="flex items-center justify-between rounded-3xl border border-slate-200/50 bg-white/70 px-4 sm:px-6 py-3 sm:py-4 shadow-sm backdrop-blur-xl transition-colors duration-500">

          <div className="flex-1 flex items-center text-sm font-medium z-10">
            <span className="font-display whitespace-nowrap text-xl tracking-wide text-slate-900">
              Irsyad Rafly
            </span>
          </div>

          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 z-10">
            {items.map((item) => {
              const isActive = item.href.replace("#", "") === activeId;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavigate(e, item.href)}
                  className={cn(
                    "relative rounded-full px-4 py-2 transition-colors duration-300",
                    isActive ? "font-semibold" : "text-slate-600 hover:text-black"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 z-0 rounded-full bg-slate-900 shadow-sm"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={cn("relative z-10", isActive && "text-white")}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-4 text-sm z-10">
            
            <div className="lg:hidden flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition-colors hover:bg-slate-100"
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 mt-4 rounded-3xl border border-slate-200/50 bg-white/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden"
            >
              <nav className="flex flex-col gap-2">
                {items.map((item) => {
                  const isActive = item.href.replace("#", "") === activeId;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavigate(e, item.href)}
                      className={cn(
                        "p-4 rounded-2xl text-lg font-medium transition-colors",
                        isActive
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-700 hover:bg-slate-50"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
