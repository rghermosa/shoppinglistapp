import { BrandId } from '../../Brands/domain/valueobjects/BrandId';
import { ProductId } from './valueobjects/ProductId';
import { ProductName } from '../domain/valueobjects/ProductName';
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
    console.log(product);
    const isNewlyCreated = !!id?.value === false;
    if (isNewlyCreated) {
      //const eventEmitter = EventBus.getInstance();
      //eventEmitter.emit('UpdateBrandOnProductCreated', new ProductCreatedEvent({ product: product }));
      //console.log('PUBLISHER WORKS FINE');
      //product.record(new ProductCreatedEvent({ id: product.id.value, productName: product.name.value }));
    }
    return product;
  }
}
