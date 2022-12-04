import { UserAlreadyExistsException } from '../../../../../shared/domain/Exceptions/UserAlreadyExistsException';
import { RegisterRepository } from '../../../domain/interfaces/RegisterRepository';
import { User } from '../../../domain/User';
import { UserMapper } from '../../UserMapper';
import { User as UserEntity } from '../entities/User';

export class PostgresRegisterRepository implements RegisterRepository {
  async create(userDomain: User, token: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const userExists = await this.exists(userDomain.email.value);
      if (userExists) throw new UserAlreadyExistsException();
      const user: UserEntity = new UserEntity();
      ({id: user.id, email: user.email, password: user.password} = UserMapper.toObject(userDomain))
      user.token = token;
      user.save();
      resolve();
    });
  }

  async exists(email: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      (await UserEntity.findOneBy({ email: `${email}` })) ? resolve(true) : resolve(false);
    });
  }
}
