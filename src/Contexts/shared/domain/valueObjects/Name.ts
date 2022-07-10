import { NameContainingSpecialCharsException } from '../Exceptions/NameContainingSpecialCharsException';
import { NameTooShortException } from '../Exceptions/NameTooShortException';

export class Name {
  private value: string;
  constructor(value: string) {
    Name.nameValidation(value);
    this.value = value;
  }

  public changeName(value: string): void {
    Name.nameValidation(value);
    this.value = value;
  }

  public static nameValidation(value: string): boolean | never {
    if (Name.containsSpecialChars(value)) {
      throw new NameContainingSpecialCharsException(value);
    }
    if (value.length < 2) {
      throw new NameTooShortException(value);
    }
    return true;
  }

  public static containsSpecialChars(value: string) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
    return specialChars.test(value);
  }
}
