import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/atoms/RevealText";

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
        "space-y-4",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">
          {eyebrow}
        </p>
      )}
      <RevealText as="h2" className="font-display text-4xl text-slate-900 sm:text-5xl lg:text-6xl">
        {title}
      </RevealText>
      {description && (
        <p className={cn("max-w-2xl text-base text-slate-600", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
