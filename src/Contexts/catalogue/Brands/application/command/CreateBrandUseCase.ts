import { delay, inject, injectable, injectAll } from 'tsyringe';
import { Id } from '../../../../shared/domain/valueObjects/Id';
import { Name } from '../../../../shared/domain/valueObjects/Name';
import { Product } from '../../../Products/domain/Product';
import { BrandId } from '../../domain/valueobjects/BrandId';
import { BrandName } from '../../domain/valueobjects/BrandName';
import { ProductId } from '../../../Products/domain/valueobjects/ProductId';
import { Brand } from '../../domain/Brand';
import { BrandRepository } from '../../domain/BrandRepository';
import { BrandCategory } from '../../domain/valueobjects/BrandCategory';

@injectable()
export class CreateBrandUseCase {
  constructor(
    @inject('BrandRepository')
    private brandRepository: BrandRepository
  ) {
    this.brandRepository = brandRepository;
  }

  async execute(name: string, category: string) {
    const brandName: BrandName = new BrandName(name);
    const brandCategory: BrandCategory = BrandCategory[BrandCategory.parse(category)];
    const products: ProductId[] = [];
    const brand: Brand = Brand.create(brandName, brandCategory, products);

    await this.brandRepository.create(brand);
  }
}
