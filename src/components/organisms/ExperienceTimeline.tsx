import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { Experience } from "@/types/content";

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="space-y-10">
      <SectionHeading
        eyebrow="Journey"
        title="Pengalaman membangun komunitas"
        description="Peran lintas product design, research, dan shipping di startup teknologi dan kolektif komunitas."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {experiences.map((experience) => (
          <ExperienceCard
            key={`${experience.company}-${experience.period}`}
            experience={experience}
          />
        ))}
      </div>
    </section>
  );
}
