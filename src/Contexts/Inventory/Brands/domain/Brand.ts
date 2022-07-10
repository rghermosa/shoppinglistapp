import { Entity } from '../../../shared/domain/Entity';
import { BrandId } from '../../Shared/domain/valueobjects/BrandId';
import { BrandName } from '../../Shared/domain/valueobjects/BrandName';
import { BrandCategory } from './valueobjects/BrandCategory';

export class Brand {
  readonly id: BrandId;
  readonly name: BrandName;
  readonly category: BrandCategory;

  private constructor({
    id,
    name,
    category,
  }: {
    id: BrandId;
    name: BrandName;
    category: BrandCategory;
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
  }
  public static create(
    id: BrandId,
    name: BrandName,
    category: BrandCategory
  ): Brand {
    return new Brand({ id, name, category });
  }
}
