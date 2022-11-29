export class EmailNotValidException extends Error {
  constructor(value: string) {
    super(`Email: ${value} is not valid`);
  }
}