import { NavigationBar } from "@/components/organisms/NavigationBar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ClassicWorkShowcase } from "@/components/organisms/ClassicWorkShowcase";
import { ExperienceTimeline } from "@/components/organisms/ExperienceTimeline";
import { ContactSection } from "@/components/organisms/ContactSection";
import { Footer } from "@/components/organisms/Footer";
import { AboutTechStack } from "@/components/organisms/AboutTechStack";
import { ScrollProgress } from "@/components/atoms/ScrollProgress";
import { SectionReveal } from "@/components/atoms/SectionReveal";
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
  works,
} from "@/data/content";

export function ClassicTemplate() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <ScrollProgress />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-4 sm:gap-12 sm:px-6 sm:pb-24 sm:pt-6 lg:px-8">
        <NavigationBar items={navItems} socialLinks={socialLinks} />

        <main className="flex flex-col">
          <HeroSection content={heroContent} socialLinks={socialLinks} />

          <div className="relative z-10 flex flex-col">
            <div className="py-20 lg:py-24">
              <SectionReveal>
                <AboutTechStack categories={skillCategories} capabilities={capabilities} credentials={credentials} />
              </SectionReveal>
            </div>
            <div className="band py-20 lg:py-24">
              <SectionReveal>
                <ClassicWorkShowcase works={works} />
              </SectionReveal>
            </div>
            <div className="py-20 lg:py-24">
              <SectionReveal>
                <ExperienceTimeline experiences={experiences} educations={educations} />
              </SectionReveal>
            </div>
            <div className="pb-20 lg:pb-24">
              <SectionReveal>
                <ContactSection channels={contactChannels} variant="classic" />
              </SectionReveal>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
