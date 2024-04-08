import { Controller, Get, Post, Body, UseGuards, UseInterceptors } from '@nestjs/common';

import {
  Payload,
  JwtAuthGuard,
} from '../../../auth';
import { ApiResponse, ReqUser, SerializeInterceptor } from '../../../common';
import _ from 'lodash';
import { UsersService } from '../providers';
import { RegistryUsersDto, UsersDto } from '../dto';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller()
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new SerializeInterceptor<UsersDto>(UsersDto))
  @Get('')
  public async get(@ReqUser() payload: Payload): Promise<ApiResponse<UsersDto | null>> {
    const { userId } = payload;
    const user = await this.userService.getUserById(userId);
    return {
      data: user,
      message: 'User data retrieved successfully',
    };
  }

  @UseInterceptors(new SerializeInterceptor<UsersDto>(UsersDto))
  @Post('register')
  public async register(@Body() body: RegistryUsersDto): Promise<ApiResponse<UsersDto>> {
    const user = await this.userService.registryUsers(body);
    return {
      data: user,
      message: 'User created successfully',
    };
  }
}
