import { ProductId } from '../../../domain/valueobjects/ProductId';
import { ProductNotFoundException } from '../../../domain/Exceptions/ProductNotFoundException';
import { Product } from '../../../domain/Product';
import { ProductRepository } from '../../../domain/ProductRepository';
import { ProductMap } from '../../ProductMap';
import { Product as ProductEntity } from '../entities/Product';

export class PostgreSQLProductRepository implements ProductRepository {
  async create(productDomain: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      const productEntity: ProductEntity = new ProductEntity();
      productEntity.id = productDomain.id.value;
      productEntity.name = productDomain.name.value;
      productEntity.category = productDomain.category;
      productEntity.price = productDomain.price.value;
      productEntity.brand = productDomain.brand.value;
      productEntity.save();
      resolve();
    });
  }

  async save(product: Product): Promise<void> {
    return new Promise((resolve, reject) => {
      //TODO USECASE
    });
  }

  async getAll(): Promise<Product[] | void> {
    return new Promise(async (resolve, reject) => {
      const productEntities = await ProductEntity.find();
      const products: Product[] = [];
      productEntities.map(async (b) => products.push(await ProductMap.toDomain(b)));
      resolve(products);
    });
  }

  async find(id: ProductId): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      const obj = await ProductEntity.findBy({ id: `${id}` });
      if (obj instanceof Product) {
        resolve(obj);
      }
      throw new ProductNotFoundException(id.value);
    });
  }

  async search(): Promise<Product | void> {}

  async exists(id: ProductId): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      (await ProductEntity.findBy({ id: `${id}` })) ? resolve(true) : resolve(false);
    });
  }
}
