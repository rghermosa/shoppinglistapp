import { Router } from 'express';
import { container, injectable } from 'tsyringe';
import { LoginController } from './LoginController';
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

    this.router.post('/login', (req, res) => {
      const loginUser = container.resolve(LoginController);
      loginUser.run(req, res);
    });

    return this.router;
  }
}
