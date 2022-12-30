
import { Email } from "../../../shared/domain/valueObjects/Email";
import { Name } from "../../../shared/domain/valueObjects/Name";
import { Password } from "./valueobjects/Password";
import { Id } from "../../../shared/domain/valueObjects/Id"
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { QueueNames } from "./events/QueueNames";
import { DomainEvent } from "../../../shared/domain/events/common/DomainEvent";
import { UserCreated } from "./events/UserCreated"

export class User extends AggregateRoot {
  readonly name: Name;
  readonly lastName: Name;
  readonly email: Email;
  readonly password: Password;

  private constructor(name: Name, lastName: Name, email: Email, password: Password, id: Id) {
    super(id);
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  public static create(nameValue: string, lastNameValue: string, emailValue: string, passwordValue: string, idValue?: string): User {
    const name: Name = new Name(nameValue);
    const lastName: Name = new Name(lastNameValue);
    const email: Email = new Email(emailValue);
    const password: Password = new Password(passwordValue)
    const id: Id = new Id(idValue);

    const user: User = new User(name, lastName, email, password, id);
    user.addEvent();

    return user;
  }

  async buildDomainEvent(): Promise<DomainEvent> {
    return new UserCreated(this.email.value, this.name.value, this.lastName.value);
  }
}