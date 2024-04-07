import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
// import type { Request, Response } from 'express';

import {
  Payload,
  JwtAuthGuard,
} from '../../../auth';
import { ApiResponse, ReqUser, SerializeInterceptor } from '../../../common';
import _ from 'lodash';
import { UsersService } from '../providers';
import { UsersResponseDto } from '../dto';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller()
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new SerializeInterceptor<UsersResponseDto>(UsersResponseDto))
  @Get('')
  public async get(@ReqUser() payload: Payload): Promise<ApiResponse<UsersResponseDto | null>> {
    const { userId } = payload;
    const user = await this.userService.getUserById(userId);
    return {
      data: user,
      message: 'User data retrieved successfully',
    };
  }
}
