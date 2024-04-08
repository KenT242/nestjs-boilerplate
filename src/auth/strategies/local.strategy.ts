import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import type { Payload } from '../auth.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  public async validate(): Promise<Payload> {
    const user = await this.auth.validateUser();
    if (!user) {
      throw new UnauthorizedException('NotFoundUser');
    }

    return { address: user.address };
  }
}
