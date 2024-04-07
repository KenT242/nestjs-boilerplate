import { Injectable } from '@nestjs/common';

// import type { User } from './user.interface';

@Injectable()
export class UserService {
  public async fetch(): Promise<{
    id: string;
    address: string;
  }> {
    return Promise.resolve({
      id: 'test',
      address: 'address'
      // password: 'crypto',
      // name: username,
      // email: `${username}@test.com`,
      // roles: ['test'], // ['admin', 'etc', ...]
    });
  }
}
