import { injectable } from 'tsyringe';

@injectable()
export class LoginController {
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
      console.log(req.body);
      await this.registerUserUseCase.execute(req.body.email, req.body.password);
      res.send({ status: 'OK' }).status(201);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.json({ Error: error.message });
      }
    }
  }
}
