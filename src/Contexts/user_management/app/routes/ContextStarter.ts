import { Router } from 'express';
import { container, registry } from 'tsyringe';
import { RabbitMqImpl } from '../../../shared/infrastructure/events/RabbitMqImpl';
import { PostgresRegisterRepository } from '../../Auth/infrastructure/typeorm/repositories/PostgresRegisterRepository';

@registry([
  { token: 'UserRepository', useClass: PostgresUserRepository },
  { token: 'EventManager', useClass: RabbitMqImpl }
])
export class ContextStarter {
  public static run(router: Router) {
    router.use('/', container.resolve(sdsd).routes());
  }
}
