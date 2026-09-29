"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
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
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-3 transition-[background-color,box-shadow] duration-500 sm:px-6",
            isScrolled ? "bg-paper/85 shadow-pop backdrop-blur-xl" : "bg-transparent",
          )}
        >

          <div className="flex-1 flex items-center z-10">
            <Link
              href="#home"
              onClick={(e) => handleNavigate(e, "#home")}
              aria-label="Back to top"
              className="font-display whitespace-nowrap text-2xl text-ink"
            >
              Irsyad<span className="text-muted">.</span>
            </Link>
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
                    "relative px-3 py-0.5 text-base transition-colors duration-300",
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-x-3 -bottom-1 z-0 h-px bg-ink"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-4 z-10">
            <Link
              href="#contact"
              onClick={(e) => handleNavigate(e, "#contact")}
              className="hidden rounded-full bg-ink px-5 py-2 text-base text-paper transition-colors hover:bg-ink/85 lg:inline-flex"
            >
              Contact Me
            </Link>

            <div className="lg:hidden flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-mist"
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
              className="absolute left-0 right-0 mt-3 rounded-card bg-paper p-6 shadow-float lg:hidden"
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
                        "rounded-input px-4 py-3 text-lg transition-colors",
                        isActive
                          ? "bg-mist text-ink"
                          : "text-muted hover:bg-fog hover:text-ink"
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
                    className="rounded-full border border-ink px-4 py-2 text-[15px] text-ink transition-colors hover:bg-mist"
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
