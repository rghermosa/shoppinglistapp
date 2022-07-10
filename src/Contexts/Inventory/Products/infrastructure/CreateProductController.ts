import { Request, Response, Router } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { CreateProductUseCase } from '../application/CreateProductUseCase';

@injectable()
export class CreateProductController {
  router: Router;
  constructor(
    @inject(delay(() => CreateProductUseCase))
    private createProductUseCase: CreateProductUseCase
  ) {
    this.createProductUseCase = createProductUseCase;
    this.router = new (Router as any)();
  }

  async run(req: Request, res: Response) {
    try {
      await this.createProductUseCase.execute(
        req.body.name,
        req.body.category,
        req.body.price,
        req.body.brand
      );
      res.send({ status: 'OK' }).status(201);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.json({ Error: error.message });
      }
    }
  }
}
