import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  
  app.enableCors({
    origin: (origin, callback) => {
      // Allow if no origin (like mobile apps or curl) or if it matches our frontend URL
      if (!origin || 
          origin === frontendUrl || 
          origin.replace(/\/$/, '') === frontendUrl.replace(/\/$/, '')) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from origin: ${origin}`);
        console.warn(`Allowed origin (FRONTEND_URL): ${frontendUrl}`);
        callback(null, false); // Block other origins but don't throw error to avoid crashing
      }
    },
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log('--------------------------------------------------');
  console.log(`🚀 Chat server is active and listening on port ${port}`);
  console.log(`🌍 Allowing CORS for: ${frontendUrl}`);
  console.log(`📡 WebSocket namespace: /chat`);
  console.log('--------------------------------------------------');
}
bootstrap();
