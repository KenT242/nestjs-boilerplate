import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import * as controllers from './controllers';
import * as providers from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as tables from '#entity/beramarket';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ...Object.values(tables)
    ]),
    TerminusModule,
    HttpModule,
  ],
  providers: [...Object.values(providers)],
  controllers: Object.values(controllers),
})
export class UserModule {}
