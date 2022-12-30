import { inject, injectable } from 'tsyringe';
import { IMapper } from '../domain/interfaces/IMapper';
import { UserRepository } from '../domain/interfaces/UserRepository';
import { User } from '../domain/User';
import { UserDto } from './dto/UserDto';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('UserMapper') private userMapper: IMapper) {
    this.userRepository = userRepository;
    this.userMapper = userMapper;
  }

  async run(userDto: UserDto) {
    console.log(userDto)
    const user: User = await User.create(userDto.id, userDto.name, userDto.lastName, userDto.email)
    await this.userRepository.create(user);
  }
}