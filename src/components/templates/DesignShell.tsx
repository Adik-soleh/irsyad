"use client";

import { useState, useSyncExternalStore } from "react";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";
import { DesignSwitcher } from "@/components/organisms/DesignSwitcher";

export type DesignVariant = "classic" | "editorial";

const STORAGE_KEY = "irsyad-design-variant";
const DEFAULT_VARIANT: DesignVariant = "classic";

const SHOW_SWITCHER = false;

const isVariant = (value: string | null): value is DesignVariant =>
  value === "classic" || value === "editorial";

const subscribeNoop = () => () => {};

const readInitialVariant = (): DesignVariant | null => {
  const fromQuery = new URLSearchParams(window.location.search).get("design");
  if (isVariant(fromQuery)) return fromQuery;

  if (!SHOW_SWITCHER) return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isVariant(stored)) return stored;
  } catch {}
  return null;
};

export function DesignShell() {
  const initialVariant = useSyncExternalStore(subscribeNoop, readInitialVariant, () => null);
  const [chosenVariant, setChosenVariant] = useState<DesignVariant | null>(null);
  const variant = chosenVariant ?? initialVariant ?? DEFAULT_VARIANT;

  const handleChange = (next: DesignVariant) => {
    setChosenVariant(next);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}

    const url = new URL(window.location.href);
    url.searchParams.set("design", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <>
      {variant === "classic" ? <ClassicTemplate /> : <EditorialTemplate />}
      {SHOW_SWITCHER && <DesignSwitcher value={variant} onChange={handleChange} />}
    </>
  );
    }
