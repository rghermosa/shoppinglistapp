import { Request, Response, Router } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { GetProductUseCase } from '../application/GetProductUseCase';

@injectable()
export class GetProductController {
  router: Router;

  constructor(
    @inject(delay(() => GetProductUseCase))
    public getProductUseCase: GetProductUseCase
  ) {
    this.getProductUseCase = getProductUseCase;
    this.router = new (Router as any)();
  }

  async run(req: Request, res: Response) {
    try {
      await res.send(await this.getProductUseCase.execute(req.params.id));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.json({ Error: error.message });
      }
    }
  }
}
