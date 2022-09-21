import { RegisterRepository } from '../../../domain/interfaces/RegisterRepository';
import { User } from '../../../domain/User';
import { User as UserEntity } from '../entities/User';

export class PostgresRegisterRepository implements RegisterRepository {
  async create(userDomain: User, token: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const userExists = await this.exists(userDomain.id);
      if (userExists) {
        throw new Error('User already exists');
      }
      const user: UserEntity = new UserEntity();
      user.id = userDomain.id;
      user.email = userDomain.email;
      user.password = userDomain.password;
      user.token = token;
      user.save();
      resolve();
    });
  }

  async exists(id: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      (await UserEntity.findOneBy({ id: `${id}` })) ? resolve(true) : resolve(false);
    });
  }
}
