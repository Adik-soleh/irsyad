import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createSession(guestName: string, guestEmail?: string) {
    return this.prisma.chatSession.create({
      data: { guestName, guestEmail },
      include: { messages: true },
    });
  }

  async getSession(id: string) {
    return this.prisma.chatSession.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  async getActiveSessions() {
    return this.prisma.chatSession.findMany({
      where: { isActive: true },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            messages: {
              where: { isRead: false, senderRole: 'guest' },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async getAllSessions() {
    return this.prisma.chatSession.findMany({
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        _count: {
          select: {
            messages: {
              where: { isRead: false, senderRole: 'guest' },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async addMessage(
    chatSessionId: string,
    content: string,
    senderRole: string,
    senderName: string,
  ) {
    const message = await this.prisma.message.create({
      data: {
        content,
        senderRole,
        senderName,
        chatSessionId,
      },
    });

    // Update session's updatedAt
    await this.prisma.chatSession.update({
      where: { id: chatSessionId },
      data: { updatedAt: new Date() },
    });

    return message;
  }

  async markMessagesAsRead(chatSessionId: string, senderRole: string) {
    return this.prisma.message.updateMany({
      where: {
        chatSessionId,
        senderRole,
        isRead: false,
      },
      data: { isRead: true },
    });
  }

  async closeSession(id: string) {
    return this.prisma.chatSession.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async deleteSession(id: string) {
    return this.prisma.chatSession.delete({
      where: { id },
    });
  }

  async getUnreadCount() {
    return this.prisma.message.count({
      where: {
        isRead: false,
        senderRole: 'guest',
      },
    });
  }
}
