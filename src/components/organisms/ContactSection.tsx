"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/atoms/Button";
import { SectionHeading } from "@/components/atoms/SectionHeading";
import { ContactChannel } from "@/types/content";
import { EMAIL } from "@/data/content";
import { Send, Megaphone, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  channels: ContactChannel[];
  variant?: "classic" | "mediaKit";
};

const buildMailto = (name: string, email: string, message: string) => {
  const subject = `Collaboration inquiry from ${name}`;
  const body = [
    "Hi Irsyad,",
    "",
    `Name    : ${name}`,
    `Email   : ${email}`,
    "",
    "Needs / campaign idea:",
    message,
    "",
    "Thank you,",
    name,
    "",
    "— Sent via the portfolio contact form.",
  ].join("\r\n");

  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export function ContactSection({ channels, variant = "mediaKit" }: Props) {
  const [draftUrl, setDraftUrl] = useState("");

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
    <section id="contact" className="space-y-12">
      <SectionHeading
        eyebrow="Let's Work Together"
        title="Have a Brand That Needs to Be Heard?"
        description="Open to collaborations in social media management, paid advertising campaigns, content strategy, and corporate communication materials."
      />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex min-w-0 max-w-full flex-col rounded-card bg-mist p-6 sm:p-10"
        >
          <div className="mb-8 overflow-hidden break-words">
            <h3 className="mb-2 text-[26px] font-[450] leading-[1.18] tracking-[-0.009em] text-ink">Send a Message</h3>
            <p className="text-[15px] leading-[1.5] text-muted">
              Tell me what your brand needs — the form below turns into a ready-to-send
              email draft. I reply within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[15px] font-[450] text-ink">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-input border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-smoke transition-colors focus:border-ink focus:outline-none"
                placeholder="Your name or brand name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-[15px] font-[450] text-ink">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-input border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-smoke transition-colors focus:border-ink focus:outline-none"
                placeholder="example@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-[15px] font-[450] text-ink">
                Needs or Campaign Idea
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full rounded-input border border-line bg-paper px-4 py-3 text-base text-ink placeholder:text-smoke transition-colors focus:border-ink focus:outline-none resize-none"
                placeholder="Briefly describe your brand, target audience, and the results you want to achieve..."
              />
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-2.5 text-base text-paper transition-colors hover:bg-ink/85"
              >
                Send Message
                <Send size={18} />
              </button>

              {draftUrl && (
                <p className="text-[15px] text-muted">
                  Your email app has opened with a pre-filled draft.{" "}
                  <a href={draftUrl} className="text-ink underline underline-offset-4">
                    Didn’t open? Click here
                  </a>{" "}
                  or send it manually to{" "}
                  <a href={`mailto:${EMAIL}`} className="text-ink underline underline-offset-4">
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
          <div className={cn("min-w-0 rounded-card bg-mist p-6 sm:p-8", variant === "classic" && "flex-1")}>
            <h3 className="mb-6 text-sm text-ash">
              Contact Info
            </h3>

            <div className="space-y-5">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex min-w-0 items-center gap-3 text-ink sm:gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper transition-colors group-hover:bg-line">
                    <Image
                      src={channel.icon}
                      alt={channel.label}
                      width={20}
                      height={20}
                      className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="mb-0.5 text-sm text-ash">
                      {channel.label}
                    </p>
                    <p className="truncate text-base text-ink underline-offset-4 group-hover:underline">{channel.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {variant === "mediaKit" && (
            <div className="min-w-0 flex-1 rounded-card bg-ink p-6 text-paper sm:p-8">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/85">
                  Open to collaboration
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
                      Company profile · Annual report · Feed &amp; reels · Banners, brochures, certificates
                    </span>
                  </div>
                </li>
              </ul>

              <dl className="mt-6 grid grid-cols-1 gap-4 border-t border-white/25 pt-6 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Response
                  </dt>
                  <dd className="mt-1 font-semibold">Within 24 hours</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Based in
                  </dt>
                  <dd className="mt-1 font-semibold">Jakarta · Remote</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3">
                <Button href="/api/cv" variant="inverse" className="w-full justify-center" download>
                  Download Portfolio (PDF)
                </Button>
                <Button href="#work" variant="outlineLight" className="w-full justify-center">
                  View My Work
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
