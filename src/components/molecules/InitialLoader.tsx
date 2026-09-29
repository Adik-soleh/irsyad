"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "initial_loader_seen";

const subscribeNoop = () => () => {};

const readShouldShow = () => {
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return false;
  }
};

export default function InitialLoader() {
  const shouldShow = useSyncExternalStore(subscribeNoop, readShouldShow, () => false);
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);
  const visible = shouldShow && !hidden;

  useEffect(() => {
    if (!shouldShow) return;

    document.body.style.overflow = "hidden";

    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => {
      setHidden(true);
      document.body.style.overflow = "";
      sessionStorage.setItem(STORAGE_KEY, "1");
    }, 2400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, [shouldShow]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-baseline overflow-hidden pb-1">
          {"Irsyad Rafly".split("").map((ch, i) => (
            <span
              key={i}
              className="font-display inline-block text-4xl opacity-0 md:text-5xl"
              style={{
                animation: `letterIn 0.6s ease-out ${i * 0.05}s forwards`,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </div>

        <div className="relative h-px w-64 overflow-hidden bg-line">
          <div
            className="absolute inset-y-0 left-0 bg-current origin-left"
            style={{ animation: "loaderBar 1.8s cubic-bezier(0.4,0,0.2,1) forwards" }}
          />
        </div>

        <span className="text-sm text-ash">
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
