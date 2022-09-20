export class BrandNotFoundException extends Error {
  constructor(id: string) {
    super(`Brand with id: ${id} not found or doesn't exists`);
  }
}
