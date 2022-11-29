import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { EventManager } from '../domain/interfaces/EventManager';
import { RegisterRepository } from '../domain/interfaces/RegisterRepository';
import { User } from '../domain/User';
dotenv.config();

@injectable()
export class RegisterUserUseCase {
  constructor(@inject('RegisterRepository') private userRepository: RegisterRepository,
  @inject('EventManager') private eventManager: EventManager) {
    this.userRepository = userRepository;
    this.eventManager = eventManager;
  }

  async execute(email: string, password: string) {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = await bcrypt.hashSync(password, salt);
    const user: User = User.create(email, encryptedPassword);
    console.log(user);

    const token = jwt.sign({ user_id: user.id, email }, 'QWERTY', { expiresIn: '24h' });
    await this.userRepository.create(user, token);
    await this.eventManager.dispatchEvents(user);
    await user.clearEvents();
  }
}
