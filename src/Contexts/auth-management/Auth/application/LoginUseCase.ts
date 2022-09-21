import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { LoginRepository } from '../domain/interfaces/LoginRepository';

@injectable()
export class LoginUseCase {
  constructor(@inject('LoginRepository') private loginRepository: LoginRepository) {
    this.loginRepository = loginRepository;
  }

  async execute(email: string, password: string) {
    //const encryptedPassword = await bcrypt.hash(password, 10);
    if (!this.loginRepository.exists(email)) {
      throw new Error('User not found');
    }
    const user = await this.loginRepository.find(email);
    if (bcrypt.compare(user.password, password)) {
      return new Error('Password is not correct');
    }
    await this.loginRepository.login(email, password);
  }
}
