import { User } from "../User";

export interface EventManager {
  dispatchEvents(user: User);
}