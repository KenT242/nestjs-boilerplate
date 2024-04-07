import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { Sampletable1 } from '#entity/sampledb1';
// import { Sampletable2 } from '#entity/sampledb2';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './healthcheck/health.module';

@Module({
  imports: [
    AuthModule,
    HealthModule,
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
        ]
      },
    ]),
  ],
  exports: [AuthModule],
})
export class V1Module {}
