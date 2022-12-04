import { Email } from "../../../shared/domain/valueObjects/Email";
import { Name } from "../../../shared/domain/valueObjects/Name";
import { DateOfBirth } from './valueobjects/DateOfBirth'

export class User {
  readonly email: Email;
  readonly name: Name;
  readonly lastName: Name;
  readonly dateOfBirth: DateOfBirth;

}