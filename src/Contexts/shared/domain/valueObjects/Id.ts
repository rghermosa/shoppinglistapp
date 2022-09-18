import { v4 as uuid } from 'uuid';
import { ValueObjectGeneric } from './ValueObjectGeneric';

export class Id extends ValueObjectGeneric<string> {
  //readonly value: string;
  constructor(value?: string) {
    super(value ? value : uuid());
  }
}
