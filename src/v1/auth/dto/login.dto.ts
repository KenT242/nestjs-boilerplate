import { IsEnum, IsEthereumAddress, IsString } from 'class-validator';
import { EChainName } from 'src/common/constants';

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

  @IsString()
  @IsEnum(EChainName)
  public chainName!: string;
}
