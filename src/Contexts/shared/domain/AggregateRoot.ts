import { DomainEvent } from './events/DomainEvent'
import { Id } from './valueObjects/Id'

export abstract class AggregateRoot {
  readonly domainEvents: DomainEvent[] = [];
  readonly id: Id;
  async addEvent(aggregate: AggregateRoot, queue: string): Promise<void> {
    await this.domainEvents.push(new DomainEvent(queue, aggregate.id.value));
  }

  async clearEvents(): Promise<void> {
    await this.domainEvents.splice(0);
  }
}