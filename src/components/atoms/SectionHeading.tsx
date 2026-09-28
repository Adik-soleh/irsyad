import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { RevealText } from "@/components/atoms/RevealText";

type Props = {
  eyebrow?: string;
  title?: string;
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
        <p className="text-sm text-ash">
          {eyebrow}
        </p>
      )}
      {title && (
        <RevealText as="h2" className="font-display pb-1 text-[40px] text-ink sm:text-[52px] lg:text-[64px]">
          {title}
        </RevealText>
      )}
      {description && (
        <p className={cn("max-w-2xl text-lg font-[430] leading-[1.5] text-muted", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
