import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginRepository } from '../../../domain/interfaces/LoginRepository';
import { User as UserDomain } from '../../../domain/User';
import { UserMapper } from '../../UserMapper';
import { User } from '../entities/User';

export class PostgresRegisterRepository implements LoginRepository {
  async login(email: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!this.exists(email)) {
        throw new Error('User not found');
      }
      const user = await this.findToDomain(email);
      if (bcrypt.compare(user.password, password)) {
        return new Error('Password is not correct');
      }
      const token = jwt.sign({ user_id: user.id, email }, 'QWERTY', { expiresIn: '24h' });
      const userFound = await User.findOneByOrFail({ email });
      userFound.token = token;
    });
  }

  async findToDomain(email: string): Promise<UserDomain> {
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
