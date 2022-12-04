export class UserAlreadyExistsException extends Error {
  constructor() {
    super(`A user with this email already exists`)
}
}