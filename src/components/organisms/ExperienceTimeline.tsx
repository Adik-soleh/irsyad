import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { Education, Experience } from "@/types/content";

type Props = {
  experiences: Experience[];
  educations: Education[];
};

export function ExperienceTimeline({ experiences, educations }: Props) {
  return (
    <section id="experience" className="space-y-12">
      <SectionHeading title="Experience" />

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-line transform md:-translate-x-1/2 z-0" />

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
        <h3 className="text-[26px] font-[450] leading-[1.18] tracking-[-0.009em] text-ink">
          Education
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {educations.map((education) => (
            <div
              key={education.school}
              className="rounded-card bg-mist p-6"
            >
              <span className="text-sm text-ash">
                {education.period}
              </span>
              <h4 className="mt-2 text-lg font-medium text-ink">
                {education.school}
              </h4>
              <p className="mt-2 text-[15px] text-muted">{education.degree}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
