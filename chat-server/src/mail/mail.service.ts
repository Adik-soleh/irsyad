import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    const port = parseInt(process.env.MAIL_PORT || '587');
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendNewChatNotification(guestName: string, message: string) {
    const mailTo = process.env.MAIL_TO;
    const mailUser = process.env.MAIL_USER;

    if (!mailTo || !mailUser) {
      this.logger.warn('Email not configured, skipping notification');
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"Portfolio Chat" <${mailUser}>`,
        to: mailTo,
        subject: `💬 Pesan baru dari ${guestName} — Portfolio Chat`,
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 480px; margin: 0 auto; background: #0a0a0a; border-radius: 12px; overflow: hidden; border: 1px solid #262626;">
            <div style="padding: 24px; background: linear-gradient(135deg, #1a1a2e 0%, #0a0a0a 100%);">
              <h2 style="margin: 0 0 4px; color: #fff; font-size: 18px;">💬 Pesan Baru di Portfolio</h2>
              <p style="margin: 0; color: #a1a1aa; font-size: 13px;">Ada pengunjung yang mengirim pesan</p>
            </div>
            <div style="padding: 24px;">
              <div style="background: #18181b; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
                <p style="margin: 0 0 8px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Dari</p>
                <p style="margin: 0; color: #fff; font-size: 15px; font-weight: 600;">${guestName}</p>
              </div>
              <div style="background: #18181b; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; color: #a1a1aa; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Pesan</p>
                <p style="margin: 0; color: #fafafa; font-size: 14px; line-height: 1.6;">${message}</p>
              </div>
              <a href="${process.env.FRONTEND_URL}/admin-chat" 
                 style="display: block; text-align: center; background: #3b82f6; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                Balas Sekarang →
              </a>
            </div>
            <div style="padding: 16px 24px; border-top: 1px solid #262626;">
              <p style="margin: 0; color: #52525b; font-size: 12px; text-align: center;">Portfolio Chat System — adiportofolio.fun</p>
            </div>
          </div>
        `,
      });

      this.logger.log(`Email notification sent for message from ${guestName}`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send email notification: ${msg}`);
    }
  }
}
