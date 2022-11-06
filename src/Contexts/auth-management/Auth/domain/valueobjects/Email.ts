export class Email {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }
  
  public static emailValidation(value: string): boolean | never {
    if (this.containsSpecialChars) {
      //TODO needs to be replaced by a containsSpecialChars exception that needs to be moved to a shared TS code folder
      throw new Error('')
    }

    return true;
  }
  // TODO needs to be moved to shared TS code folder, used across different microservices
  public static containsSpecialChars(value: string) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/;
    return specialChars.test(value);
  }

}