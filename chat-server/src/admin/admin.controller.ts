import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatService } from '../chat/chat.service';
import { AuthService } from '../auth/auth.service';

// Simple auth guard using token from headers
function extractToken(authHeader: string): string {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Missing or invalid authorization header');
  }
  return authHeader.split(' ')[1];
}

@Controller('admin')
export class AdminController {
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
  ) {}

  @Get('sessions')
  async getSessions(@Headers('authorization') auth: string) {
    const token = extractToken(auth);
    this.authService.verifyToken(token);
    return this.chatService.getAllSessions();
  }

  @Get('sessions/active')
  async getActiveSessions(@Headers('authorization') auth: string) {
    const token = extractToken(auth);
    this.authService.verifyToken(token);
    return this.chatService.getActiveSessions();
  }

  @Get('sessions/:id')
  async getSession(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    const token = extractToken(auth);
    this.authService.verifyToken(token);
    return this.chatService.getSession(id);
  }

  @Patch('sessions/:id/close')
  async closeSession(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    const token = extractToken(auth);
    this.authService.verifyToken(token);
    return this.chatService.closeSession(id);
  }

  @Delete('sessions/:id')
  async deleteSession(
    @Param('id') id: string,
    @Headers('authorization') auth: string,
  ) {
    const token = extractToken(auth);
    this.authService.verifyToken(token);
    return this.chatService.deleteSession(id);
  }

  @Get('unread-count')
  async getUnreadCount(@Headers('authorization') auth: string) {
    const token = extractToken(auth);
    this.authService.verifyToken(token);
    const count = await this.chatService.getUnreadCount();
    return { count };
  }
}
