import { NavigationBar } from "@/components/organisms/NavigationBar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProjectsShowcase } from "@/components/organisms/ProjectsShowcase";
import { ExperienceTimeline } from "@/components/organisms/ExperienceTimeline";
import { NewsShowcase } from "@/components/organisms/NewsShowcase";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import { AboutTechStack } from "@/components/organisms/AboutTechStack";
import {
  experiences,
  heroContent,
  navItems,
  newsEntries,
  projects,
  skillCategories,
  tools,
  socialLinks,
  stats,
} from "@/data/content";

export function LandingTemplate() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-4 sm:gap-16 sm:px-6 sm:pb-24 sm:pt-6 lg:gap-24 lg:px-8">
        <NavigationBar items={navItems} socialLinks={socialLinks} />

        <main className="flex flex-col">
          <HeroSection content={heroContent} socialLinks={socialLinks} />

          {/* Overlapping Content Container */}
          <div className="relative z-10 flex flex-col gap-24 sm:gap-32 lg:gap-40 pt-16 sm:pt-24 mt-16 sm:mt-24
            before:absolute before:inset-0 before:-z-10 before:w-screen before:left-1/2 before:-translate-x-1/2 before:bg-[#fafafa] dark:before:bg-[#09090b] 
            before:border-t before:border-zinc-200 dark:before:border-white/10 
            before:shadow-[0_-30px_60px_rgba(0,0,0,0.04)] dark:before:shadow-[0_-30px_60px_rgba(255,255,255,0.02)]">
            <AboutTechStack categories={skillCategories} tools={tools} />
            <ProjectsShowcase projects={projects} />
            <ExperienceTimeline experiences={experiences} />
            <NewsShowcase entries={newsEntries} />
            <ContactSection />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
