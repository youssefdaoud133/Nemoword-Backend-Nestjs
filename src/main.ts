import { NestFactory } from '@nestjs/core';
import { NemoModule } from './nemo/nemo.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(NemoModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
