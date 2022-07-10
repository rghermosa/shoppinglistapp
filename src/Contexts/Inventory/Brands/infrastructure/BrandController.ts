import { Router } from 'express';
import { container, delay, inject, injectable } from 'tsyringe';
import { CreateBrandController } from './CreateBrandController';
import { GetBrandController } from './GetBrandController';
import 'reflect-metadata';
import { CreateBrandUseCase } from '../application/CreateBrandUseCase';
import { GetBrandsUseCase } from '../application/GetBrandsUseCase';

@injectable()
export class BrandController {
  router: Router;
  constructor() {
    this.router = new (Router as any)();
  }

  routes() {
    this.router.get('/get', (req, res) => {
      const getBrands = container.resolve(GetBrandController);
      getBrands.run(req, res);
    });

    this.router.post('/create', (req, res) => {
      const createBrand = container.resolve(CreateBrandController);
      createBrand.run(req, res);
    });

    return this.router;
  }
}
