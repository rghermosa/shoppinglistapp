import { Router } from 'express';
import { container, registry } from 'tsyringe';
import { AuthController } from '../../Auth/infrastructure/AuthController';
import { PostgresRegisterRepository } from '../../Auth/infrastructure/typeorm/repositories/PostgresRegisterRepository';

@registry([{ token: 'RegisterRepository', useClass: PostgresRegisterRepository }])
export class DependenciesResolver {
  public static run(router: Router) {
    router.use('/', container.resolve(AuthController).routes());
  }
}
