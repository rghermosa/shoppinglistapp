import { Router } from 'express';
import { container, registry } from 'tsyringe';
import { AuthController } from '../../Auth/infrastructure/AuthController';
import { RabbitMqImpl } from '../../../shared/infrastructure/events/RabbitMqImpl';
import { PostgresRegisterRepository } from '../../Auth/infrastructure/typeorm/repositories/PostgresRegisterRepository';

@registry([
  { token: 'RegisterRepository', useClass: PostgresRegisterRepository },
  { token: 'EventManager', useClass: RabbitMqImpl }
])
export class ContextStarter {
  public static run(router: Router) {
    router.use('/', container.resolve(AuthController).routes());
  }
}
