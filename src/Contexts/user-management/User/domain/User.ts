import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { DomainEvent } from "../../../shared/domain/events/common/DomainEvent";
import { Email } from "../../../shared/domain/valueObjects/Email";
import { Id } from "../../../shared/domain/valueObjects/Id";
import { Name } from "../../../shared/domain/valueObjects/Name";
import { UserCreated } from "./events/UserCreated";
import { DateOfBirth } from './valueobjects/DateOfBirth'

export class User extends AggregateRoot {
  readonly email: Email;
  readonly name: Name;
  readonly lastName: Name;
  readonly dateOfBirth?: DateOfBirth;

  constructor(id: Id, name: Name, lastName: Name, email: Email) {
    super(id);
    this.name = name;
    this.lastName = lastName;
    this.email = email;
  }

  public static async create(id: string, name: string, lastName: string, email: string): Promise<User> {
    const idVO: Id = new Id(id);
    const nameVO: Name = new Name(name);
    const lastNameVO: Name = new Name(lastName);
    const emailVO: Email = new Email(email);

    return new User(idVO, nameVO, lastNameVO, emailVO);
  }

  async buildDomainEvent(): Promise<DomainEvent> {
    return new UserCreated();
  }
}