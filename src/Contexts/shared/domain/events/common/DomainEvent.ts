import { Id } from '../../valueObjects/Id'
import { IDomainEvent } from "./IDomainEvent";
import { v4 as uuid } from 'uuid';
import { DomainEventBodyCommon } from './DomainEventBodyCommon';
import { AggregateRoot } from '../../AggregateRoot';

export abstract class DomainEvent implements IDomainEvent {
  readonly id: string;
  readonly createdAt: Date;

  constructor(id?: string) {
    this.id = id || uuid();
    this.createdAt = new Date()
  }
}