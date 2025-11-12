import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

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
    "border-transparent bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-sky-500/30",
  secondary:
    "border-white/20 bg-white/5 text-white backdrop-blur hover:border-white/40",
  ghost: "border-white/30 text-white hover:bg-white/10",
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
