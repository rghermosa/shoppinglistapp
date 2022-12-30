import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  email: string;

  @Column()
  token: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
