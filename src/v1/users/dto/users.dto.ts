import { Expose } from 'class-transformer';

export class UsersResponseDto {

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
