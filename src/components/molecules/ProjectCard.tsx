import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#061225] text-white shadow-[0_20px_60px_rgba(5,10,25,0.8)] transition-transform duration-300 hover:-translate-y-2">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-110"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <span className="absolute right-4 top-4 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-medium text-white shadow">
          {project.year}
        </span>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            {project.description}
          </p>
        </div>
        <Link
          href={project.link}
          className="inline-flex items-center text-sm font-semibold text-sky-400 hover:text-sky-300"
          target="_blank"
        >
          Lihat studi kasus
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
