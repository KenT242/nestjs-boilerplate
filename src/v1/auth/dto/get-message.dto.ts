import { IsEthereumAddress } from 'class-validator';

/**
 * https://github.com/typestack/class-validator#validation-decorators
 * https://docs.nestjs.com/techniques/serialization
 */
export class GetMessageDto {
  @IsEthereumAddress()
  public address!: string;
}
