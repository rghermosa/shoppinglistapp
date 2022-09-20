import express, { Router, Request, Response } from 'express';
import { container, registry } from 'tsyringe';
import { BrandController } from '../../Brands/infrastructure/BrandController';
import { InMemoryBrandRepository } from '../../Brands/infrastructure/inMemory/InMemoryBrandRepository';
import { PostgreSQLBrandRepository } from '../../Brands/infrastructure/typeorm/repositories/PostgreSQLBrandRepository';
import { InMemoryProductRepository } from '../../Products/infrastructure/inMemory/InMemoryProductRepository';
import { ProductController } from '../../Products/infrastructure/ProductController';
import { PostgreSQLProductRepository } from '../../Products/infrastructure/typeorm/repositories/PostgreSQLProductRepository';

// @registry([
//   { token: 'BrandRepository', useClass: PostgreSQLBrandRepository },
//   { token: 'ProductRepository', useClass: PostgreSQLProductRepository },
// ])
export class DependenciesResolver {
  public static run(router: Router) {
    container.register('BrandRepository', PostgreSQLBrandRepository);
    console.log('BrandRepository added...');

    container.register('ProductRepository', PostgreSQLProductRepository);
    console.log('ProductRepository added...');

    router.use('/brand', container.resolve(BrandController).routes());
    router.use('/product', container.resolve(ProductController).routes());
  }
}
