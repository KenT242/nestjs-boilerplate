import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { ICreateUser, JwtPayload, JwtSign, Payload } from '../interface';
import { Users } from '#entity/beramarket';
import _ from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(Users)
    private usersTable: Repository<Users>,
  ) {
  }

  public async findUserByAddress(address: string): Promise<Users | null> {
    return this.usersTable.findOneBy({ address: _.toLower(address) });
  }

  public async createUser(data: ICreateUser): Promise<Users> {
    return this.usersTable.save(data);
  }

  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    if (!this.jwt.verify(refreshToken, { secret: this.config.get('jwtRefreshSecret') })) {
      return false;
    }

    const payload = this.jwt.decode<{ sub: string }>(refreshToken);
    return payload.sub === data.userId;
  }

  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = { address: data.address, userId: data.userId };

    return {
      access_token: this.jwt.sign(payload),
    };
  }

  public getPayload(token: string): Payload | null {
    try {
      const payload = this.jwt.decode<JwtPayload | null>(token);
      if (!payload) {
        return null;
      }

      return { userId: payload.userId, address: payload.address };
    } catch {
      // Unexpected token i in JSON at position XX
      return null;
    }
  }
}
