"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  to: number;
  decimals?: number;
  durationMs?: number;
};

export function useCountUp<T extends HTMLElement>({ to, decimals = 0, durationMs = 1400 }: Options) {
  const ref = useRef<T>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || done) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    if (reduced) {
      frame = requestAnimationFrame(() => {
        setValue(to);
        setDone(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(to * eased);
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          } else {
            setDone(true);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, durationMs, done]);

  return { ref, display: value.toFixed(decimals) };
}
