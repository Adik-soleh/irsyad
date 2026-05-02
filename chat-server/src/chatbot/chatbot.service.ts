import { Injectable, Logger } from '@nestjs/common';

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'gemma2-9b-it',
];

const SYSTEM_PROMPT = `Lo asisten chat di portfolio Adi Soleh (panggilan: Adi).

Tentang Adi:
- Fullstack web developer, ~3 tahun pengalaman
- Sekarang ngerjain project pemerintahan + freelance web
- Stack utama: TypeScript, NestJS, React/Next.js, Prisma, PostgreSQL, Tailwind, Socket.io
- Kontak: email adiksoleh4@gmail.com, LinkedIn https://www.linkedin.com/in/adik-soleh/, IG @justadi.id

Cara lo balas:
- Santai, kayak ngobrol sama temen. JANGAN kaku, JANGAN kayak robot.
- Bahasa Indonesia campur sehari-hari. Pake "aku"/"kamu" atau "gw"/"lo" boleh, jangan "saya"/"anda".
- Singkat, padat. 1-3 kalimat cukup buat kebanyakan jawaban.
- Kalau ditanya hal teknis spesifik tentang project Adi yang lo gak tau, jujur bilang gak tau detailnya, suruh DM langsung ke Adi (kasih kontak).
- Kalau ada yang nawarin project / kerjaan, antusias dikit, arahin ke email atau LinkedIn buat lanjut diskusi.
- Jangan pake emoji berlebihan. Maksimal 1 per balasan, kalau emang cocok.
- Jangan bahas hal di luar konteks portfolio/kerjaan/teknologi. Kalau diluar topik, balikin ke konteks dengan halus.`;

@Injectable()
export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private readonly apiKey = process.env.GROQ_API_KEY;

  async reply(history: ChatMessage[], userMessage: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('GROQ_API_KEY not set');
    }

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10),
      { role: 'user', content: userMessage },
    ];

    let lastError: unknown;

    for (const model of MODELS) {
      try {
        const res = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model,
              messages,
              temperature: 0.8,
              max_tokens: 512,
            }),
          },
        );

        if (res.status === 429 || res.status === 503) {
          this.logger.warn(`Model ${model} rate-limited (${res.status}), trying next`);
          continue;
        }

        if (!res.ok) {
          const text = await res.text();
          this.logger.error(`Model ${model} failed (${res.status}): ${text}`);
          lastError = new Error(`HTTP ${res.status}: ${text}`);
          continue;
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const content = data.choices?.[0]?.message?.content;
        if (!content) {
          this.logger.warn(`Model ${model} returned empty content`);
          continue;
        }

        this.logger.log(`Reply OK via ${model}`);
        return content.trim();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.error(`Model ${model} threw: ${msg}`);
        lastError = err;
      }
    }

    throw lastError ?? new Error('All models failed');
  }
}
