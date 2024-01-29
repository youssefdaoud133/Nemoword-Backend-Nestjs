import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/nemo/user/user.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from 'src/security/security.module';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    SecurityModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {},
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
