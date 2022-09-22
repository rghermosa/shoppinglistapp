import { User } from '../User';

export interface LoginRepository {
  login(email: string, password: string): Promise<void>;
  findToDomain(email: string): Promise<User>;
  exists(email: string): Promise<boolean>;
}
