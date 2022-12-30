import { EmailNotValidException } from "../Exceptions/EmailNotValidException";

export class Email {
  readonly value: string;

  constructor(value: string) {
    Email.emailValidation(value);
    this.value = value;
  }
  
  public static emailValidation(value: string): boolean | never {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) throw new EmailNotValidException(value);
    return true;
  }
}