import { DomainEvent } from "../../../../shared/domain/events/common/DomainEvent";
import { User } from "../User";

export interface UserRepository {
  create(user: User): Promise<void>;
  exists(id: string): Promise<boolean>;
}
