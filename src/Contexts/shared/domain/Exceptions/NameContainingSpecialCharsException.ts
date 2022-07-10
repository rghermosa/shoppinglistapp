export class NameContainingSpecialCharsException extends Error {
  constructor(name: string) {
    super(`Name: '${name}' is not valid because it contains special chars`);
  }
}
