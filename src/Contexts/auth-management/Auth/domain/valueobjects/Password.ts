export class Password {
  readonly value: string;
  constructor(value: string) {
    Password.passwordValidation(value)
    this.value = value;
  }

  public static passwordValidation(value: string): boolean | never {
    //TODO Customize exception
    if (value.length < 8) throw new Error('Password must be 8 characters long at minimum')
    
    //TODO implement more logic to the validation, caps, special chars...
    //TODO extract ContainsSpecialChars into a common util within Shared for this to help password validation
    return true;
  }
}