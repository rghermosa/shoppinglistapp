import { AggregateRoot } from "../AggregateRoot";

export interface IEventManager {
  dispatchEvents(aggregate: AggregateRoot);
}