import { LoginRepository } from '../../../domain/interfaces/LoginRepository';
import { User as UserDomain } from '../../../domain/User';
import { UserMapper } from '../../UserMapper';
import { User } from '../entities/User';

export class PostgresRegisterRepository implements LoginRepository {
  async login(email: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {});
  }

  async find(email: string): Promise<UserDomain> {
    return new Promise(async (resolve, reject) => {
      const user: UserDomain = await UserMapper.toDomain(User.findOneBy({ email }));
      resolve(user);
    });
  }

  async exists(email: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const found = User.findOneBy({ email });
      found ? resolve(true) : resolve(false);
    });
  }
}
