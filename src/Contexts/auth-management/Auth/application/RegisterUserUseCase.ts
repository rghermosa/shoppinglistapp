import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { RegisterRepository } from '../domain/interfaces/RegisterRepository';
import { User } from '../domain/User';
dotenv.config();

@injectable()
export class RegisterUserUseCase {
  constructor(@inject('RegisterRepository') private userRepository: RegisterRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string) {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user: User = User.create(email, encryptedPassword);
    console.log(user);
    const token = jwt.sign({ user_id: user.id, email }, 'QWERTY', { expiresIn: '24h' });

    await this.userRepository.create(user, token);
  }
}
