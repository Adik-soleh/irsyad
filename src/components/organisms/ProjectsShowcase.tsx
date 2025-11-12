import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { Project } from "@/types/content";

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="space-y-10">
      <SectionHeading
        eyebrow="Recent Projects"
        title="Produk yang baru saja dikirim"
        description="Misi utamanya: shipping fitur bernilai tinggi dan mendokumentasikan proses agar tim mudah scale."
      />
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#050e20]/70 p-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050e20] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050e20] to-transparent" />
        <div className="flex gap-6 overflow-x-auto pb-4">
          {projects.map((project) => (
            <div key={project.title} className="min-w-[280px] flex-1 lg:min-w-[360px]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
