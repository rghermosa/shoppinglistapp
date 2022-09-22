import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginRepository } from '../../../domain/interfaces/LoginRepository';
import { User as UserDomain } from '../../../domain/User';
import { UserMapper } from '../../UserMapper';
import { User } from '../entities/User';

export class PostgresLoginRepository implements LoginRepository {
  async login(email: string, password: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (await !this.exists(email)) {
        throw new Error('User not found');
      }

      const user = await this.findToDomain(email);
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Password not valid');
      }
      const token = jwt.sign({ user_id: user.id, email }, 'QWERTY', { expiresIn: '24h' });
      const userFound = await User.findOneBy({ email });
      userFound.token = token;
      userFound.save();
      resolve();
    });
  }

  async findToDomain(email: string): Promise<UserDomain> {
    return new Promise(async (resolve, reject) => {
      const user: UserDomain = await UserMapper.toDomain(await User.findOneBy({ email }));
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
