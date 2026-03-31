import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 0) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Optional: add a tiny debounced scroll listener if needed, but IntersectionObserver is usually better
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the one that's intersecting optimally
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -50% 0px`, // triggers when section is half way up
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeId;
}
