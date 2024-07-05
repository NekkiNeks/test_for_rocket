import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
if (!process.env.NODE_ENV) config({ path: '../.env' });
const PORT = process.env.BACKEND_PORT || 3000;
async function bootstrap() {
  if (!process.env.FRONTEND_URL)
    throw new Error('Отсутствует FRONTEND_URL в переменных окружения.');

  console.log(process.env);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
