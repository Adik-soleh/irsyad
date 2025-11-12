import { NavigationBar } from "@/components/organisms/NavigationBar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProjectsShowcase } from "@/components/organisms/ProjectsShowcase";
import { ExperienceTimeline } from "@/components/organisms/ExperienceTimeline";
import { NewsShowcase } from "@/components/organisms/NewsShowcase";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import { ServicesSection } from "@/components/organisms/ServicesSection";
import {
  experiences,
  heroContent,
  navItems,
  newsEntries,
  projects,
  services,
  socialLinks,
  stats,
} from "@/data/content";

export function LandingTemplate() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-40 top-0 hidden h-[520px] w-[520px] rounded-full bg-sky-500/20 blur-[120px] sm:block" />
      <div className="pointer-events-none absolute bottom-10 right-0 hidden h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[150px] sm:block" />

      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-3 pb-10 pt-0 sm:gap-12 sm:px-6 sm:pb-14 sm:pt-8 lg:gap-16 lg:px-8 lg:pb-16 lg:pt-10">
        <div className="-mt-4 sm:mt-0">
          <NavigationBar items={navItems} socialLinks={socialLinks} />
          <div className="mt-0 sm:mt-6">
            <HeroSection content={heroContent} stats={stats} socialLinks={socialLinks} />
          </div>
        </div>
        <ServicesSection services={services} />
        <ProjectsShowcase projects={projects} />
        <ExperienceTimeline experiences={experiences} />
        <NewsShowcase entries={newsEntries} />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
