"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "initial_loader_seen";

export default function InitialLoader() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (seen) return;

    setVisible(true);
    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-baseline gap-1 overflow-hidden">
          {"IRSYAD RAFLY".split("").map((ch, i) => (
            <span
              key={i}
              className="inline-block text-2xl md:text-3xl font-light tracking-[0.4em] opacity-0"
              style={{
                animation: `letterIn 0.6s ease-out ${i * 0.05}s forwards`,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        <div className="relative h-px w-64 bg-current/10 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-current origin-left"
            style={{ animation: "loaderBar 1.8s cubic-bezier(0.4,0,0.2,1) forwards" }}
          />
        </div>

        <span className="text-[10px] uppercase tracking-[0.5em] opacity-50">
          Portfolio
        </span>
      </div>

      <style jsx>{`
        @keyframes loaderBar {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }
        @keyframes letterIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
