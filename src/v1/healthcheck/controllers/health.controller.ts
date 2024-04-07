import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { ApiResponse, Public } from '../../../common';

/**
 * https://docs.nestjs.com/recipes/terminus
 */
@Controller()
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Public()
  @Get('')
  @HealthCheck()
  public async check(): Promise<ApiResponse<HealthCheckResult>> {
    return {
      message: 'Health Check',
      data: await this.health.check([
        async (): Promise<HealthIndicatorResult> => this.http.pingCheck('dns', 'https://1.1.1.1'),
        async (): Promise<HealthIndicatorResult> => this.db.pingCheck('database'),
      ]),
    };
  }
}
