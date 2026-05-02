import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ChatModule, MailModule],
})
export class AppModule {}
