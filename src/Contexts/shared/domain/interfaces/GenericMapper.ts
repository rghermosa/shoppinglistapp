import { AggregateRoot } from "../AggregateRoot";

export interface GenericMapper {
    toDomain(something: any): Promise<AggregateRoot>;
}