import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base text-slate-300">{description}</p>
      )}
    </div>
  );
}
