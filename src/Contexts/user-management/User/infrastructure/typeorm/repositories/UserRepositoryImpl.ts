import { UserRepository } from "../../../domain/interfaces/UserRepository";
import { User } from "../../../domain/User";
import { User as UserEntity } from '../entities/User'
import { UserAlreadyExistsException } from '../../../../../shared/domain/Exceptions/UserAlreadyExistsException'
import { inject, injectable } from "tsyringe";
import { IMapper } from "../../../domain/interfaces/IMapper";

@injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(@inject('UserMapper') private userMapper: IMapper) {
        this.userMapper = userMapper;
    }

    async create(userDomain: User): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const userExists = await this.exists(userDomain.email.value);
            if (userExists) throw new UserAlreadyExistsException();
            const user: UserEntity = new UserEntity();
            ({ id: user.id, email: user.email, name: user.name, lastName: user.lastName } = this.userMapper.toObject(userDomain))
            user.save();
            resolve();
        });
    }

    async exists(email: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            (await UserEntity.findOneBy({ email: `${email}` })) ? resolve(true) : resolve(false);
        });
    }
}