import { IsString } from 'class-validator';

/**
 * https://github.com/typestack/class-validator#validation-decorators
 * https://docs.nestjs.com/techniques/serialization
 */
export class SignMessageDto {
  @IsString()
  public privateKey!: string;

  @IsString()
  public message!: string;
}
