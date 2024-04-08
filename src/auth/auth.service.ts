import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { JwtPayload, JwtSign, Payload } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    // private user: UserService,
    private config: ConfigService,
  ) {}

  public async validateUser(): Promise<any> {
    return {
      id: 'test',
      address: 'address',
    };
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (!this.jwt.verify(refreshToken, { secret: this.config.get('jwtRefreshSecret') })) {
      return false;
    }

    const payload = this.jwt.decode<{ sub: string }>(refreshToken);
    return payload.sub === data.address;
  }

  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = {
      sub: data.address,
      address: data.address,
      user: {
        address: data.address,
      },
    };

    return {
      access_token: this.jwt.sign(payload),
      // refresh_token: this.getRefreshToken(payload.sub),
    };
  }

  public getPayload(token: string): Payload | null {
    try {
      const payload = this.jwt.decode<JwtPayload | null>(token);
      if (!payload) {
        return null;
      }

      return { address: payload.address };
    } catch {
      // Unexpected token i in JSON at position XX
      return null;
    }
  }

  // private getRefreshToken(sub: string): string {
  //   return this.jwt.sign(
  //     { sub },
  //     {
  //       secret: this.config.get('jwtRefreshSecret'),
  //       expiresIn: '7d', // Set greater than the expiresIn of the access_token
  //     },
  //   );
  // }
}
