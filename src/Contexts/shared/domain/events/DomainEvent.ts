import { Id } from '../valueObjects/Id'
import { IDomainEvent } from "./IDomainEvent";
import { v4 as uuid } from 'uuid';

export class DomainEvent implements IDomainEvent {
  readonly id: string; // TODO SHOULD THIS BE NECESSARY? ARE WE IDENTIFYING THE AGGREGATE OR THE DOMAIN EVENT (PROBABLY THE SECOND ONE AS WE ALREADY HAVE THE DOMAIN ENTITY AS IN AGGREGATE BELOW)
  readonly queue: string;
  readonly aggregateId: Id; //TODO EXTRACT THIS COMMON CLASS TO SHARED TS CODE AND ABSTRACT THIS USER TO AGGREGATE ROOT/DOMAIN SUBJECT

  constructor(queue, aggregateId) {
    this.id = uuid();
    this.queue = queue;
    this.aggregateId = aggregateId;
  }
}