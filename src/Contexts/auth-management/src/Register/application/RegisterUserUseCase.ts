import { inject, injectable } from 'tsyringe';
import { RegisterRepository } from '../domain/interfaces/RegisterRepository';
import { User } from '../domain/User';

@injectable()
export class RegisterUserUseCase {
  constructor(@inject('RegisterRepository') private userRepository: RegisterRepository) {
    this.userRepository = userRepository;
  }

  async execute(email: string, password: string) {
    const user: User = User.create(email, password);
    await this.userRepository.create(user);
  }
}
