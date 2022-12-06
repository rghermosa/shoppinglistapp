import {DateUtils} from '../../../../shared/domain/valueObjects/DateUtils'
export class DateOfBirth extends DateUtils {
  readonly value: Date;
  constructor (value: Date) {
    super();
    DateOfBirth.validation(value);
    this.value = value;
  }

  private static validation(value: Date): boolean {
    if (this.isAfterToday(value)) {
      throw new Error('This can not be after today'); //TODO NEED TO THROW PROPER EXCEPTION
    }
    return true;
  }
}