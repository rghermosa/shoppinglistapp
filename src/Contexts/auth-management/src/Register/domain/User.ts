export class User {
  private email: string;
  private password: string;

  private constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  public static create(email: string, password: string) {
    return new User(email, password);
  }
}
