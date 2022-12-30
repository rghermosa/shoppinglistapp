import { Router } from 'express';
import { container, Lifecycle, registry } from 'tsyringe';
import { AuthController } from '../../Auth/infrastructure/AuthController';
import { RabbitMqImpl } from '../../../shared/infrastructure/events/RabbitMqImpl';
import { PostgresRegisterRepository } from '../../Auth/infrastructure/typeorm/repositories/PostgresRegisterRepository';
import { QueueInitializer } from '../QueueInitializer';
import { EventSubject } from '../../../shared/infrastructure/events/EventSubject';

@registry([
  { token: 'RegisterRepository', useClass: PostgresRegisterRepository },
])
export class ContextStarter {
  public static async run(router: Router) {
    container.register(
      "EventManager",
      { useClass: RabbitMqImpl },
      { lifecycle: Lifecycle.Singleton }
    );
    container.registerSingleton<EventSubject>('EventSubject', EventSubject)
    container.resolve(RabbitMqImpl)
    await container.resolve(QueueInitializer).run();

    router.use('/', container.resolve(AuthController).routes());
  }
}
