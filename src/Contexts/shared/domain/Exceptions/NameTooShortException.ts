export class NameTooShortException extends Error {
  constructor(name: string) {
    super(`Name: '${name}' is too short`);
  }
}
