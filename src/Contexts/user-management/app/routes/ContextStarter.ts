import "reflect-metadata";
import { container, Lifecycle } from 'tsyringe';
import { EventSubject } from "../../../shared/infrastructure/events/EventSubject";
import { RabbitMqImpl } from '../../../shared/infrastructure/events/RabbitMqImpl';
import { UserMapperImpl } from "../../User/infrastructure/mappers/UserMapperImpl";
import { UserRepositoryImpl } from "../../User/infrastructure/typeorm/repositories/UserRepositoryImpl";
import { UserCreatedController } from '../../User/infrastructure/UserCreatedController';
import { QueueInitializer } from '../QueueInitializer';

export class ContextStarter {
  public static async run() {
    container.register<RabbitMqImpl>(
      "EventManager",
      { useClass: RabbitMqImpl },
      { lifecycle: Lifecycle.Singleton }
    );
    container.register<EventSubject>(
      "EventSubject",
      { useClass: EventSubject },
      { lifecycle: Lifecycle.Singleton }
    );
    container.register<UserRepositoryImpl>(
      "UserRepository",
      { useClass: UserRepositoryImpl },
      { lifecycle: Lifecycle.Singleton }
    )
    container.register<UserMapperImpl>(
      "UserMapper",
      { useClass: UserMapperImpl }
    )

    console.log(container)
    await container.resolve(RabbitMqImpl);
    await container.resolve(QueueInitializer).run();
    container.resolve(UserCreatedController).run();
  }
}
