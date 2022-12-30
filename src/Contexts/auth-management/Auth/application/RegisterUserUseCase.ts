import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IEventManager } from '../../../shared/domain/events/common/IEventManager';
import { USER, USERS, USER_CREATED } from '../../../shared/infrastructure/events/MQconstants';
import { RegisterRepository } from '../domain/interfaces/RegisterRepository';
import { User } from '../domain/User';
dotenv.config();

@injectable()
export class RegisterUserUseCase {
  constructor(@inject('RegisterRepository') private userRepository: RegisterRepository,
    @inject('EventManager') private eventManager: IEventManager) {
    this.userRepository = userRepository;
    this.eventManager = eventManager;
  }

  async execute(name: string, lastName: string, email: string, password: string) {
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = await bcrypt.hashSync(password, salt);
    const user: User = User.create(name, lastName, email, encryptedPassword);

    const token = jwt.sign({ user_id: user.id, email }, 'QWERTY', { expiresIn: '24h' });
    await this.userRepository.create(user, token);
    await this.eventManager.dispatchEvents(USER, user, USERS);
    await user.clearEvents();
  }
}
