import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { Account } from './account/entity/account.entity';

@Module({
  imports: [
    UserModule,
    AuthModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '127.0.0.1',
    //   port: 3306,
    //   username: 'root',
    //   password: 'tereza17/3',
    //   database: 'nemo_api_v1',
    //   entities: [User, Account],
    //   synchronize: true,
    // }),
    // TypeOrmModule.forFeature([User, Account]),

    ConfigModule.forRoot({
      envFilePath: 'config.env',
      ignoreEnvFile: true,
      isGlobal: true,
    }),

    AccountModule,
  ],
})
export class NemoModule {}
