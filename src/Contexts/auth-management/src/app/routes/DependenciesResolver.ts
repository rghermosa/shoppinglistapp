import { Router } from 'express';
import { container, registry } from 'tsyringe';
import { RegisterController } from '../../Register/infrastructure/RegisterController';
import { PostgresRegisterRepository } from '../../Register/infrastructure/typeorm/repositories/PostgresRegisterRepository';

@registry([{ token: 'RegisterRepository', useClass: PostgresRegisterRepository }])
export class DependenciesResolver {
  public static run(router: Router) {
    router.use('/signup', container.resolve(RegisterController).routes());
    router.use('/login');
  }
}
