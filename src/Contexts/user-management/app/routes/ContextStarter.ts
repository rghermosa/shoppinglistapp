import "reflect-metadata";
import { container, inject, Lifecycle, registry } from 'tsyringe';
import { IEventManager } from '../../../shared/domain/events/IEventManager';
import { RabbitMqImpl } from '../../../shared/infrastructure/events/RabbitMqImpl';
import { QueuesToCreate } from '../../User/infrastructure/events/QueuesToCreate';
import { UserCreatedController } from '../../User/infrastructure/UserCreatedController';
import { QueueInitializer } from '../QueueInitializer';

// @registry([
//   //{ token: 'UserRepository', useClass: PostgresUserRepository },
//   { token: 'EventManager', useClass: RabbitMqImpl, }
// ])
export class ContextStarter {
  public static async run() {
    container.register(
      "EventManager",
      { useClass: RabbitMqImpl },
      { lifecycle: Lifecycle.Singleton }
    );
    await container.resolve(QueueInitializer).run();

    container.resolve(UserCreatedController).run();
  }
}
