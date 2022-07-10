import { Id } from '../../../shared/domain/valueObjects/Id';
import { Name } from '../../../shared/domain/valueObjects/Name';
import { BrandId } from '../../Shared/domain/valueobjects/BrandId';
import { BrandName } from '../../Shared/domain/valueobjects/BrandName';
import { Brand } from './Brand';
import { BrandCategory } from './valueobjects/BrandCategory';

export interface BrandRepository {
  create(
    brandId: BrandId,
    brandName: BrandName,
    category: BrandCategory
  ): Promise<void>;
  save(brand: Brand): Promise<void>;
  getAll(): Promise<Brand[]>;
  find(brandId: BrandId): Promise<Brand>;
  search(): Promise<Brand | void>;
}
