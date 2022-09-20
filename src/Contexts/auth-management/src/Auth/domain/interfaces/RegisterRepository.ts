import { User } from '../User';

export interface RegisterRepository {
  create(user: User): Promise<void>;
  exists(id: string): Promise<boolean>;
}