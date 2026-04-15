import { ChatService } from '../chat/chat.service';
import { AuthService } from '../auth/auth.service';
export declare class AdminController {
    private chatService;
    private authService;
    constructor(chatService: ChatService, authService: AuthService);
    getSessions(auth: string): Promise<any>;
    getActiveSessions(auth: string): Promise<any>;
    getSession(id: string, auth: string): Promise<any>;
    closeSession(id: string, auth: string): Promise<any>;
    deleteSession(id: string, auth: string): Promise<any>;
    getUnreadCount(auth: string): Promise<{
        count: any;
    }>;
}
