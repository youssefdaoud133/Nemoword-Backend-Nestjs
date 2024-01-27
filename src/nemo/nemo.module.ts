import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FishModule } from './fish/fish.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: 'config.env',
      ignoreEnvFile: true,
      isGlobal: true,
    }),
    FishModule,
  ],
})
export class NemoModule {}
