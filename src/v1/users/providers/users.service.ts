import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '#entity/beramarket';
import _ from 'lodash';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersTable: Repository<Users>,
  ) {}
  public async getUserById(userId: string): Promise<Users | null> {
    return this.usersTable.findOneBy({ id: _.toNumber(userId) });
  }
}
