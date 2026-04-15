import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
  namespace: '/chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private adminSockets: Map<string, Socket> = new Map();
  private guestSockets: Map<string, { socket: Socket; sessionId: string }> =
    new Map();

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  afterInit() {
    this.logger.log('Chat WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);

    // Remove from admin sockets
    this.adminSockets.delete(client.id);

    // Remove from guest sockets & notify admins
    const guest = this.guestSockets.get(client.id);
    if (guest) {
      this.guestSockets.delete(client.id);
      this.server.to('admin-room').emit('guest:offline', {
        sessionId: guest.sessionId,
      });
    }
  }

  // ──────────────── GUEST EVENTS ────────────────

  @SubscribeMessage('guest:join')
  async handleGuestJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { guestName: string; guestEmail?: string; sessionId?: string },
  ) {
    let session;

    if (data.sessionId) {
      // Reconnect to existing session
      session = await this.chatService.getSession(data.sessionId);
    }

    if (!session) {
      // Create new session
      session = await this.chatService.createSession(
        data.guestName,
        data.guestEmail,
      );
    }

    const roomId = `chat:${session.id}`;
    client.join(roomId);

    this.guestSockets.set(client.id, {
      socket: client,
      sessionId: session.id,
    });

    // Notify admins about new guest
    this.server.to('admin-room').emit('session:new', {
      session: {
        id: session.id,
        guestName: session.guestName,
        guestEmail: session.guestEmail,
        isActive: session.isActive,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
        messages: session.messages,
      },
    });

    // Send session info back to guest
    client.emit('guest:joined', {
      sessionId: session.id,
      messages: session.messages,
    });

    return { sessionId: session.id };
  }

  @SubscribeMessage('guest:message')
  async handleGuestMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; content: string },
  ) {
    const guest = this.guestSockets.get(client.id);
    if (!guest) return;

    const session = await this.chatService.getSession(data.sessionId);
    if (!session) return;

    const message = await this.chatService.addMessage(
      data.sessionId,
      data.content,
      'guest',
      session.guestName,
    );

    // Broadcast to room (guest + any admin watching this session)
    this.server.to(`chat:${data.sessionId}`).emit('new:message', { message });

    // Notify all admins about new message (for badge/notification)
    this.server.to('admin-room').emit('session:update', {
      sessionId: data.sessionId,
      lastMessage: message,
    });

    // Send email notification (non-blocking)
    this.mailService
      .sendNewChatNotification(session.guestName, data.content)
      .catch(() => {});

    return { message };
  }

  @SubscribeMessage('guest:typing')
  handleGuestTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; isTyping: boolean },
  ) {
    this.server.to(`chat:${data.sessionId}`).emit('guest:typing', {
      sessionId: data.sessionId,
      isTyping: data.isTyping,
    });

    this.server.to('admin-room').emit('guest:typing', {
      sessionId: data.sessionId,
      isTyping: data.isTyping,
    });
  }

  // ──────────────── ADMIN EVENTS ────────────────

  @SubscribeMessage('admin:join')
  async handleAdminJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { token: string },
  ) {
    try {
      const payload = this.authService.verifyToken(data.token);
      if (!payload) {
        client.emit('auth:error', { message: 'Invalid token' });
        return;
      }

      client.join('admin-room');
      this.adminSockets.set(client.id, client);

      // Send all sessions to admin
      const sessions = await this.chatService.getAllSessions();
      const unreadCount = await this.chatService.getUnreadCount();

      client.emit('admin:joined', {
        sessions,
        unreadCount,
      });

      this.logger.log(`Admin joined: ${payload.username}`);
    } catch {
      client.emit('auth:error', { message: 'Authentication failed' });
    }
  }

  @SubscribeMessage('admin:join-session')
  async handleAdminJoinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; token: string },
  ) {
    try {
      this.authService.verifyToken(data.token);
      const roomId = `chat:${data.sessionId}`;
      client.join(roomId);

      // Mark guest messages as read
      await this.chatService.markMessagesAsRead(data.sessionId, 'guest');

      const session = await this.chatService.getSession(data.sessionId);
      client.emit('session:messages', {
        sessionId: data.sessionId,
        messages: session?.messages || [],
      });
    } catch {
      client.emit('auth:error', { message: 'Authentication failed' });
    }
  }

  @SubscribeMessage('admin:message')
  async handleAdminMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { sessionId: string; content: string; token: string },
  ) {
    try {
      const payload = this.authService.verifyToken(data.token);
      if (!payload) return;

      const message = await this.chatService.addMessage(
        data.sessionId,
        data.content,
        'admin',
        payload.username || 'Admin',
      );

      // Broadcast to room
      this.server
        .to(`chat:${data.sessionId}`)
        .emit('new:message', { message });

      // Update session list for all admins
      this.server.to('admin-room').emit('session:update', {
        sessionId: data.sessionId,
        lastMessage: message,
      });

      return { message };
    } catch {
      client.emit('auth:error', { message: 'Authentication failed' });
    }
  }

  @SubscribeMessage('admin:typing')
  handleAdminTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; isTyping: boolean },
  ) {
    this.server.to(`chat:${data.sessionId}`).emit('admin:typing', {
      sessionId: data.sessionId,
      isTyping: data.isTyping,
    });
  }

  @SubscribeMessage('admin:close-session')
  async handleCloseSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; token: string },
  ) {
    try {
      this.authService.verifyToken(data.token);
      await this.chatService.closeSession(data.sessionId);

      // Notify everyone in the session
      this.server.to(`chat:${data.sessionId}`).emit('session:closed', {
        sessionId: data.sessionId,
      });

      // Notify all admins
      this.server.to('admin-room').emit('session:closed', {
        sessionId: data.sessionId,
      });
    } catch {
      client.emit('auth:error', { message: 'Authentication failed' });
    }
  }

  @SubscribeMessage('admin:delete-session')
  async handleDeleteSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { sessionId: string; token: string },
  ) {
    try {
      this.authService.verifyToken(data.token);
      await this.chatService.deleteSession(data.sessionId);

      this.server.to('admin-room').emit('session:deleted', {
        sessionId: data.sessionId,
      });
    } catch {
      client.emit('auth:error', { message: 'Authentication failed' });
    }
  }
}
