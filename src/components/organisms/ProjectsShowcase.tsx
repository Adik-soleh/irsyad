import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { Work } from "@/types/content";

export function ProjectsShowcase({ works }: { works: Work[] }) {
  return (
    <section id="work" className="space-y-16 pt-10">
      <SectionHeading
        eyebrow="Selected Work"
        title="Apa yang Saya Kerjakan"
        description="Enam bidang kerja yang saya pegang sehari-hari — dari membaca data kampanye sampai memproduksi materi visualnya. Setiap studi kasus ditulis dengan tantangan, pendekatan, dan hasilnya."
      />
      <div className="flex flex-col gap-24 lg:gap-32">
        {works.map((work, index) => (
          <ProjectCard key={work.title} work={work} index={index} />
        ))}
      </div>
    </section>
  );
}
