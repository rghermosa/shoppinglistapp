import { BrandId } from '../../../Shared/domain/valueobjects/BrandId';
import { ProductId } from '../../../Shared/domain/valueobjects/ProductId';
import { ProductName } from '../../../Shared/domain/valueobjects/ProductName';
import { ProductNotFoundException } from '../../domain/Exceptions/ProductNotFoundException';
import { Product } from '../../domain/Product';
import { ProductRepository } from '../../domain/ProductRepository';
import { ProductCategory } from '../../domain/valueobjects/ProductCategory';
import { ProductPrice } from '../../domain/valueobjects/ProductPrice';

export class InMemoryProductRepository implements ProductRepository {
  private static products: Array<Product> = [];
  constructor() {}

  async create(
    id: ProductId,
    name: ProductName,
    category: ProductCategory,
    price: ProductPrice,
    brandId: BrandId
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const product: Product = Product.create(
        id,
        name,
        category,
        price,
        brandId
      );
      InMemoryProductRepository.products.push(product);
      console.log(InMemoryProductRepository.products);
      resolve();
    });
  }

  async save(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = InMemoryProductRepository.products.indexOf(product);
      InMemoryProductRepository.products[index] = product;
      console.log(product);
      resolve();
    });
  }

  async getAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      console.log(InMemoryProductRepository.products);
      resolve(InMemoryProductRepository.products);
    });
  }

  async find(id: ProductId): Promise<Product> {
    return new Promise((resolve, reject) => {
      const obj = InMemoryProductRepository.products.find(
        (o) => o.id.value === id.value
      );
      if (obj instanceof Product) {
        resolve(obj);
      }
      throw new ProductNotFoundException(id.value);
    });
  }

  async search(): Promise<Product | void> {}
}
