import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { AdminModule } from './admin/admin.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [PrismaModule, AuthModule, ChatModule, AdminModule, MailModule],
})
export class AppModule {}
