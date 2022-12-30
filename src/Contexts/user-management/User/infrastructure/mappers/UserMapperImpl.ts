import { UserDto } from "../../application/dto/UserDto";
import { plainToInstance } from 'class-transformer';
import { User } from "../../domain/User";
import { AuthUser } from "../external/dto/AuthUser";
import { IMapper } from "../../domain/interfaces/IMapper";

export class UserMapperImpl implements IMapper {
    public async toDomain(raw: any): Promise<User> {
        const userDto: UserDto = raw;
        const user = plainToInstance(User, userDto)
        return user;
    }

    public toObject(user: User): UserDto {
        return { id: user.id.value, email: user.email.value, name: user.name.value, lastName: user.lastName.value }
    }

    public async fromExternalToDto(authUserDto: AuthUser): Promise<UserDto> {
        console.log(authUserDto)
        const user = plainToInstance(UserDto, authUserDto)
        console.log('after mapping: ', user)
        return user
    }
}