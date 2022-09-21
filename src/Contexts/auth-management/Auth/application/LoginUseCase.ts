import { inject, injectable } from 'tsyringe';
import { LoginRepository } from '../domain/interfaces/LoginRepository';

@injectable()
export class LoginUseCase {
  constructor(@inject('LoginRepository') private loginRepository: LoginRepository) {
    this.loginRepository = loginRepository;
  }

  async execute(email: string, password: string) {
    await this.loginRepository.login(email, password);
  }
}
