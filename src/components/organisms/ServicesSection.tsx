import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { Service } from "@/types/content";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="space-y-10">
      <SectionHeading
        eyebrow="My Services"
        title="What I Do"
        description="End-to-end kolaborasi: mulai dari arsitektur, implementasi, sampai handover yang terdokumentasi."
        align="center"
      />
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}
