import { NavigationBar } from "@/components/organisms/NavigationBar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProjectsShowcase } from "@/components/organisms/ProjectsShowcase";
import { ExperienceTimeline } from "@/components/organisms/ExperienceTimeline";
import { NewsShowcase } from "@/components/organisms/NewsShowcase";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import { AboutTechStack } from "@/components/organisms/AboutTechStack";
import {
  capabilities,
  contactChannels,
  educations,
  experiences,
  heroContent,
  navItems,
  newsEntries,
  skillCategories,
  socialLinks,
  stats,
  tools,
  works,
} from "@/data/content";

export function LandingTemplate() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-4 sm:gap-16 sm:px-6 sm:pb-24 sm:pt-6 lg:gap-24 lg:px-8">
        <NavigationBar items={navItems} socialLinks={socialLinks} />

        <main className="flex flex-col">
          <HeroSection content={heroContent} socialLinks={socialLinks} stats={stats} />

          {/* Overlapping Content Container */}
          <div className="relative z-10 mt-8 flex flex-col gap-24 pt-16 sm:mt-12 sm:gap-32 sm:pt-20 lg:gap-40
            before:absolute before:inset-0 before:-z-10 before:left-1/2 before:w-screen before:-translate-x-1/2 before:bg-white
            before:border-t before:border-zinc-200">
            <AboutTechStack categories={skillCategories} capabilities={capabilities} tools={tools} />
            <ProjectsShowcase works={works} />
            <ExperienceTimeline experiences={experiences} educations={educations} />
            <NewsShowcase entries={newsEntries} />
            <ContactSection channels={contactChannels} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
