import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true, name: 'id' })
  id!: number;

  @Column('char', { nullable: false, length: 42, name: 'address' })
  address!: string;

  @Column('char', { nullable: false, length: 10, name: 'chain' })
  chain!: string;

  @Column('char', { nullable: true, length: 70, name: 'name' })
  name?: string;

  @Column('text', { nullable: true, name: 'profile_picture' })
  profilePicture?: string;

  @Column('smallint', { nullable: false, name: 'status', default: 1 })
  status!: number;

  @Column('char', { nullable: true, length: 2, name: 'country_code' })
  countryCode?: string;

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'updated_at' })
  updatedAt!: Date;

  @Column('timestamp', { nullable: false, default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt!: Date;
}
