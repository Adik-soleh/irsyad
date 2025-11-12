import { Button } from "@/components/atoms/Button";
import { SectionHeading } from "@/components/atoms/SectionHeading";

export function ContactSection() {
  return (
    <section id="contact" className="space-y-10">
      <SectionHeading
        eyebrow="Collab"
        title="Ayo bangun sesuatu yang bermakna"
        description="Terbuka untuk project fullstack berbasis Next.js/Node.js, integrasi API, atau peningkatan performa aplikasi yang sudah live."
      />
      <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-white shadow-[0_25px_80px_rgba(6,10,30,0.6)] backdrop-blur">
          <p className="text-sm text-white/80">
            Kirimkan ide atau kebutuhanmu, saya akan merespon dalam 1x24 jam dengan breakdown langkah eksekusi, estimasi timeline, dan kebutuhan stack.
          </p>
          <div className="mt-6 space-y-3 text-lg font-semibold">
            <p>
              Email ·{" "}
              <a href="mailto:adiksoleh4@gmail.com" className="text-sky-300">
                adiksoleh4@gmail.com
              </a>
            </p>
            <p>
              WhatsApp ·{" "}
              <a
                href="https://wa.me/62895360103563"
                target="_blank"
                rel="noreferrer"
                className="text-sky-300"
              >
                0895-3601-03563
              </a>
            </p>
          </div>
          <Button href="https://wa.me/62895360103563" className="mt-8">
            Chat via WhatsApp
          </Button>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-[#08162c] p-8 text-white shadow-[0_20px_60px_rgba(3,8,20,0.6)]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Stack favorit
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Next.js · Node.js · PostgreSQL</h3>
          <p className="mt-4 text-sm text-white/70">
            Deploy di Vercel / Fly.io, CI/CD GitHub Actions, monitoring lewat Sentry & Logtail.
            Ready untuk kolaborasi remote dan handover yang terdokumentasi.
          </p>
          <Button
            href="#projects"
            variant="ghost"
            className="mt-6 border-white/20 text-white hover:bg-white/10"
          >
            Lihat implementasi
          </Button>
        </div>
      </div>
    </section>
  );
}
