import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "inverse"
  | "outlineLight";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  download?: boolean;
};

const baseStyles =
  "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-black text-white shadow-md hover:bg-neutral-800",
  secondary:
    "border-zinc-200 bg-zinc-50 text-zinc-900 backdrop-blur hover:border-zinc-300 hover:bg-zinc-100",
  ghost:
    "border-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900",
  outline:
    "border-zinc-300 bg-transparent text-zinc-800 hover:bg-zinc-100 hover:text-zinc-900",
  inverse:
    "border-transparent bg-white text-slate-900 shadow-md hover:bg-slate-100",
  outlineLight:
    "border-white/50 bg-transparent text-white hover:bg-white/10",
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
      <span>{children}</span>
      {icon && <span className="text-lg">{icon}</span>}
    </span>
  );

  if (href) {
    if (download) {
      return (
        <a
          href={href}
          className={cn(baseStyles, variantStyles[variant], className)}
          download
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
    <button className={cn(baseStyles, variantStyles[variant], className)}>
      {content}
    </button>
  );
}
