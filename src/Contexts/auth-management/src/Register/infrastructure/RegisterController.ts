import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { RegisterUserController } from './RegisterUserController';

@injectable()
export class RegisterController {
  router: Router;
  constructor() {
    this.router = new (Router as any)();
  }

  routes() {
    this.router.post('/', (req, res) => {
      const registerUser = container.resolve(RegisterUserController);
      registerUser.run(req, res);
    });

    return this.router;
  }
}
