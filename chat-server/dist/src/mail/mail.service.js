"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
let MailService = MailService_1 = class MailService {
    logger = new common_1.Logger(MailService_1.name);
    transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.MAIL_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
    }
    async sendNewChatNotification(guestName, message) {
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
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin-chat" 
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
        }
        catch (error) {
            this.logger.error(`Failed to send email notification: ${error.message}`);
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map