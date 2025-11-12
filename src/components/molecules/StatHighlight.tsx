import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label: string;
  helper?: string;
  className?: string;
};

export function StatHighlight({ value, label, helper, className }: Props) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-5 text-white shadow-inner shadow-slate-900/50",
        className,
      )}
    >
      <p className="text-3xl font-semibold tracking-tight sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm uppercase tracking-[0.3em] text-white/70">
        {label}
      </p>
      {helper && <p className="mt-2 text-xs text-white/70">{helper}</p>}
    </div>
  );
}
