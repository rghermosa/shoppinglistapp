import { AggregateRoot } from "../../AggregateRoot";

export interface IDomainEvent {
    readonly id: string;
    readonly createdAt: Date;
}