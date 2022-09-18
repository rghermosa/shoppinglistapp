import { Router, Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { GetBrandsUseCase } from '../application/query/GetBrandsUseCase';

@injectable()
export class GetBrandsController {
  router: Router;

  constructor(
    @inject(delay(() => GetBrandsUseCase))
    public getBrandsUseCase: GetBrandsUseCase
  ) {
    this.getBrandsUseCase = getBrandsUseCase;
    this.router = new (Router as any)();
  }

  async run(req: Request, res: Response) {
    res.send(await this.getBrandsUseCase.execute());
  }
}
