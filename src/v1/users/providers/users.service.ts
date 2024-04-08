import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '#entity/beramarket';
import _ from 'lodash';
import { RegistryUsersDto } from '../dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersTable: Repository<Users>,
  ) {}
  public async getUserByAddress(address: string): Promise<Users | null> {
    return this.usersTable.findOneBy({ address: _.toLower(address) });
  }

  public async registryUsers(user: RegistryUsersDto): Promise<Users> {
    const { address } = user;
    const existedUser = await this.usersTable.findOneBy({ address: _.toLower(address) });
    if (existedUser) {
      return existedUser;
    }
    return this.usersTable.save({
      ...user,
      address: _.toLower(address),
    });
  }
}
