import { IsEthereumAddress, IsString } from 'class-validator';

/**
 * https://github.com/typestack/class-validator#validation-decorators
 * https://docs.nestjs.com/techniques/serialization
 */
export class LoginDto {
  @IsEthereumAddress()
  public address!: string;

  @IsString()
  public signature!: string;

  @IsString()
  public message!: string;
}
