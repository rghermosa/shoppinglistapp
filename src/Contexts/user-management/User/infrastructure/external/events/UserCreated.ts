import { DomainEvent } from "../../../../../shared/domain/events/common/DomainEvent";
import { AuthUser } from "../dto/AuthUser";

export class UserCreated extends DomainEvent {
    readonly email: string;
    readonly name: string;
    readonly lastName: string;
}