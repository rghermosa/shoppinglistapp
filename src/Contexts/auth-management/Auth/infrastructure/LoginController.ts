import { Request, Response, Router } from 'express';
import { delay, inject, injectable } from 'tsyringe';
import { LoginUseCase } from '../application/LoginUseCase';

@injectable()
export class LoginController {
  router: Router;

  constructor(
    @inject(delay(() => LoginUseCase))
    private loginUseCase: LoginUseCase
  ) {
    this.loginUseCase = loginUseCase;
    this.router = new (Router as any)();
  }

  async run(req: Request, res: Response) {
    try {
      await this.loginUseCase.execute(req.body.email, req.body.password);
      res.send({ status: 'OK' }).status(201);
    } catch (error) {
      console.log(error instanceof Error);
      if (error instanceof Error) {
        console.error(error.message);
        res.json({ Error: error.message });
      }
    }
  }
}
