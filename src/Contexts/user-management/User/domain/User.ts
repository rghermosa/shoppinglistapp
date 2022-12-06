import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Email } from "../../../shared/domain/valueObjects/Email";
import { Name } from "../../../shared/domain/valueObjects/Name";
import { DateOfBirth } from './valueobjects/DateOfBirth'

export class User extends AggregateRoot {
  readonly email: Email;
  readonly name: Name;
  readonly lastName: Name;
  readonly dateOfBirth: DateOfBirth;

}