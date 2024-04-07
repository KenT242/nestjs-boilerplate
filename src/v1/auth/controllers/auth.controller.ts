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
    private auth: AuthService,
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

  // NOTE: This is a test endpoint for signing a message.
  @Post('message')
  public async testSignature(@Body() data: SignMessageDto): Promise<ApiResponse<{ signature: string }>> {
    const { message, privateKey } = data;
    const signature = this.we3bSignature.signMessage(message, privateKey);
    return {
      message: 'Signature success',
      data: signature,
    };
  }

  @Post('login')
  public async jwtLogin(@Body() user: LoginDto): Promise<ApiResponse<JwtSign>> {
    const verifiedPayload = await this.we3bSignature.verifySignature(user);
    if (_.isNil(verifiedPayload)) {
      throw new BadRequestException('Invalid signature');
    }
    return {
      message: 'Login success',
      data: this.auth.jwtSign({
        address: _.get(verifiedPayload, 'address', ''),
        userId: _.get(verifiedPayload, 'address', ''), // NOTE: This is a test value.
      }),
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

}
