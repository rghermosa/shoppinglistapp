export class BrandNotFoundException extends Error {
  constructor(id: string) {
    super(`Brand id: ${id} not found or doesn't exists`);
  }
}
