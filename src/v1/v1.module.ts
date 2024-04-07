import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './healthcheck/health.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    HealthModule,
    UserModule,
    RouterModule.register([
      {
        path: 'v1',
        children: [
          {
            path: 'health',
            module: HealthModule,
          },
          {
            path: 'auth',
            module: AuthModule,
          },
          {
            path: 'users',
            module: UserModule,
          }
        ]
      },
    ]),
  ],
  exports: [AuthModule],
})
export class V1Module {}
