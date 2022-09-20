import {
  Column,
  Entity,
  BaseEntity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Brand } from '../../../../Brands/infrastructure/typeorm/entities/Brand';

@Entity()
export class Product extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @ManyToOne((type) => Brand)
  brand: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
