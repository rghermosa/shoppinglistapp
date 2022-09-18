export class PriceBelowZeroException extends Error {
  constructor(price: number) {
    super('Prices can´t be below zero');
  }
}
