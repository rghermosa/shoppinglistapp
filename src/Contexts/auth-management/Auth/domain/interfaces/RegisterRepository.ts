import { User } from '../User';

export interface RegisterRepository {
  create(user: User, token: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
