"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ContactChannel } from "@/types/content";
import { EMAIL } from "@/data/content";
import { Send, Megaphone, PenTool } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  channels: ContactChannel[];
  variant?: "classic" | "mediaKit";
};

const buildMailto = (name: string, email: string, message: string) => {
  const subject = `Kerja sama dari ${name}`;
  const body = [
    "Halo Irsyad,",
    "",
    `Nama    : ${name}`,
    `Email   : ${email}`,
    "",
    "Kebutuhan / ide kampanye:",
    message,
    "",
    "Terima kasih,",
    name,
    "",
    "— Dikirim lewat form kontak di portofolio.",
  ].join("\r\n");

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export function ContactSection({ channels, variant = "mediaKit" }: Props) {
  const [draftUrl, setDraftUrl] = useState("");

  // No server hop: the form composes a draft and hands it to the visitor's mail
  // client, so the message is sent from their own address.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const url = buildMailto(
      String(formData.get("name") ?? "").trim(),
      String(formData.get("email") ?? "").trim(),
      String(formData.get("message") ?? "").trim(),
    );

    setDraftUrl(url);
    window.location.href = url;
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
              Ceritakan kebutuhan brand-mu — isian di bawah langsung tersusun jadi draft
              email. Saya balas dalam 1x24 jam.
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

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5"
              >
                Kirim Pesan
                <Send size={18} />
              </button>

              {draftUrl && (
                <p className="text-sm text-slate-600">
                  Aplikasi email kamu terbuka dengan draft yang sudah terisi.{" "}
                  <a href={draftUrl} className="font-semibold text-slate-900 underline">
                    Tidak terbuka? Klik di sini
                  </a>{" "}
                  atau kirim manual ke{" "}
                  <a href={`mailto:${EMAIL}`} className="font-semibold text-slate-900 underline">
                    {EMAIL}
                  </a>
                  .
                </p>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex min-w-0 flex-col gap-6"
        >
          <div className="min-w-0 rounded-[32px] border border-slate-200 bg-[#fafafa] p-6 shadow-xl sm:p-8">
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
                  className="flex min-w-0 items-center gap-3 text-slate-700 hover:text-black transition-colors group sm:gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-200/50 group-hover:bg-slate-200 transition-colors sm:h-12 sm:w-12">
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

          {variant === "classic" ? (
            <div className="min-w-0 flex-1 rounded-[32px] border border-slate-200 bg-[#fafafa] p-6 shadow-xl sm:p-8">
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
            <div className="min-w-0 flex-1 rounded-[32px] bg-brand p-6 text-white shadow-xl sm:p-8">
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

              <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-white/25 pt-6 text-sm sm:grid-cols-2">
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
