import { BrandId } from '../../Brands/domain/valueobjects/BrandId';
import { ProductId } from './valueobjects/ProductId';
import { ProductName } from './valueobjects/ProductName';
import { ProductCategory } from './valueobjects/ProductCategory';
import { ProductPrice } from './valueobjects/ProductPrice';

export class Product {
  readonly id: ProductId;
  readonly name: ProductName;
  readonly category: ProductCategory;
  readonly price: ProductPrice;
  readonly brand: BrandId;

  private constructor(
    name: ProductName,
    category: ProductCategory,
    price: ProductPrice,
    brand: BrandId,
    id?: ProductId
  ) {
    this.id = new ProductId();
    this.name = name;
    this.category = category;
    this.price = price;
    this.brand = brand;
  }

  public static create(
    name: ProductName,
    category: ProductCategory,
    price: ProductPrice,
    brand: BrandId,
    id?: ProductId
  ): Product {
    const product: Product = new Product(name, category, price, brand, id);
    const isNewlyCreated = !!id?.value === false;
    if (isNewlyCreated) {
      //TODO ADD NEW EVENT
    }
    return product;
  }
}
