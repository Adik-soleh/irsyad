export declare class MailService {
    private readonly logger;
    private transporter;
    constructor();
    sendNewChatNotification(guestName: string, message: string): Promise<void>;
}
