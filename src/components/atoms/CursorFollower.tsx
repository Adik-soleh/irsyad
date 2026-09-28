"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [data-cursor]';

const DOTS = 8;
const HEAD_SIZE = 9;
const TAIL_SIZE = 3;

export function CursorFollower() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const points = useRef(
    Array.from({ length: DOTS }, () => ({ x: -999, y: -999 })),
  );
  const pointer = useRef({ x: -999, y: -999 });
  const hovering = useRef(false);
  const visible = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || prefersReducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      visible.current = true;
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      hovering.current = Boolean(target?.closest?.(INTERACTIVE));
    };

    const handleLeave = () => {
      visible.current = false;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseleave", handleLeave);

    let frame = 0;

    const tick = () => {
      const chain = points.current;
      const grip = hovering.current ? 0.45 : 0.28;

      for (let i = 0; i < chain.length; i += 1) {
        const target = i === 0 ? pointer.current : chain[i - 1];
        const ease = grip - i * 0.012;

        chain[i].x += (target.x - chain[i].x) * ease;
        chain[i].y += (target.y - chain[i].y) * ease;

        const node = dotRefs.current[i];
        if (!node) continue;

        const fade = 1 - i / DOTS;
        const scale = hovering.current ? 1 + fade * 0.9 : 1;

        node.style.transform = `translate3d(${chain[i].x}px, ${chain[i].y}px, 0) translate(-50%, -50%) scale(${scale})`;
        node.style.opacity = visible.current ? `${0.15 + fade * 0.75}` : "0";
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [enabled, prefersReducedMotion]);

  if (!enabled || prefersReducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      {Array.from({ length: DOTS }, (_, i) => {
        const size = HEAD_SIZE - (HEAD_SIZE - TAIL_SIZE) * (i / (DOTS - 1));

        return (
          <span
            key={i}
            ref={(node) => {
              dotRefs.current[i] = node;
            }}
            className="absolute left-0 top-0 rounded-full bg-ink opacity-0 will-change-transform"
            style={{ width: size, height: size }}
          />
        );
      })}
    </div>
  );
}