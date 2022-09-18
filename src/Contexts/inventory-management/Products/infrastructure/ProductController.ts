import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { CreateProductController } from './CreateProductController';
import { GetProductController } from './GetProductController';

@injectable()
export class ProductController {
  router: Router;
  constructor() {
    this.router = new (Router as any)();
  }

  routes() {
    this.router.post('/', (req, res) => {
      const createProduct = container.resolve(CreateProductController);
      createProduct.run(req, res);
    });

    this.router.get('/:id', (req, res) => {
      const getProduct = container.resolve(GetProductController);
      getProduct.run(req, res);
    });

    return this.router;
  }
}
