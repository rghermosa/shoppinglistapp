import { User } from "../User";

export interface UserRepository {
  create(user: User): Promise<void>;
  exists(id: string): Promise<boolean>;
}
