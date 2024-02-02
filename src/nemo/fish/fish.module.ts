import { Module } from '@nestjs/common';
import { FishController } from './fish.controller';
import { FishService } from './fish.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserModule } from '../user/user.module';
import { SecurityModule } from 'src/security/security.module';

@Module({
  controllers: [FishController],
  providers: [FishService],
  imports: [PrismaModule, AuthModule, UserModule, SecurityModule],
})
export class FishModule {}
