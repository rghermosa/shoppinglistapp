import { Id } from '../../../shared/domain/valueObjects/Id';
import { Name } from '../../../shared/domain/valueObjects/Name';
import { BrandId } from './valueobjects/BrandId';
import { BrandName } from './valueobjects/BrandName';
import { Brand } from './Brand';
import { BrandCategory } from './valueobjects/BrandCategory';

export interface BrandRepository {
  create(brand: Brand): Promise<void>;
  save(brand: Brand): Promise<void>;
  getAll(): Promise<Brand[] | void>;
  find(brandId: BrandId): Promise<Brand>;
  search(): Promise<Brand | void>;
  exists(brandId: BrandId): Promise<boolean>;
}
