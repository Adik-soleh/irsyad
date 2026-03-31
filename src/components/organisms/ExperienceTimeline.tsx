import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ExperienceCard } from "@/components/molecules/ExperienceCard";
import { Experience } from "@/types/content";

export function ExperienceTimeline({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="space-y-16 pt-10">
      <SectionHeading
        eyebrow="Perjalanan Karir"
        title="Pengalaman Membangun Produk"
        description="Peran lintas product design, research, dan engineering di startup teknologi dan kolektif komunitas."
      />
      
      <div className="relative max-w-4xl mx-auto">
        {/* Background Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-white/10 transform md:-translate-x-1/2 z-0" />
        
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
    </section>
  );
}
