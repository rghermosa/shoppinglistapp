
import { Email } from "./valueobjects/Email";
import { Password } from "./valueobjects/Password";

export class User {
  readonly email: Email;
  readonly password: Password;
  private constructor(email: Email, password: Password) {
    this.email = email;
    this.password = password;
  }

  public static create(emailValue: string, passwordValue: string) {
    const email: Email = new Email(emailValue);
    const password: Password = new Password(passwordValue)
    new User(email, password);
  } 
}