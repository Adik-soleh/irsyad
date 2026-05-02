import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [ChatbotModule, MailModule],
  providers: [ChatGateway],
})
export class ChatModule {}
