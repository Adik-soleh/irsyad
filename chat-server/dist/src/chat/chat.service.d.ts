import { PrismaService } from '../prisma/prisma.service';
export declare class ChatService {
    private prisma;
    constructor(prisma: PrismaService);
    createSession(guestName: string, guestEmail?: string): Promise<any>;
    getSession(id: string): Promise<any>;
    getActiveSessions(): Promise<any>;
    getAllSessions(): Promise<any>;
    addMessage(chatSessionId: string, content: string, senderRole: string, senderName: string): Promise<any>;
    markMessagesAsRead(chatSessionId: string, senderRole: string): Promise<any>;
    closeSession(id: string): Promise<any>;
    deleteSession(id: string): Promise<any>;
    getUnreadCount(): Promise<any>;
}
