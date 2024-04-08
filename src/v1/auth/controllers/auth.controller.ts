import { Controller, Get, Post, UseGuards, /*UnauthorizedException,*/ Body, Query, BadRequestException } from '@nestjs/common';
// import type { Request, Response } from 'express';

import {
  // AuthService,
  // LocalLoginGuard,
  Payload,
  // AuthenticatedGuard,
  // LocalAuthGuard,
  JwtAuthGuard,
  JwtSign,
  // JwtVerifyGuard,
} from '../../../auth';
import { ApiResponse, ReqUser, Web3SignatureService } from '../../../common';
import { IMessageResponse as IGetMessageResponse } from '../interface';
import { GetMessageDto } from '../dto/get-message.dto';
import { LoginDto, SignMessageDto } from '../dto';
import _ from 'lodash';
import { AuthService } from '../providers';

/**
 * https://docs.nestjs.com/techniques/authentication
 */
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private we3bSignature: Web3SignatureService,
  ) {}

  @Get('message')
  public message(@Query() params: GetMessageDto): ApiResponse<IGetMessageResponse> {
    const { address } = params;
    const nonce = this.we3bSignature.generateNonce();
    const { message } = this.we3bSignature.getLoginMessage({ address, nonce });
    return {
      message: 'Login message',
      data: {
        message,
        nonce,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  public jwtCheck(@ReqUser() user: Payload): ApiResponse<Payload> {
    return {
      data: user,
      message: 'Authenticated',
    };
  }

  // NOTE: This is a test endpoint for signing a message.
  @Post('sign')
  public async testSignature(@Body() data: SignMessageDto): Promise<ApiResponse<{ signature: string }>> {
    const { message, privateKey } = data;
    const signature = this.we3bSignature.signMessage(message, privateKey);
    return {
      message: 'Signature success',
      data: signature,
    };
  }

  @Post('login')
  public async jwtLogin(@Body() payload: LoginDto): Promise<ApiResponse<JwtSign>> {
    const verifiedPayload = await this.we3bSignature.verifySignature(payload);
    if (_.isNil(verifiedPayload)) {
      throw new BadRequestException('Invalid signature');
    }

    // NOTE: get user by address
    let user = await this.authService.findUserByAddress(_.get(verifiedPayload, 'address', ''));

    if (_.isNil(user)) {
      // NOTE: create user if not exist
      user = await this.authService.createUser({
        ...payload,
        address: _.toLower(_.get(verifiedPayload, 'address', '')), // NOTE: all address should be lowercase,
      });
    }

    return {
      message: 'Login success',
      data: this.authService.jwtSign({
        address: _.get(verifiedPayload, 'address', ''),
        userId: _.toString(_.get(user, 'id', '')), // NOTE: This is a test value.
      }),
    };
  }
}
