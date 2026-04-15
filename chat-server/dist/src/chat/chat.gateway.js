"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ChatGateway_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
const auth_service_1 = require("../auth/auth.service");
const mail_service_1 = require("../mail/mail.service");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    chatService;
    authService;
    mailService;
    server;
    logger = new common_1.Logger(ChatGateway_1.name);
    adminSockets = new Map();
    guestSockets = new Map();
    constructor(chatService, authService, mailService) {
        this.chatService = chatService;
        this.authService = authService;
        this.mailService = mailService;
    }
    afterInit() {
        this.logger.log('Chat WebSocket Gateway initialized');
    }
    handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.adminSockets.delete(client.id);
        const guest = this.guestSockets.get(client.id);
        if (guest) {
            this.guestSockets.delete(client.id);
            this.server.to('admin-room').emit('guest:offline', {
                sessionId: guest.sessionId,
            });
        }
    }
    async handleGuestJoin(client, data) {
        let session;
        if (data.sessionId) {
            session = await this.chatService.getSession(data.sessionId);
        }
        if (!session) {
            session = await this.chatService.createSession(data.guestName, data.guestEmail);
        }
        const roomId = `chat:${session.id}`;
        client.join(roomId);
        this.guestSockets.set(client.id, {
            socket: client,
            sessionId: session.id,
        });
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
        client.emit('guest:joined', {
            sessionId: session.id,
            messages: session.messages,
        });
        return { sessionId: session.id };
    }
    async handleGuestMessage(client, data) {
        const guest = this.guestSockets.get(client.id);
        if (!guest)
            return;
        const session = await this.chatService.getSession(data.sessionId);
        if (!session)
            return;
        const message = await this.chatService.addMessage(data.sessionId, data.content, 'guest', session.guestName);
        this.server.to(`chat:${data.sessionId}`).emit('new:message', { message });
        this.server.to('admin-room').emit('session:update', {
            sessionId: data.sessionId,
            lastMessage: message,
        });
        this.mailService
            .sendNewChatNotification(session.guestName, data.content)
            .catch(() => { });
        return { message };
    }
    handleGuestTyping(client, data) {
        this.server.to(`chat:${data.sessionId}`).emit('guest:typing', {
            sessionId: data.sessionId,
            isTyping: data.isTyping,
        });
        this.server.to('admin-room').emit('guest:typing', {
            sessionId: data.sessionId,
            isTyping: data.isTyping,
        });
    }
    async handleAdminJoin(client, data) {
        try {
            const payload = this.authService.verifyToken(data.token);
            if (!payload) {
                client.emit('auth:error', { message: 'Invalid token' });
                return;
            }
            client.join('admin-room');
            this.adminSockets.set(client.id, client);
            const sessions = await this.chatService.getAllSessions();
            const unreadCount = await this.chatService.getUnreadCount();
            client.emit('admin:joined', {
                sessions,
                unreadCount,
            });
            this.logger.log(`Admin joined: ${payload.username}`);
        }
        catch {
            client.emit('auth:error', { message: 'Authentication failed' });
        }
    }
    async handleAdminJoinSession(client, data) {
        try {
            this.authService.verifyToken(data.token);
            const roomId = `chat:${data.sessionId}`;
            client.join(roomId);
            await this.chatService.markMessagesAsRead(data.sessionId, 'guest');
            const session = await this.chatService.getSession(data.sessionId);
            client.emit('session:messages', {
                sessionId: data.sessionId,
                messages: session?.messages || [],
            });
        }
        catch {
            client.emit('auth:error', { message: 'Authentication failed' });
        }
    }
    async handleAdminMessage(client, data) {
        try {
            const payload = this.authService.verifyToken(data.token);
            if (!payload)
                return;
            const message = await this.chatService.addMessage(data.sessionId, data.content, 'admin', payload.username || 'Admin');
            this.server
                .to(`chat:${data.sessionId}`)
                .emit('new:message', { message });
            this.server.to('admin-room').emit('session:update', {
                sessionId: data.sessionId,
                lastMessage: message,
            });
            return { message };
        }
        catch {
            client.emit('auth:error', { message: 'Authentication failed' });
        }
    }
    handleAdminTyping(client, data) {
        this.server.to(`chat:${data.sessionId}`).emit('admin:typing', {
            sessionId: data.sessionId,
            isTyping: data.isTyping,
        });
    }
    async handleCloseSession(client, data) {
        try {
            this.authService.verifyToken(data.token);
            await this.chatService.closeSession(data.sessionId);
            this.server.to(`chat:${data.sessionId}`).emit('session:closed', {
                sessionId: data.sessionId,
            });
            this.server.to('admin-room').emit('session:closed', {
                sessionId: data.sessionId,
            });
        }
        catch {
            client.emit('auth:error', { message: 'Authentication failed' });
        }
    }
    async handleDeleteSession(client, data) {
        try {
            this.authService.verifyToken(data.token);
            await this.chatService.deleteSession(data.sessionId);
            this.server.to('admin-room').emit('session:deleted', {
                sessionId: data.sessionId,
            });
        }
        catch {
            client.emit('auth:error', { message: 'Authentication failed' });
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('guest:join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGuestJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('guest:message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGuestMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('guest:typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _c : Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleGuestTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('admin:join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleAdminJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('admin:join-session'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleAdminJoinSession", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('admin:message'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleAdminMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('admin:typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleAdminTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('admin:close-session'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleCloseSession", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('admin:delete-session'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleDeleteSession", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true,
        },
        namespace: '/chat',
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        auth_service_1.AuthService,
        mail_service_1.MailService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map