import { NavigationBar } from "@/components/organisms/NavigationBar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ResultsBoard } from "@/components/organisms/ResultsBoard";
import { ProjectsShowcase } from "@/components/organisms/ProjectsShowcase";
import { ExperienceTimeline } from "@/components/organisms/ExperienceTimeline";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import { AboutTechStack } from "@/components/organisms/AboutTechStack";
import {
  capabilities,
  credentials,
  contactChannels,
  educations,
  experiences,
  heroContent,
  navItems,
  skillCategories,
  socialLinks,
  stats,
  works,
} from "@/data/content";

function Divider() {
  return <div className="lattice-divider" aria-hidden />;
}

export function EditorialTemplate() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-4 sm:px-6 sm:pb-24 sm:pt-6 lg:px-8">
        <NavigationBar items={navItems} socialLinks={socialLinks} />

        <main className="flex flex-col">
          <HeroSection content={heroContent} socialLinks={socialLinks} />

          <div className="relative z-10 flex flex-col gap-20 pt-4 sm:gap-24">
            <ResultsBoard stats={stats} />
            <Divider />
            <AboutTechStack categories={skillCategories} capabilities={capabilities} credentials={credentials} />
            <Divider />
            <ProjectsShowcase works={works} />
            <Divider />
            <ExperienceTimeline experiences={experiences} educations={educations} />
            <Divider />
            <ContactSection channels={contactChannels} />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
