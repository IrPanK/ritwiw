import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';

async function bootstrap() {
  const corsOptions = {
    credentials: true,
    origin: process.env.APP_WHITELIST,
  };

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors(corsOptions);
  app.use(json({ limit: '50mb' }));
  app.use(
    urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
