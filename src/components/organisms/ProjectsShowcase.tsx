import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { Project } from "@/types/content";

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="space-y-16 pt-10">
      <SectionHeading
        eyebrow="Portofolio Pilihan"
        title="Bukan Sekadar Tampilan, Namun Resolusi Masalah"
        description="Setiap sistem yang dibangun melalui proses problem discovery, architectural planning, hingga shipping tampilan end-to-end yang solid."
      />
      <div className="flex flex-col gap-24 lg:gap-32">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
