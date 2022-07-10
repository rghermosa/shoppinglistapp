import { BrandId } from '../../../Shared/domain/valueobjects/BrandId';
import { BrandName } from '../../../Shared/domain/valueobjects/BrandName';
import { Brand } from '../../domain/Brand';
import { BrandRepository } from '../../domain/BrandRepository';
import { BrandNotFoundException } from '../../domain/Exceptions/BrandNotFoundException';
import { BrandCategory } from '../../domain/valueobjects/BrandCategory';

export class InMemoryBrandRepository implements BrandRepository {
  private static brands: Array<Brand> = [];
  constructor() {}

  async create(
    id: BrandId,
    name: BrandName,
    category: BrandCategory
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const brand: Brand = Brand.create(id, name, category);
      InMemoryBrandRepository.brands.push(brand);
      console.log(InMemoryBrandRepository.brands);
      resolve();
    });
  }

  async save(brand: Brand): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = InMemoryBrandRepository.brands.indexOf(brand);
      InMemoryBrandRepository.brands[index] = brand;
      console.log(brand);
      resolve();
    });
  }

  async getAll(): Promise<Brand[]> {
    return new Promise((resolve, reject) => {
      console.log(InMemoryBrandRepository.brands);
      resolve(InMemoryBrandRepository.brands);
    });
  }

  async find(id: BrandId): Promise<Brand> {
    return new Promise((resolve, reject) => {
      const obj = InMemoryBrandRepository.brands.find(
        (o) => o.id.value === id.value
      );
      if (obj instanceof Brand) {
        resolve(obj);
      }
      throw new BrandNotFoundException(id.value);
    });
  }

  async search(): Promise<Brand | void> {}
}
