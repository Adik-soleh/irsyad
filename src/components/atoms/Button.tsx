import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "inverse"
  | "outlineLight"
  | "link";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  download?: boolean;
};

const baseStyles =
  "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-base font-normal transition-colors duration-200";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-ink bg-ink text-paper hover:bg-ink/85",
  secondary:
    "border-transparent bg-mist text-ink hover:bg-line",
  ghost:
    "border-ink bg-transparent text-ink hover:bg-mist",
  outline:
    "border-ink bg-transparent text-ink hover:bg-mist",
  inverse:
    "border-paper bg-paper text-ink hover:bg-mist",
  outlineLight:
    "border-paper/60 bg-transparent text-paper hover:bg-paper/10",
  link:
    "rounded-none border-transparent px-0 text-ink underline-offset-4 hover:underline",
};

export function Button({
  children,
  href,
  icon,
  variant = "primary",
  className,
  download = false,
}: ButtonProps) {
  const content = (
    <span className="flex items-center gap-2">
      <span className="inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
      {icon && <span className="text-lg">{icon}</span>}
    </span>
  );

  if (href) {
    if (download || href.startsWith("#")) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variantStyles[variant], className)}
          download={download || undefined}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={cn(baseStyles, variantStyles[variant], className)}>
      {content}
    </button>
  );
}
