import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { RegisterUserController } from './RegisterUserController';

@injectable()
export class AuthController {
  router: Router;
  constructor() {
    this.router = new (Router as any)();
  }

  routes() {
    this.router.post('/signup', (req, res) => {
      const registerUser = container.resolve(RegisterUserController);
      registerUser.run(req, res);
    });

    return this.router;
  }
}
