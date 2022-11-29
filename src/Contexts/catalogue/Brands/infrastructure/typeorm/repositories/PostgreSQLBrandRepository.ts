import { BrandId } from '../../../domain/valueobjects/BrandId';
import { Brand } from '../../../domain/Brand';
import { BrandRepository } from '../../../domain/BrandRepository';
import { Brand as BrandEntity } from '../entities/Brand';
import { BrandMap } from '../../BrandMap';

export class PostgreSQLBrandRepository implements BrandRepository {
  async create(brandDomain: Brand): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const brand: BrandEntity = new BrandEntity();
      const brandExists = await this.exists(brandDomain.id);
      if (brandExists) {
        throw new Error();
      }

      brand.id = brandDomain.id.value;
      brand.name = brandDomain.name.value;
      brand.category = brandDomain.category;
      brand.products = [];
      brand.products.push(brandDomain.products.toString());
      brand.save();
      resolve();
    });
  }

  async save(brandDomain: Brand): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const brand = await BrandEntity.findOneBy({ id: `${brandDomain.id.value}` });
      brand.name = brandDomain.name.value;
      brand.category = brandDomain.category;
      brand.products.push(brandDomain.products.toString());

      brand.save();
      resolve();
    });
  }

  async getAll(): Promise<Brand[] | void> {
    return new Promise(async (resolve, reject) => {
      const brandEntities = await BrandEntity.find();
      const brands: Brand[] = [];
      brandEntities.map(async (b) => brands.push(await BrandMap.toDomain(b)));
      resolve(brands);
    });
  }

  async find(id: BrandId): Promise<Brand> {
    return new Promise(async (resolve, reject) => {
      const obj = await BrandEntity.findOneBy({ id: `${id.value}` });
      const brand = await BrandMap.toDomain(obj);
      if (brand instanceof Brand) {
        resolve(brand);
      }
    });
  }

  async search(): Promise<Brand | void> {}

  async exists(id: BrandId): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      (await BrandEntity.findOneBy({ id: `${id.value}` })) ? resolve(true) : resolve(false);
    });
  }
}
