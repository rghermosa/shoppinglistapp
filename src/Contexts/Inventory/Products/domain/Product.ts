import { BrandId } from '../../Shared/domain/valueobjects/BrandId';
import { ProductId } from '../../Shared/domain/valueobjects/ProductId';
import { ProductName } from '../../Shared/domain/valueobjects/ProductName';
import { ProductCategory } from './valueobjects/ProductCategory';
import { ProductPrice } from './valueobjects/ProductPrice';

export class Product {
  readonly id: ProductId;
  readonly name: ProductName;
  readonly category: ProductCategory;
  readonly price: ProductPrice;
  readonly brandId: BrandId;

  private constructor({
    id,
    name,
    category,
    price,
    brandId,
  }: {
    id: ProductId;
    name: ProductName;
    category: ProductCategory;
    price: ProductPrice;
    brandId: BrandId;
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.brandId = brandId;
  }
  public static create(
    id: ProductId,
    name: ProductName,
    category: ProductCategory,
    price: ProductPrice,
    brandId: BrandId
  ): Product {
    return new Product({
      id,
      name,
      category,
      price,
      brandId,
    });
  }
}
