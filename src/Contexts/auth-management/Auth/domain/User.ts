import { v4 as uuid } from 'uuid';
export class User {
  readonly email: string;
  readonly password: string;
  readonly id: string;

  private constructor(email: string, password: string, id: string) {
    this.email = email;
    this.password = password;
    this.id = id;
  }

  public static create(email: string, password: string, id?: string) {
    const fid = id === undefined || null ? uuid() : id;
    console.log(fid);
    return new User(email, password, fid);
  }
}