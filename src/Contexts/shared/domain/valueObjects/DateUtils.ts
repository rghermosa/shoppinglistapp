export abstract class DateUtils {
  static isBeforeToday(value): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return value < today;
  }

  static isAfterToday(value): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    return value > today;
  }

  static isTooLongAgo(): boolean {
    return true;
    //TODO NEEDS TO BE IMPLEMENTED AS THIS LOGIC NEEDS YEAR SETTING AND NOT HARDCODING IN ORDER TO BE CONSISTENT
    //BUSINESS DECISION, THIS WILL LIKELY BE APPLIED IF THE YEAR INTRODUCED IS 110 YEARS BEFORE THE CURRENT ONE
  }
}