import { registry } from 'tsyringe';
import { BrandId } from '../../domain/valueobjects/BrandId';
import { BrandName } from '../../domain/valueobjects/BrandName';
import { Brand } from '../../domain/Brand';
import { BrandRepository } from '../../domain/BrandRepository';
import { BrandNotFoundException } from '../../domain/Exceptions/BrandNotFoundException';
import { BrandCategory } from '../../domain/valueobjects/BrandCategory';

export class InMemoryBrandRepository implements BrandRepository {
  private static brands: Array<Brand> = [];
  constructor() {}

  async create(brand: Brand): Promise<void> {
    return new Promise((resolve, reject) => {
      InMemoryBrandRepository.brands.push(brand);
      //console.log(brand);
      resolve();
    });
  }

  async save(brand: Brand): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = InMemoryBrandRepository.brands.indexOf(brand);
      InMemoryBrandRepository.brands[index] = brand;
      //console.log(brand);
      resolve();
    });
  }

  async getAll(): Promise<Brand[] | void> {
    return new Promise((resolve, reject) => {
      //console.log(InMemoryBrandRepository.brands);
      resolve(InMemoryBrandRepository.brands);
    });
  }

  async find(id: BrandId): Promise<Brand> {
    return new Promise((resolve, reject) => {
      const obj = InMemoryBrandRepository.brands.find((o) => o.id.value === id.value);
      if (obj instanceof Brand) {
        resolve(obj);
      }
      throw new BrandNotFoundException(id.value);
    });
  }

  async search(): Promise<Brand | void> {}

  async exists(id: BrandId): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      InMemoryBrandRepository.brands.filter((brand) => brand.id == id) ? resolve(true) : resolve(false);
    });
  }
}
