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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("../chat/chat.service");
const auth_service_1 = require("../auth/auth.service");
function extractToken(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new common_1.UnauthorizedException('Missing or invalid authorization header');
    }
    return authHeader.split(' ')[1];
}
let AdminController = class AdminController {
    chatService;
    authService;
    constructor(chatService, authService) {
        this.chatService = chatService;
        this.authService = authService;
    }
    async getSessions(auth) {
        const token = extractToken(auth);
        this.authService.verifyToken(token);
        return this.chatService.getAllSessions();
    }
    async getActiveSessions(auth) {
        const token = extractToken(auth);
        this.authService.verifyToken(token);
        return this.chatService.getActiveSessions();
    }
    async getSession(id, auth) {
        const token = extractToken(auth);
        this.authService.verifyToken(token);
        return this.chatService.getSession(id);
    }
    async closeSession(id, auth) {
        const token = extractToken(auth);
        this.authService.verifyToken(token);
        return this.chatService.closeSession(id);
    }
    async deleteSession(id, auth) {
        const token = extractToken(auth);
        this.authService.verifyToken(token);
        return this.chatService.deleteSession(id);
    }
    async getUnreadCount(auth) {
        const token = extractToken(auth);
        this.authService.verifyToken(token);
        const count = await this.chatService.getUnreadCount();
        return { count };
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('sessions'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSessions", null);
__decorate([
    (0, common_1.Get)('sessions/active'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getActiveSessions", null);
__decorate([
    (0, common_1.Get)('sessions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getSession", null);
__decorate([
    (0, common_1.Patch)('sessions/:id/close'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "closeSession", null);
__decorate([
    (0, common_1.Delete)('sessions/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteSession", null);
__decorate([
    (0, common_1.Get)('unread-count'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUnreadCount", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        auth_service_1.AuthService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map