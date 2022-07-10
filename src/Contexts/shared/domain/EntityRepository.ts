import { Id } from './valueObjects/Id';
import { Name } from './valueObjects/Name';

export interface EntityRepository {
  create(id: Id, name: Name): Promise<void>;
}
