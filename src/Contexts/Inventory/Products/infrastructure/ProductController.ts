import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { CreateProductController } from './CreateProductController';

@injectable()
export class ProductController {
  router: Router;
  constructor() {
    this.router = new (Router as any)();
  }

  routes() {
    //TODO DELETE VERBS IN ENDPOINTS
    this.router.post('/create', (req, res) => {
      const createProduct = container.resolve(CreateProductController);
      createProduct.run(req, res);
    });

    return this.router;
  }
}
