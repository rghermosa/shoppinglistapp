import { RegisterRepository } from '../../../domain/interfaces/RegisterRepository';
import { User } from '../../../domain/User';
import { User as UserEntity } from '../entities/User';

export class PostgresRegisterRepository implements RegisterRepository {
  async create(userDomain: User): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const user: UserEntity = new UserEntity();
    });
  }
}
