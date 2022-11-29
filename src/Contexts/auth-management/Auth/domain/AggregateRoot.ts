import { DomainEvent } from "./events/DomainEvent";
import { User } from "./User";

export abstract class AggregateRoot {
  readonly domainEvents: DomainEvent[] = [];
  async addEvent(user: User, queue: string): Promise<void> {
    await this.domainEvents.push(new DomainEvent(queue, user.id.value));
  }

  async clearEvents(): Promise<void> {
    await this.domainEvents.splice(0);
  }
}