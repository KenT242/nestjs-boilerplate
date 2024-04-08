import { Expose } from 'class-transformer';
import { IsEnum, IsEthereumAddress, IsOptional, IsString } from 'class-validator';
import { EChainName } from 'src/common/constants';

export class UsersDto {

  @Expose()
  public id!: number;

  @Expose()
  public address!: string;

  @Expose()
  public name?: string;

  @Expose()
  chainName!: string;

  @Expose()
  profilePicture?: string;
}

export class RegistryUsersDto {
  @IsEthereumAddress()
  public address!: string;

  @IsEnum(EChainName)
  public chainName!: EChainName;

  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  @IsString()
  public profilePicture?: string;
}
