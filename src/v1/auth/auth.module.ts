import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import * as controllers from './controllers';
import * as providers from './providers';
import { Web3SignatureService } from 'src/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as tables from '#entity/beramarket';

@Module({
  imports: [
    TypeOrmModule.forFeature([...Object.values(tables)]),
    TerminusModule,
    HttpModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('jwtSecret'),
        signOptions: {
          expiresIn: 7 * 24 * 60 * 60, // NOTE: 7 days -> This is NextAuth config from the frontend
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Web3SignatureService, ...Object.values(providers)],
  controllers: Object.values(controllers),
})
export class AuthModule {}
