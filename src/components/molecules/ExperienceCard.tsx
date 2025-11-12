import { Experience } from "@/types/content";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#08162c] p-6 text-white shadow-[0_15px_45px_rgba(3,8,20,0.6)]">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {experience.company}
          </p>
          <h3 className="mt-1 text-xl font-semibold">{experience.title}</h3>
        </div>
        <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-100">
          {experience.period}
        </p>
      </div>
      <p className="mt-4 text-sm text-slate-300">{experience.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {experience.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-slate-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
