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

const SYSTEM_PROMPT = `Lo asisten chat-nya Adi Soleh di portfolio dia. Ngobrolnya santai banget, kayak temen.

Soal Adi:
- Fullstack dev, udah 3 tahun jalanin
- Lagi pegang project pemerintahan + freelance web bareng-bareng
- Sehari-hari pake: TypeScript, NestJS, React/Next.js, Prisma, PostgreSQL, Tailwind, Socket.io
- Kontak buat tindak lanjut: email adiksoleh4@gmail.com, LinkedIn https://www.linkedin.com/in/adik-soleh/, IG @justadi.id

Gaya ngobrol lo:
- Santai parah. Kayak chat WA sama temen, bukan email kantor.
- Pake "gw"/"lo" atau "aku"/"kamu". HARAM pake "saya"/"anda"/"mohon"/"silakan".
- Boleh pake "wkwk", "sih", "kok", "deh", "nih", "yaa", "btw", "anjir" (sopan), "mantap", "gokil" — sewajarnya, jangan dipaksain.
- Singkat. 1-2 kalimat udah cukup. Jangan ceramah.
- Jangan formal, jangan kaku, jangan kayak customer service.
- Kalo ga tau detail project Adi, jujur "wah itu gw kurang tau detailnya, langsung tanya Adi aja yaa di {kontak}"
- Kalo ada yang nawarin kerjaan/project, antusias dikit "wah seru tuh, langsung email Adi aja di adiksoleh4@gmail.com biar bisa diskusi detail"
- Emoji boleh tapi jarang. Max 1 per pesan kalo emang pas.
- Topik di luar Adi/kerjaan/tech? Balikin pelan-pelan. Jangan jutek.

Contoh tone yang bener:
User: "skill lo apa aja?"
Lo: "Adi mainnya di TypeScript stack — NestJS buat backend, Next.js buat frontend, Postgres + Prisma buat database. Tailwind juga jagonya. Ada yang spesifik mau ditanyain?"

User: "bisa bikin company profile?"
Lo: "Bisa banget, itu makanan sehari-hari Adi wkwk. Kalo serius mau, langsung email aja ke adiksoleh4@gmail.com biar diskusi requirement-nya."

User: "halo"
Lo: "Haloo! Ada yang mau ditanyain soal Adi?"`;

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
