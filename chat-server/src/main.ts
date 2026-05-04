import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS — supports comma-separated list in FRONTEND_URL
  const raw = process.env.FRONTEND_URL;
  if (!raw) {
    throw new Error('FRONTEND_URL not set');
  }
  const allowedOrigins = raw
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, '');
      if (allowedOrigins.includes(normalized)) {
        return callback(null, true);
      }
      console.warn(`CORS blocked: ${origin}`);
      console.warn(`Allowed: ${allowedOrigins.join(', ')}`);
      return callback(null, false);
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
  await app.listen(port, '0.0.0.0');

  console.log('--------------------------------------------------');
  console.log(`🚀 Chat server is active and listening on port ${port}`);
  console.log(`🌍 Allowing CORS for: ${allowedOrigins.join(', ')}`);
  console.log(`📡 WebSocket namespace: /chat`);
  console.log('--------------------------------------------------');
}
bootstrap();
