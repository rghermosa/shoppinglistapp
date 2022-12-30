import { DomainEvent } from './events/common/DomainEvent'
import { Id } from './valueObjects/Id'

export abstract class AggregateRoot {
  readonly domainEvents: DomainEvent[] = [];
  readonly id: Id;
  constructor(id: Id) {
    this.id = id
  }

  abstract buildDomainEvent(): Promise<DomainEvent>;

  async addEvent(): Promise<void> {
    await this.domainEvents.push(await this.buildDomainEvent());

  }

  async clearEvents(): Promise<void> {
    await this.domainEvents.splice(0);
  }
}