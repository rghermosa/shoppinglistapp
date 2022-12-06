import { AggregateRoot } from "../AggregateRoot";

export interface IEventManager {
  dispatchEvents(exchange: string, aggregate: AggregateRoot, routingKey: string): Promise<void>;
  initialize(queues: string[], exchange: string[], routingKey: string): Promise<void>;
  consume(queues: string[]): Promise<void>;
}