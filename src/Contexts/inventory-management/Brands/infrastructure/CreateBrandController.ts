import { Router, Request, Response } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { CreateBrandUseCase } from '../application/command/CreateBrandUseCase';

@injectable()
export class CreateBrandController {
  router: Router;

  constructor(
    @inject(delay(() => CreateBrandUseCase))
    private createBrandUseCase: CreateBrandUseCase
  ) {
    this.createBrandUseCase = createBrandUseCase;
    this.router = new (Router as any)();
  }

  async run(req: Request, res: Response) {
    try {
      await this.createBrandUseCase.execute(req.body.name, req.body.category);
      res.send({ status: 'OK' }).status(201);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.json({ Error: error.message });
      }
    }
  }
}
