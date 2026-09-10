"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ContactChannel } from "@/types/content";
import { Send, Loader2, Megaphone, PenTool } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  channels: ContactChannel[];
  /** "classic" keeps the plain scope panel; "mediaKit" uses the grey media-kit block. */
  variant?: "classic" | "mediaKit";
};

export function ContactSection({ channels, variant = "mediaKit" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Gagal mengirim pesan");
      }

      setStatus("success");
      form.reset();

      // Reset toast after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Gagal mengirim pesan");
    }
  };

  return (
    <section id="contact" className="space-y-12 pt-10">
      <SectionHeading
        eyebrow="Let's Work Together"
        title="Punya Brand yang Perlu Didengar?"
        description="Terbuka untuk kolaborasi social media management, kampanye iklan berbayar, content strategy, dan kebutuhan materi komunikasi korporat."
      />

      <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col min-w-0 rounded-[32px] border border-slate-200 bg-white p-6 sm:p-10 shadow-xl backdrop-blur max-w-full"
        >
          <div className="mb-8 overflow-hidden break-words">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Kirim Pesan</h3>
            <p className="text-sm text-slate-600">
              Ceritakan kebutuhan brand-mu, saya balas dalam 1x24 jam.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-colors"
                placeholder="Nama atau nama brand"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Email Aktif
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-colors"
                placeholder="example@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                Kebutuhan atau Ide Kampanye
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-800 transition-colors resize-none"
                placeholder="Ceritakan singkat soal brand, target audiens, dan hasil yang ingin dicapai..."
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Mengirim...
                  </>
                ) : status === "success" ? (
                  "Terkirim!"
                ) : (
                  <>
                    Kirim Pesan
                    <Send size={18} />
                  </>
                )}
              </button>

              {status === "error" && (
                <span className="text-sm font-medium text-red-500">
                  {errorMessage}
                </span>
              )}
              {status === "success" && (
                <span className="text-sm font-medium text-emerald-600">
                  Terima kasih! Pesan telah masuk.
                </span>
              )}
            </div>
          </form>
        </motion.div>

        {/* Right Info Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          <div className="rounded-[32px] border border-slate-200 bg-[#fafafa] p-8 shadow-xl">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-900">
              Info Kontak
            </h3>

            <div className="space-y-5">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-4 text-slate-700 hover:text-black transition-colors group"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200/50 group-hover:bg-slate-200 transition-colors">
                    <Image
                      src={channel.icon}
                      alt={channel.label}
                      width={20}
                      height={20}
                      className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-0.5">
                      {channel.label}
                    </p>
                    <p className="truncate font-medium text-slate-900">{channel.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Classic keeps a plain scope panel; the editorial layout swaps in a media kit. */}
          {variant === "classic" ? (
            <div className="flex-1 rounded-[32px] border border-slate-200 bg-[#fafafa] p-8 shadow-xl">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
                Ruang Lingkup Kerja
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Megaphone size={20} className="mt-0.5 shrink-0 text-slate-900" />
                  <div>
                    <strong className="block font-medium text-slate-900">Marketing &amp; Ads</strong>
                    <span className="text-sm text-slate-600">
                      Meta for Business · Google Ads · Social Media Management · Content Strategy
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PenTool size={20} className="mt-0.5 shrink-0 text-slate-900" />
                  <div>
                    <strong className="block font-medium text-slate-900">Creative &amp; Communication</strong>
                    <span className="text-sm text-slate-600">
                      Company profile · Annual report · Feed &amp; reels · Banner, brosur, sertifikat
                    </span>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <Button href="#work" variant="outline" className="w-full justify-center">
                  Lihat Karya
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 rounded-[32px] bg-brand p-8 text-white shadow-xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/85">
                  Terbuka untuk kolaborasi
                </p>
              </div>

              <h3 className="mt-6 font-display text-3xl">Media Kit</h3>

              <ul className="mt-6 space-y-4 border-t border-white/25 pt-6">
                <li className="flex items-start gap-3">
                  <Megaphone size={18} className="mt-0.5 shrink-0 text-white" />
                  <div>
                    <strong className="block text-sm font-semibold">Marketing &amp; Ads</strong>
                    <span className="text-sm text-white/75">
                      Meta for Business · Google Ads · Social media management · Content strategy
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PenTool size={18} className="mt-0.5 shrink-0 text-white" />
                  <div>
                    <strong className="block text-sm font-semibold">Creative &amp; Communication</strong>
                    <span className="text-sm text-white/75">
                      Company profile · Annual report · Feed &amp; reels · Banner, brosur, sertifikat
                    </span>
                  </div>
                </li>
              </ul>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/25 pt-6 text-sm">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Respon
                  </dt>
                  <dd className="mt-1 font-semibold">1×24 jam</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Basis
                  </dt>
                  <dd className="mt-1 font-semibold">Jakarta · Remote</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/api/cv" variant="inverse" className="w-full justify-center" download>
                  Download Portfolio (PDF)
                </Button>
                <Button href="#work" variant="outlineLight" className="w-full justify-center">
                  Lihat Karya
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
