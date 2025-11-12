import { Service } from "@/types/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-[#0f1d33] to-[#081227] p-6 text-white shadow-[0_25px_60px_rgba(3,8,20,0.5)]">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl">
          {service.icon}
        </span>
        <div>
          <h3 className="text-xl font-semibold">{service.title}</h3>
          <p className="text-sm text-slate-300">{service.description}</p>
        </div>
      </div>
      <ul className="mt-6 space-y-2 text-sm text-slate-300">
        {service.items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="text-sky-400">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
