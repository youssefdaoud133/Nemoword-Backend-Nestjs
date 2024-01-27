import { NestFactory } from '@nestjs/core';
import { NemoModule } from './nemo/nemo.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { GlobalExceptionFilter } from './exception.filter';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(NemoModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // Register the global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(8000);
}
bootstrap();
