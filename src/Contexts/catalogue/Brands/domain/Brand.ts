import { Product } from '../../Products/domain/Product';
import { BrandId } from './valueobjects/BrandId';
import { BrandName } from './valueobjects/BrandName';
import { ProductId } from '../../Products/domain/valueobjects/ProductId';
import { BrandCategory } from './valueobjects/BrandCategory';

export class Brand {
  readonly id: BrandId;
  readonly name: BrandName;
  readonly category: BrandCategory;
  readonly products: ProductId[];

  private constructor(name: BrandName, category: BrandCategory, products: ProductId[], id?: BrandId) {
    this.id = new BrandId(id?.value);
    this.name = name;
    this.category = category;
    this.products = products;
  }
  public static create(name: BrandName, category: BrandCategory, products: ProductId[], id?: BrandId): Brand {
    const isNewlyCreated = !!id?.value === false;

    if (isNewlyCreated) {
      return new Brand(name, category, []);
    }
    return new Brand(name, category, products, id);
  }
}
