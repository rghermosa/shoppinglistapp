export class PriceableUnit {
  readonly value: Number;

  constructor(value: Number) {
    PriceableUnit.priceValidation(value);
    this.value = value;
  }

  public static priceValidation(price: Number): boolean | never {
    if (price < 0) throw new Error();
    return true;
  }
}
