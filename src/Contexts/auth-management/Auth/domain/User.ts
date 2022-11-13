
import { Email } from "./valueobjects/Email";
import { Password } from "./valueobjects/Password";
import { Id } from "../../../shared/domain/valueObjects/Id"

export class User {
  readonly email: Email;
  readonly password: Password;
  readonly id: Id;
  private constructor(email: Email, password: Password, id?: Id) {
    this.email = email;
    this.password = password;
    this.id = id;
  }

  public static create(emailValue: string, passwordValue: string, idValue?: string): User {
    const isNewlyCreated = !!idValue === false;

    const email: Email = new Email(emailValue);
    const password: Password = new Password(passwordValue)
    const id: Id = new Id(idValue);
    if (isNewlyCreated) {
      return new User(email, password);
    }
    
    return new User(email, password, id);
  } 
}