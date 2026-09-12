import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { Education, Experience } from "@/types/content";

type Props = {
  experiences: Experience[];
  educations: Education[];
};

export function ExperienceTimeline({ experiences, educations }: Props) {
  return (
    <section id="experience" className="space-y-16 pt-10">
      <SectionHeading
        eyebrow="Experience"
        title="Perjalanan Karier"
        description="Dari divisi acara dan dokumentasi kampus, ke pengelolaan sosial media dan iklan berbayar untuk perusahaan sertifikasi."
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 transform md:-translate-x-1/2 z-0" />

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company}-${experience.period}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
          Pendidikan
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {educations.map((education) => (
            <div
              key={education.school}
              className="rounded-3xl border border-slate-200 bg-white/50 p-6 shadow-sm backdrop-blur"
            >
              <span className="text-xs font-bold text-slate-500">
                {education.period}
              </span>
              <h3 className="mt-2 text-lg font-bold text-slate-900">
                {education.school}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{education.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
