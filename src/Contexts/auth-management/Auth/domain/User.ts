
import { Email } from "../../../shared/domain/valueObjects/Email";
import { Password } from "./valueobjects/Password";
import { Id } from "../../../shared/domain/valueObjects/Id"
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { QueueNames } from "./events/QueueNames";

export class User extends AggregateRoot {
  readonly email: Email;
  readonly password: Password;
  private constructor(email: Email, password: Password, id: Id) {
    super();
    this.email = email;
    this.password = password;
    this.id = id;
  }

  public static create(emailValue: string, passwordValue: string, idValue?: string): User {
    const email: Email = new Email(emailValue);
    const password: Password = new Password(passwordValue)
    const id: Id = new Id(idValue);

    const user: User = new User(email, password, id);
    user.addEvent(user, QueueNames.USER_CREATED);
    return user;
  }
}