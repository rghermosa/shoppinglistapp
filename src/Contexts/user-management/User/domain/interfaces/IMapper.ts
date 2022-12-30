import { GenericMapper } from '../../../../shared/domain/interfaces/GenericMapper'
import { UserDto } from '../../application/dto/UserDto';
import { User } from '../User';

export interface IMapper extends GenericMapper {
    fromExternalToDto(any: any): Promise<any>;
    toObject(user: User);
}