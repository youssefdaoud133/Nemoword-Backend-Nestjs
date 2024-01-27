import { Module } from '@nestjs/common';
import { FishController } from './fish.controller';
import { FishService } from './fish.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FishController],
  providers: [FishService],
  imports: [PrismaModule],
})
export class FishModule {}
