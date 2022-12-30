import { User } from '../domain/User';
import { User as UserEntity } from './typeorm/entities/User'

export class UserMapper {
  public static toDomain(raw: any): Promise<User> {
    return new Promise((resolve, reject) => {
      console.log(raw, 'raw');
      const user: User = User.create(raw.email, raw.password, raw.id, raw.password);
      resolve(user);
    });
  }

  public static toPersistence(user: User): any {
    return {
      id: user.id.value,
      email: user.email.value,
      password: user.password.value,
    };
  }

  public static toObject(user: User) {
    return { id: user.id.value, email: user.email.value, password: user.password.value }
  }
}
