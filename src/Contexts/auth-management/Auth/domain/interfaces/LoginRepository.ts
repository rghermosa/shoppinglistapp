import { User } from '../User';

export interface LoginRepository {
  login(email: string, password: string): Promise<any>;
  findToDomain(email: string): Promise<User>;
  exists(email: string): Promise<boolean>;
}
