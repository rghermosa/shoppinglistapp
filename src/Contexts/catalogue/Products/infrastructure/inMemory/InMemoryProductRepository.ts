import { ProductId } from '../../domain/valueobjects/ProductId';
import { ProductNotFoundException } from '../../domain/Exceptions/ProductNotFoundException';
import { Product } from '../../domain/Product';
import { ProductRepository } from '../../domain/ProductRepository';

export class InMemoryProductRepository implements ProductRepository {
  private static products: Array<Product> = [];

  async create(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      InMemoryProductRepository.products.push(product);
      resolve();
    });
  }

  async save(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = InMemoryProductRepository.products.indexOf(product);
      InMemoryProductRepository.products[index] = product;
      resolve();
    });
  }

  async getAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      resolve(InMemoryProductRepository.products);
    });
  }

  async find(id: ProductId): Promise<Product> {
    return new Promise((resolve, reject) => {
      const obj = InMemoryProductRepository.products.find((o) => o.id.value === id.value);
      if (obj instanceof Product) {
        resolve(obj);
      }
      throw new ProductNotFoundException(id.value);
    });
  }

  async search(): Promise<Product | void> {}

  async exists(id: ProductId): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      InMemoryProductRepository.products.filter((product) => product.id == id) ? resolve(true) : resolve(false);
    });
  }
}
