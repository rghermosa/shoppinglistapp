import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../domain/interfaces/UserRepository';

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepository') private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async run() {
    //this.userRepository.create();
  }
}