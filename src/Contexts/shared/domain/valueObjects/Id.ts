import { v4 as uuid } from 'uuid';

export class Id {
  readonly value: string;
  constructor(value?: string) {
    value != null ? (this.value = value) : (this.value = uuid());
  }
}
