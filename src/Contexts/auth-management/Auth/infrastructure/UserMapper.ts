import { User } from '../domain/User';

export class UserMapper {
  public static toDomain(raw: any): Promise<User> {
    return new Promise((resolve, reject) => {
      console.log(raw, 'raw');
      const user: User = User.create(raw.email, raw.password, raw.id);
      resolve(user);
    });
  }

  public static toPersistence(user: User): any {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
    };
  }
}
