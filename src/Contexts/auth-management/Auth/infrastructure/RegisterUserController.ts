import { Request, Response, Router } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { RegisterUserUseCase } from '../application/RegisterUserUseCase';

@injectable()
export class RegisterUserController {
  router: Router;

  constructor(
    @inject(delay(() => RegisterUserUseCase))
    private registerUserUseCase: RegisterUserUseCase
  ) {
    this.registerUserUseCase = registerUserUseCase;
    this.router = new (Router as any)();
  }

  async run(req: Request, res: Response) {
    try {
      await this.registerUserUseCase.execute(req.body.name, req.body.lastName, req.body.email, req.body.password);
      res.send({ status: 'OK' }).status(201);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.json({ Error: error.message });
      }
    }
  }
}
