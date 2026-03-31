import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

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
    "border-transparent bg-black text-white dark:bg-white dark:!text-black shadow-md hover:bg-neutral-800 dark:hover:bg-neutral-200",
  secondary:
    "border-zinc-200 dark:border-white/20 bg-zinc-50 dark:bg-white/5 text-zinc-900 dark:text-white backdrop-blur hover:border-zinc-300 dark:hover:border-white/40 hover:bg-zinc-100 dark:hover:bg-white/10",
  ghost:
    "border-zinc-200 dark:border-white/30 text-zinc-800 dark:text-white hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white",
  outline:
    "border-zinc-300 dark:border-white/30 bg-transparent text-zinc-800 dark:text-white hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white",
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
