import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

try {
  dotenv.config({ path: '.env' });
} catch (e) {
  console.warn('dotenv not found, docker env vars will be used');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
