import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ClassicWorkCard } from "@/components/molecules/ClassicWorkCard";
import { Work } from "@/types/content";

export function ClassicWorkShowcase({ works }: { works: Work[] }) {
  return (
    <section id="work" className="space-y-12">
      <SectionHeading title="Core Capabilities" />
      <div className="flex flex-col gap-24 lg:gap-32">
        {works.map((work, index) => (
          <ClassicWorkCard key={work.title} work={work} index={index} />
        ))}
      </div>
    </section>
  );
}
