import { Router } from 'express';
import { container, delay, inject, injectable } from 'tsyringe';
import { CreateBrandController } from './CreateBrandController';
import { GetBrandsController } from './GetBrandsController';
import { GetBrandController } from './GetBrandController';
import { constants } from '../../Products/infrastructure/constants/QueueNames';

@injectable()
export class BrandController {
  router: Router;

  constructor() {
    this.router = new (Router as any)();
  }

  routes() {
    this.router.get('/', (req, res) => {
      const getBrands = container.resolve(GetBrandsController);
      getBrands.run(req, res);
    });

    this.router.get('/:id', (req, res) => {
      const getBrand = container.resolve(GetBrandController);
      getBrand.run(req, res);
    });

    this.router.post('/', (req, res) => {
      const createBrand = container.resolve(CreateBrandController);
      createBrand.run(req, res);
    });

    return this.router;
  }
}
