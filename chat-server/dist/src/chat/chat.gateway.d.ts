import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { AuthService } from '../auth/auth.service';
import { MailService } from '../mail/mail.service';
export declare class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private chatService;
    private authService;
    private mailService;
    server: Server;
    private readonly logger;
    private adminSockets;
    private guestSockets;
    constructor(chatService: ChatService, authService: AuthService, mailService: MailService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleGuestJoin(client: Socket, data: {
        guestName: string;
        guestEmail?: string;
        sessionId?: string;
    }): Promise<{
        sessionId: any;
    }>;
    handleGuestMessage(client: Socket, data: {
        sessionId: string;
        content: string;
    }): Promise<{
        message: any;
    } | undefined>;
    handleGuestTyping(client: Socket, data: {
        sessionId: string;
        isTyping: boolean;
    }): void;
    handleAdminJoin(client: Socket, data: {
        token: string;
    }): Promise<void>;
    handleAdminJoinSession(client: Socket, data: {
        sessionId: string;
        token: string;
    }): Promise<void>;
    handleAdminMessage(client: Socket, data: {
        sessionId: string;
        content: string;
        token: string;
    }): Promise<{
        message: any;
    } | undefined>;
    handleAdminTyping(client: Socket, data: {
        sessionId: string;
        isTyping: boolean;
    }): void;
    handleCloseSession(client: Socket, data: {
        sessionId: string;
        token: string;
    }): Promise<void>;
    handleDeleteSession(client: Socket, data: {
        sessionId: string;
        token: string;
    }): Promise<void>;
}
