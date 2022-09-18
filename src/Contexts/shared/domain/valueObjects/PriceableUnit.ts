export class PriceableUnit {
  readonly value: number;

  constructor(value: number) {
    PriceableUnit.priceValidation(value);
    this.value = value;
  }

  public static priceValidation(price: number): boolean | never {
    if (price < 0) throw new Error();
    return true;
  }
}
