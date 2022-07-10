import express, { Router, Request, Response } from 'express';
import { container } from 'tsyringe';
import { BrandController } from '../../Brands/infrastructure/BrandController';
import { InMemoryBrandRepository } from '../../Brands/infrastructure/persistence/InMemoryBrandRepository';
import { InMemoryProductRepository } from '../../Products/infrastructure/persistence/InMemoryProductRepository';
import { ProductController } from '../../Products/infrastructure/ProductController';

export function resolveDependencies(router: Router) {
  container.register('BrandRepository', {
    useClass: InMemoryBrandRepository,
  });
  container.register('ProductRepository', {
    useClass: InMemoryProductRepository,
  });
  router.use('/brand', container.resolve(BrandController).routes());
  router.use('/product', container.resolve(ProductController).routes());
}
