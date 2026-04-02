"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { Send, Loader2, Mail, Smartphone, Code2, Server } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
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
      (e.target as HTMLFormElement).reset();

      // Reset toast after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <section id="contact" className="space-y-12 pt-10">
      <SectionHeading
        eyebrow="Ayo Berkolaborasi"
        title="Punya Ide Hebat? Mari Kita Wujudkan"
        description="Terbuka untuk project fullstack, integrasi sistem, atau peningkatan aplikasi yang sudah live."
      />

      <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col min-w-0 rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-black/40 p-6 sm:p-10 shadow-xl backdrop-blur max-w-full"
        >
          <div className="mb-8 overflow-hidden break-words">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Kirim Pesan</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Saya akan merespon dalam 1x24 jam dengan feedback dan estimasi kasaran.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:border-slate-800 dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-slate-800 dark:focus:ring-white transition-colors"
                placeholder="Full Name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Aktif
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:border-slate-800 dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-slate-800 dark:focus:ring-white transition-colors"
                placeholder="example@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Pesan atau Ide Project
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white focus:border-slate-800 dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-slate-800 dark:focus:ring-white transition-colors resize-none"
                placeholder="Ceritakan singkat tentang project atau kebutuhanmu..."
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3 text-sm font-semibold text-white dark:text-slate-900 shadow-md transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
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
                <span className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errorMessage}
                </span>
              )}
              {status === "success" && (
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
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
          <div className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-[#fafafa] dark:bg-black/40 p-8 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Info Kontak</h3>

            <div className="space-y-5">
              <a href="mailto:adiksoleh4@gmail.com" className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                  <Image src="/email.svg" alt="Email" width={20} height={20} className="dark:invert object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">Email</p>
                  <p className="font-medium text-slate-900 dark:text-white">adiksoleh4@gmail.com</p>
                </div>
              </a>

              <a href="https://wa.me/62895360103563" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/50 dark:bg-white/5 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                  <Image src="/wa.svg" alt="WhatsApp" width={20} height={20} className="dark:invert object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-0.5">WhatsApp</p>
                  <p className="font-medium text-slate-900 dark:text-white">0895-3601-03563</p>
                </div>
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 dark:border-white/10 bg-[#fafafa] dark:bg-black/40 p-8 shadow-xl flex-1">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-[0.2em]">Deployment & Stack</h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Code2 size={20} className="text-slate-900 dark:text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white font-medium">Stack Utama</strong>
                  <span className="text-sm text-slate-600 dark:text-slate-400">React · Vue · Next.js · NestJS · Node.js · PostgreSQL · MySQL</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Server size={20} className="text-slate-900 dark:text-white shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white font-medium">Infrastruktur & DevOps</strong>
                  <span className="text-sm text-slate-600 dark:text-slate-400">Docker · Kubernetes · AWS / GCP · CI/CD Automated Pipelines. Arsitektur scalable siap production.</span>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <Button href="#projects" variant="outline" className="w-full justify-center">
                Lihat Implementasi
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
