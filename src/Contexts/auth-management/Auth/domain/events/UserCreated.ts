import { DomainEvent } from '../../../../shared/domain/events/common/DomainEvent'

export class UserCreated extends DomainEvent {
    readonly email: string;
    readonly name: string;
    readonly lastName: string;

    constructor(email: string, name: string, lastName: string) {
        super();
        this.email = email;
        this.name = name;
        this.lastName = lastName;
    }
}