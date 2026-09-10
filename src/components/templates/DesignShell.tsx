"use client";

import { useEffect, useState } from "react";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";
import { DesignSwitcher } from "@/components/organisms/DesignSwitcher";

export type DesignVariant = "classic" | "editorial";

const STORAGE_KEY = "irsyad-design-variant";
const DEFAULT_VARIANT: DesignVariant = "editorial";

const isVariant = (value: string | null): value is DesignVariant =>
  value === "classic" || value === "editorial";

export function DesignShell() {
  const [variant, setVariant] = useState<DesignVariant>(DEFAULT_VARIANT);

  // Resolved after mount so the server render stays deterministic.
  // A `?design=` param wins over the stored preference, so links are shareable.
  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get("design");
    if (isVariant(fromQuery)) {
      setVariant(fromQuery);
      return;
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isVariant(stored)) setVariant(stored);
    } catch {
      // Private mode or blocked storage — the default is fine.
    }
  }, []);

  const handleChange = (next: DesignVariant) => {
    setVariant(next);
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore: the switch still works for this session.
    }

    const url = new URL(window.location.href);
    url.searchParams.set("design", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <>
      {variant === "classic" ? <ClassicTemplate /> : <EditorialTemplate />}
      <DesignSwitcher value={variant} onChange={handleChange} />
    </>
  );
}
