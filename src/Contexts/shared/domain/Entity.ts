import { Id } from './valueObjects/Id';
import { Name } from './valueObjects/Name';

export class Entity {
  readonly id: Id;
  readonly name: Name;
  constructor(id: Id, name: Name) {
    this.id = id;
    this.name = name;
  }
}
