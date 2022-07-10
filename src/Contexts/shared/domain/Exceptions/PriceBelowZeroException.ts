export class PriceBelowZeroException extends Error {
  constructor(price: Number) {
    super('Prices can´t be below zero');
  }
}
