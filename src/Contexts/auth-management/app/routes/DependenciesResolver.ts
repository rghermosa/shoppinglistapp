import { Router } from 'express';
import { container, registry } from 'tsyringe';
import { AuthController } from '../../Auth/infrastructure/AuthController';
import { PostgresLoginRepository } from '../../Auth/infrastructure/typeorm/repositories/PostgresLoginRepository';
import { PostgresRegisterRepository } from '../../Auth/infrastructure/typeorm/repositories/PostgresRegisterRepository';

@registry([
  { token: 'RegisterRepository', useClass: PostgresRegisterRepository },
  { token: 'LoginRepository', useClass: PostgresLoginRepository },
])
export class DependenciesResolver {
  public static run(router: Router) {
    router.use('/', container.resolve(AuthController).routes());
  }
}
