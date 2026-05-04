import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatbotService, ChatMessage } from '../chatbot/chatbot.service';
import { MailService } from '../mail/mail.service';

@WebSocketGateway({
  cors: {
    origin: (origin, callback) => {
      const raw = process.env.FRONTEND_URL;
      if (!raw) {
        callback(new Error('FRONTEND_URL not set'), false);
        return;
      }
      const allowed = raw
        .split(',')
        .map((s) => s.trim().replace(/\/$/, ''))
        .filter(Boolean);
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, '');
      if (allowed.includes(normalized)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private notifiedSockets = new Set<string>();

  constructor(
    private chatbotService: ChatbotService,
    private mailService: MailService,
  ) {}

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.notifiedSockets.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('chat:message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      content: string;
      history?: ChatMessage[];
      guestName?: string;
    },
  ) {
    if (!data?.content?.trim()) {
      client.emit('chat:error', { message: 'Pesan kosong' });
      return;
    }

    if (!this.notifiedSockets.has(client.id)) {
      this.notifiedSockets.add(client.id);
      this.mailService
        .sendNewChatNotification(data.guestName || 'Guest', data.content)
        .catch(() => {});
    }

    client.emit('chat:typing', { typing: true });

    try {
      const reply = await this.chatbotService.reply(
        data.history ?? [],
        data.content,
      );
      client.emit('chat:reply', { content: reply });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(`Chatbot failed: ${msg}`);
      client.emit('chat:reply', {
        content:
          'Waduh, lagi ada gangguan nih. Coba lagi ya, atau langsung email aku di adiksoleh4@gmail.com.',
      });
    } finally {
      client.emit('chat:typing', { typing: false });
    }
  }
}
