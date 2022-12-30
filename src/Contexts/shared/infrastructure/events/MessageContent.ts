import { DomainEventBodyCommon } from "../../domain/events/common/DomainEventBodyCommon";

export interface MessageContent {
    id: string;
    body: DomainEventBodyCommon;
    createdAt: string;
}