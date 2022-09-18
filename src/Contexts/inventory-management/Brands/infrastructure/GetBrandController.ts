import { Router, Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { GetBrandUseCase } from '../application/query/GetBrandUseCase';

@injectable()
export class GetBrandController {
  router: Router;

  constructor(
    @inject(delay(() => GetBrandUseCase))
    public getBrandUseCase: GetBrandUseCase
  ) {
    this.getBrandUseCase = getBrandUseCase;
    this.router = new (Router as any)();
  }

  async run(req: Request, res: Response) {
    try {
      await res.send(await this.getBrandUseCase.execute(req.params.id));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.json({ Error: error.message });
      }
    }
  }
}
