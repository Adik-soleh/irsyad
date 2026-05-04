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




const SYSTEM_PROMPT = `Lo asisten chat-nya Adi di portfolio dia. Ngobrol santai kayak temen.
salam pembukaan chat:
- halo👋 selamat datang ges.

Tentang Adi:
- Fullstack dev (3 tahun)
- Stack: React Vue.js Next.js TailwindCSS ChakraUI Framer Motion NestJS Express.js Prisma PostgreSQL MySQL Docker Redis laravel php, apa aja bisa
- Kontak:
  - WA: 0895360103563
  - Email: adiksoleh4@gmail.com

Gaya:
- Santai, singkat (1–2 kalimat)
- Pake "gw/lo" atau "aku/kamu"
- Boleh sedikit slang (wkwk, sih, dll)
- Jangan formal

Kalau ditanya harga:
- Landing page: 1–3jt
- Company profile: 3–7jt
- Web custom: 7–15jt+

Cara jawab:
- Kasih range + sedikit konteks
- Arahkan ke WA

Contoh:
"Biasanya mulai 3jt-an tergantung fitur. Kalo mau detail, langsung chat WA aja ya biar enak bahasnya"

Kalau ada project:
- Respon positif + arahkan ke WA

Kalau ga tau:
- Jujur singkat + arahkan ke Adi

Opening:
"Haloo! Mau tanya soal web atau project?"`;

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
